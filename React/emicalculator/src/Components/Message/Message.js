import { Alert, Container } from "react-bootstrap";

const Message = (props) => {
  return (
    <Container>
      <Alert className="mt-3" variant={props.variant}>
        {props.message}
      </Alert>
    </Container>
  );
};

export default Message;
