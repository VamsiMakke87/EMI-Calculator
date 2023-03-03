import { useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import validator from "validator";

const LoginForm = (props) => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const showPasswordRef = useRef();
  const [buttonText, setButtonText] = useState("Login");
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [toggleEye, setToggleEye] = useState("password");

  const showPasswordHandler = () => {
    if (showPasswordRef.current.checked) setToggleEye("text");
    else setToggleEye("password");
  };

  const forgotPasswordHandler = (event) => {
    setForgotPassword(true);
    setButtonText("Reset Password");
  };

  const loginHandler =async (event) => {
    event.preventDefault();
    if (forgotPassword) {
      if (await props.isExistingUser(emailRef.current.value) && isPasswordValid) {
        props.onForgotPassword({
          email: emailRef.current.value,
          password: passwordRef.current.value,
        });
        props.onSuccess("Password updated Successfully");
        setForgotPassword(false);
        emailRef.current.value = "";
        passwordRef.current.value = "";
        setButtonText('Login');
      } else {
        props.onError("Please enter valid details!");
      }
    } else {
      await props.onLogin(
        {
          email: emailRef.current.value,
          password: passwordRef.current.value,
        }
      );
    }
  };

  const emailValidator = () => {
    if (!validator.isEmail(emailRef.current.value)){
      props.onError("Please Enter a Valid Email Address");
    }
  };


  const passwordValidator = () => {
    if (
      validator.isStrongPassword(confirmPasswordRef.current.value, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      if (passwordRef.current.value === confirmPasswordRef.current.value) {
        setIsPasswordValid(true);
      } else {
        setIsPasswordValid(false);
        // console.log("..");
        props.onError("Password and Confirm Password must match");
      }
    } else {
      setIsPasswordValid(false);
      // console.log(".");
      props.onError("Please Enter a Strong Password!");
    }
  };

  return (
    <Form onSubmit={loginHandler}>
      <Form.Group controlId="formEmail">
        <Form.Label>Email Address:</Form.Label>
        <Form.Control
          placeholder="example@email.com"
          ref={emailRef}
          type="email"
        />
      </Form.Group>
      <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control ref={passwordRef} type={toggleEye} />
      </Form.Group>
      {forgotPassword && (
        <Form.Group controlId="formConfirmPassword">
          <Form.Label>Confirm Password:</Form.Label>
          <Form.Control
            onChange={passwordValidator}
            ref={confirmPasswordRef}
            type={toggleEye}
          />
        </Form.Group>
      )}
      {!forgotPassword && (
        <a className="text-primary" onClick={forgotPasswordHandler}>
          Forgot Password?
        </a>
      )}
      <div className="d-grid gap-2">
        <Form.Check
          type="checkbox"
          label="Show Password"
          ref={showPasswordRef}
          onClick={showPasswordHandler}
        />
        <Button type="submit" className="mt-2" variant="info" size="lg">
          {buttonText}
        </Button>
      </div>
    </Form>
  );
};

export default LoginForm;
