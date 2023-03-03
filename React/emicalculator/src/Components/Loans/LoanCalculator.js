import React, { useRef, useState } from "react";
import { Button, Form, Row } from "react-bootstrap";

const LoanCalculator = (props) => {
  const monthRef = useRef();
  const loan = props.loan;
  const [emi, setEmi] = useState("Rs. ----");
  const [total, setTotal] = useState("Rs. ----");

  const calculateEmi = async (event) => {
    event.preventDefault();
    const res=await props.onCalculateEMI(monthRef.current.value,loan.loanAmount,loan.loanInterest);
    setEmi('Rs.'+res[0]);
    setTotal('Rs.'+res[1]);
  };

  return (
    <Form onSubmit={calculateEmi}>
      <Form.Group>
        <Form.Label>Enter No.Of Months:</Form.Label>
        <Form.Control min={1} max={500} required ref={monthRef} type="number" />
        <Button
          type="submit"
          variant="info"
          style={{ marginTop: "2%", marginBottom: "2%" }}
          size="sm"
        >
          Calculate
        </Button>
      </Form.Group>
      <Form.Group>
        <Form.Label>EMI(per Month):</Form.Label>
        <Form.Label>{emi}</Form.Label>
      </Form.Group>
      <Form.Group>
        <Form.Label>Total:</Form.Label>
        <Form.Label>{total}</Form.Label>
      </Form.Group>
    </Form>
  );
};

export default LoanCalculator;
