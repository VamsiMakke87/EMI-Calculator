import { useRef, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import validator from "validator";

const SignUpForm = (props) => {
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const showPasswordRef = useRef();
  const confirmPasswordRef = useRef();
  const [toggleEye, setToggleEye] = useState("password");

  const showPasswordHandler = () => {
    if (showPasswordRef.current.checked) setToggleEye("text");
    else setToggleEye("password");
  };

  async function signupHandler(event) {
    event.preventDefault();
    if (
      firstNameValidator() &&
      lastNameValidator() &&
      emailValidator() &&
      passwordValidator() &&
      confirmPasswordValidator()
    ) {
      const user = {
        email: emailRef.current.value,
        firstName: firstNameRef.current.value,
        lastName: lastNameRef.current.value,
        password: passwordRef.current.value,
      };
      const res = await props.onSignUp(user);
      if(res.email)
        props.onError(null);
      else
        props.onError("User already exists!");
      console.log(res);
    }
  }

  const emailValidator = () => {
    if (validator.isEmail(emailRef.current.value)) {
      return true;
    } else {
      props.onError("Please Enter a Valid Email Address!");
      return false;
    }
  };

  const confirmPasswordValidator = () => {
    if (passwordRef.current.value === confirmPasswordRef.current.value) {
      return true;
    } else {
      props.onError("Password and Confirm Password must match");
      return false;
    }
  };

  const passwordValidator = () => {
    if (
      validator.isStrongPassword(passwordRef.current.value, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      return true;
    } else {
      props.onError("Please Enter a Strong Password!");
      return false;
    }
  };

  const firstNameValidator = () => {
    const firstName = firstNameRef.current.value.trim();
    if (firstName.length < 3) {
      props.onError("First Name must be atleast 3 characters!");
      return false;
    } else if (/[^a-zA-Z]/.test(firstName)) {
      props.onError("First Name must contain only characters!");
      return false;
    } else {
      return true;
    }
  };

  const lastNameValidator = () => {
    const lastName = lastNameRef.current.value.trim();
    if (lastName.length < 3) {
      props.onError("Last Name must be atleast 3 characters!");
      return false;
    } else if (/[^a-zA-Z]/.test(lastName)) {
      props.onError("Last Name must contain only characters!");
      return false;
    } else {
      return true;
    }
  };

  return (
    <Form onSubmit={signupHandler}>
      <Row>
        <Col>
          <Form.Group controlId="formFirstName">
            <Form.Label>First Name:</Form.Label>
            <Form.Control
              ref={firstNameRef}
              placeholder="First Name"
              type="text"
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="formLastName">
            <Form.Label>Last Name:</Form.Label>
            <Form.Control
              ref={lastNameRef}
              placeholder="Last Name"
              type="text"
            />
          </Form.Group>
        </Col>
      </Row>
      <Form.Group controlId="formEmail">
        <Form.Label>Email Address:</Form.Label>
        <Form.Control
          ref={emailRef}
          placeholder="example@email.com"
          type="email"
        />
      </Form.Group>
      <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control ref={passwordRef} type={toggleEye} />
      </Form.Group>
      <Form.Group controlId="formConfirmPassword">
        <Form.Label>Confirm Password:</Form.Label>
        <Form.Control ref={confirmPasswordRef} type={toggleEye} />
      </Form.Group>
      <div className="d-grid gap-2">
        <Form.Check
          type="checkbox"
          label="Show Password"
          ref={showPasswordRef}
          onClick={showPasswordHandler}
        />
        <Button className="mt-2" type="submit" variant="info" size="lg">
          Sign Up
        </Button>
      </div>
    </Form>
  );
};

export default SignUpForm;
