import { Fragment, useState, useEffect } from "react";
import { Card, Container } from "react-bootstrap";
import LoanForm from "../Forms/LoanForm";
import MyLoans from "../Loans/MyLoans";
import DashboardButton from "./DashboardButton";

const Dashboard = (props) => {
  const email = localStorage.getItem("loggedInUser");
  const [loans, setLoans] = useState([]);
  const [loansSize,setLoansSize]=useState(0); //to detect change in loans
  const [newLoan, setNewLoan] = useState(false);
  const [viewLoans, setViewLoans] = useState(false);
  const cardStyle = { margin: "2%" };

  useEffect(() => {
    loadLoans();
    
  }, [loansSize]);

  async function loadLoans() {
    const allLoans = await props.getLoans(email);
    setLoans(allLoans);
  }

  const newLoanHandler = (loan) => {

    props.onNewLoan(loan);
    setLoansSize(loansSize=>loansSize+1);
    setNewLoan(false);
  };

  const deleteHandler = (id) => {
    props.onDelete(id);
    const newLoans=loans.filter(loan=>loan.id!==id);
    setLoans(newLoans);

  };

  const exisitingLoan = async (loanTitle) => {
    const res = await props.isExistingLoan(email, loanTitle);
    return res;
  };

  return (
    <Fragment>
      {/* <h1>{`Welcome ${user.firstname} ${user.lastname}`}</h1> */}
      <Container>
        <Card style={cardStyle} className="shadow">
          {!newLoan && (
            <DashboardButton
              buttonText="Add New Loan"
              onClick={() => setNewLoan(true)}
            />
          )}
          {newLoan && (
            <LoanForm
              onError={props.onError}
              isExistingLoan={exisitingLoan}
              onNewLoan={newLoanHandler}
              onSuccess={props.onSuccess}
              onCancel={() => setNewLoan(false)}
            />
          )}
        </Card>
        <Card style={cardStyle} className="shadow">
          {!viewLoans && (
            <DashboardButton
              buttonText="My Loans"
              onClick={() => setViewLoans(true)}
            />
          )}
          {viewLoans && (
            <MyLoans
              loans={loans}
              onDelete={deleteHandler}
              onError={props.onError}
              onSuccess={props.onSuccess}
              onCalculateEMI={props.onCalculateEMI}
              onClose={() => setViewLoans(false)}
            />
          )}
        </Card>
      </Container>
    </Fragment>
  );
};

export default Dashboard;
