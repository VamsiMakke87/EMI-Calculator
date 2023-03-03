import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Nav from "react-bootstrap/Nav";
import LoginForm from "../Forms/LoginForm";
import SignUpForm from "../Forms/SignUpForm";

function Login(props) {
  const [tab, setTab] = useState("#login");

  return (
    <Card className="shadow" style={{ margin: "5.5%" }}>
      <Card.Header>
        <Nav variant="tabs" defaultActiveKey={tab}>
          <Nav.Item>
            <Nav.Link eventKey="#login" onClick={() => setTab("#login")}>
              Login
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="#signup" onClick={() => setTab("#signup")}>
              Signup
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Card.Header>
      <Card.Body>
        <Row>
          <Col>
            {tab === "#login" && (
              <LoginForm
                onError={props.onError}
                onSuccess={props.onSuccess}
                onForgotPassword={props.onForgotPassword}
                isExistingUser={props.isExistingUser}
                onLogin={props.onLogin}
              />
            )}
            {tab === "#signup" && (
              <SignUpForm
                onError={props.onError}
                isExistingUser={props.isExistingUser}
                onSignUp={props.onSignUp}
              />
            )}
          </Col>
          <Col>
            <Row className="text-info">
              <h1>MANAGE</h1>
            </Row>
            <Row className="text-info">
              <h1>LOANS</h1>
            </Row>
            <Row className="text-info">
              <h1>LIKE</h1>
            </Row>
            <Row className="text-info">
              <h1>A PRO</h1>
            </Row>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default Login;
