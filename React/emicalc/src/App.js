import "bootstrap/dist/css/bootstrap.min.css";
import { Fragment, useEffect, useState } from "react";
import "./App.css";
import Dashboard from "./Components/Home/Dashboard";
import Login from "./Components/Login/Login";
import Message from "./Components/Message/Message";
import NavBar from "./Components/Navbar/NavBar";
import "./Components/UI/style.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const messageTimer = setTimeout(() => {
      setError(null);
      setSuccess(null);
    }, 5 * 1000);
    return () => clearTimeout(messageTimer);
  }, [error, success]);

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "1") setIsLoggedIn(true);
  }, []);

  const errorHandler = (message) => {
    setSuccess(null);
    setError(message);
  };

  const successHandler = (message) => {
    setError(null);
    setSuccess(message);
  };

  async function getReq(url) {
    const res = await fetch(url);
    const resJson = await res.json();
    return resJson;
  }

  async function postReq(url, data) {
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res;
  }

  async function signUpHandler(userDetails) {
    const res = await postReq("http://localhost:8080/save", userDetails);
    const resJson =await res.json();
    // console.log(resJson);
    if(resJson.email)
      loggedIn(userDetails.email);
    return resJson;
  }

  async function exisitingUser(email) {
    const res = await getReq(`http://localhost:8080/exists?email=${email}`);
    return res;
  }

  const loginHandler = async (userDetails) => {
    const res = await postReq("http://localhost:8080/valid", userDetails);
    const resJson=await res.json();
    // console.log(resJson);
    if (resJson) loggedIn(userDetails.email);
    else setError("Invalid Credentials");
  };

  const loggedIn = (email) => {
    localStorage.setItem("isLoggedIn", "1");
    setError(null);
    setIsLoggedIn(true);
    localStorage.setItem("loggedInUser", email);
  };

  const forgotPasswordHandler = async (userDetails) => {
    const res = await postReq(
      "http://localhost:8080/forgotpassword",
      userDetails
    );
    return res;
  };

  const logoutHandler = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("loggedInUser");
  };

  const newLoanHandler = async (loan) => {
    const res = await postReq("http://localhost:8080/loans/save", loan);
    return res;
  };

  const getLoans = async (email) => {
    const loans = await getReq(
      `http://localhost:8080/loans/getloans?email=${email}`
    );
    return loans;
  };

  const exisitingLoan = async (email, loanTitle) => {
    const res = await getReq(
      `http://localhost:8080/loans/validtitle?email=${email}&loanTitle=${loanTitle}`
    );
    return res;
  };

  const deleteLoan = async (id) => {
    await fetch(`http://localhost:8080/loans/delete?id=${id}`, {
      method: "DELETE"
    });
  };

  const calculateEMi=async (months,loanAmount,loanInterest)=>{
    const res=await getReq(`http://localhost:8080/loans/calculateemi?months=${months}&loanAmount=${loanAmount}&loanInterest=${loanInterest}`);
    return res;
  }

  return (
    <Fragment>
      {!isLoggedIn && (
        <Login
          onLogin={loginHandler}
          onError={errorHandler}
          onSuccess={successHandler}
          onSignUp={signUpHandler}
          isExistingUser={exisitingUser}
          onForgotPassword={forgotPasswordHandler}
        />
      )}
      {isLoggedIn && <NavBar onLogout={logoutHandler} />}
      {error && <Message variant="danger" message={error} />}
      {success && <Message variant="success" message={success} />}
      {isLoggedIn && (
        <Dashboard
          onError={errorHandler}
          onNewLoan={newLoanHandler}
          getLoans={getLoans}
          isExistingLoan={exisitingLoan}
          onDelete={deleteLoan}
          onSuccess={successHandler}
          onLogout={logoutHandler}
          onCalculateEMI={calculateEMi}
        />
      )}
    </Fragment>
  );
}

export default App;
