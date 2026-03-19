import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

function Header({ onHomeClick, onMoodCalendarClick }) {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
    <Navbar.Brand href="#home">My Stress App</Navbar.Brand>
      <Container>        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home" onClick={onHomeClick}>Home</Nav.Link>
            <Nav.Link href="#MoodCalendar" onClick={onMoodCalendarClick}>Mood Calendar</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
