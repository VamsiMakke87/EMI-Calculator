import { Button, Container, Navbar } from "react-bootstrap";


function NavBar(props) {
  return (
    <Navbar bg='dark' variant='dark'>
      <Container fluid >
        <Navbar.Brand href="#home">Home</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Button variant="outline-info" onClick={props.onLogout}>Logout</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;