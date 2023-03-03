import React, { Fragment, useState } from "react";
import { Button, Col, Row, Table } from "react-bootstrap";
import LoanCalculator from "./LoanCalculator";

const ViewLoan = (props) => {
  const loan = props.loan;
  const [calculateEmi, setCalculateEmi] = useState(null);
  const [deleteLoan, setDeleteLoan] = useState(false);
  const deleteHandler = async () => {
    await props.onDelete(loan.id);
  };

  return (
    <Fragment>
      <Row
        className="border rounded border-info"
        style={{ margin: "2%", padding: "2%" }}
      >
        {deleteLoan && (
          <p>
            Are you sure?{" "}
            <Button variant="info" size="sm" onClick={deleteHandler}>
              Yes
            </Button>{" "}
            <Button
              size="sm"
              variant="outline-info"
              onClick={() => setDeleteLoan(false)}
            >
              No
            </Button>
          </p>
        )}
        <div>
          <a
            href="#"
            onClick={(event) => {
              event.preventDefault();
              setDeleteLoan(true);
            }}
            className="float-end text-decoration-none"
          >
            Delete
          </a>
        </div>
        <Row>
          <Col>Title:{loan.loanTitle}</Col>
          <Col>Loan Type:{loan.loanType}</Col>
        </Row>
        <Row>
          <Col>Amount(Rs.):{loan.loanAmount}</Col>
          <Col>Interest(%):{loan.loanInterest}%</Col>
        </Row>
        <Row>
          <Button
            disabled={calculateEmi}
            variant="info"
            onClick={() => {
              setCalculateEmi(true);
            }}
          >
            Calculate EMI
          </Button>
        </Row>

        {calculateEmi && (
          <Table>
            <thead>
              <tr>
                <td>
                  <a
                    href="#"
                    vairant="info"
                    className="text-decoration-none"
                    onClick={() => setCalculateEmi(false)}
                  >
                    Close
                  </a>
                </td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <LoanCalculator
                    onCalculateEMI={props.onCalculateEMI}
                    loan={loan}
                  />
                </td>
                <td>
                  <LoanCalculator
                    onCalculateEMI={props.onCalculateEMI}
                    loan={loan}
                  />
                </td>
                <td>
                  <LoanCalculator
                    onCalculateEMI={props.onCalculateEMI}
                    loan={loan}
                  />
                </td>
              </tr>
            </tbody>
          </Table>
        )}
      </Row>
    </Fragment>
  );
};

export default ViewLoan;
