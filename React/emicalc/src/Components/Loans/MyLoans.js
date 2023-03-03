import React, { Fragment } from "react";
import { Alert, CloseButton, Container } from "react-bootstrap";
import ViewLoan from "./ViewLoan";

const MyLoans = (props) => {
  const loans = props.loans;
  return (
    <Fragment>
      <CloseButton onClick={props.onClose} />

      {loans.length === 0 && (
        <Container>
          <Alert variant="info">No Loans To Display</Alert>
        </Container>
      )}
      {loans.length > 0 &&
        loans.map((loan) => (
          <ViewLoan key={loan.id} onCalculateEMI={props.onCalculateEMI} loans={loans} onDelete={props.onDelete} loan={loan} />
        ))}
    </Fragment>
  );
};

export default MyLoans;
