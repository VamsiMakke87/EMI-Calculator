import React, { useRef } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";

const LoanForm = (props) => {
  const titleRef = useRef();
  const typeRef = useRef();
  const amountRef = useRef();
  const interestRef = useRef();
  const email=localStorage.getItem("loggedInUser");
  const setMessage = (ele, msg) => {
    ele.target.setCustomValidity(msg);
  };

  const submitHandler =async (event) => {
    event.preventDefault();
    if (await props.isExistingLoan(titleRef.current.value.trim())) {
      props.onError("Loan already exists! Try a different title");
      titleRef.current.focus();
    } else {
      const loan = {
        email:email,
        loanTitle: titleRef.current.value.trim(),
        loanType: typeRef.current.value.trim(),
        loanAmount: amountRef.current.value,
        loanInterest: interestRef.current.value,
      };
      props.onNewLoan(loan);
      props.onSuccess("Loan added succesfully:)");
    }
  };
  return (
    <Form style={{ margin: "5%" }} onSubmit={submitHandler}>
      <Form.Group controlId="forTitle">
        <Form.Label>Title:</Form.Label>
        <Form.Control
          autoComplete="off"
          required
          ref={titleRef}
          pattern="[A-Za-z][A-Za-z0-9 ]+[A-Za-z0-9]+"
          onInvalid={(ele) =>
            setMessage(
              ele,
              "Title must start with a character and not end with a trailing space and atleast of length 3"
            )
          }
          onInput={(ele) => setMessage(ele, "")}
          type="text"
        />
      </Form.Group>
      <Form.Group controlId="forType">
        <Form.Label>Loan Type:</Form.Label>
        <Form.Control
          required
          ref={typeRef}
          placeholder="Ex:Home Loan,Car Loan,... "
          pattern="[A-Za-z][A-Za-z ]{4,}[A-Za-z]{1,}"
          onInvalid={(ele) =>
            setMessage(
              ele,
              "Loan must contain only alphabets,should not contain any starting or trailing space and  atleast of length 7"
            )
          }
          autoComplete="off"
          onInput={(ele) => setMessage(ele, "")}
          type="text"
        />
      </Form.Group>
      <Row>
        <Col>
          <Form.Group controlId="forAmount">
            <Form.Label>Amount(Rs.):</Form.Label>
            <Form.Control required min={10000} ref={amountRef} type="number" />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="forInterest">
            <Form.Label>Interest(%):</Form.Label>
            <Form.Control
              required
              min={0.1}
              max={100}
              ref={interestRef}
              step={0.1}
              type="number"
            />
          </Form.Group>
        </Col>
      </Row>
      <Row style={{ marginTop: "1.5%" }}>
        <Col>
          <div className="d-grid gap-2">
            <Button variant="outline-info" onClick={props.onCancel}>
              Cancel
            </Button>
          </div>
        </Col>
        <Col>
          <div className="d-grid gap-2">
            <Button type="submit" variant="info">
              Add Loan
            </Button>
          </div>
        </Col>
      </Row>
    </Form>
  );
};

export default LoanForm;
