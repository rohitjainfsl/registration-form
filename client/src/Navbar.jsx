import { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import Logo from "./assets/logo.png";

const CustomNavbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <Navbar expand="md" bg="light" variant="light" className="shadow-lg" fixed="top" style={{ minHeight: "70px", margin:"10px" }}>
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img src={Logo} alt="Full Stack Learning" style={{ height: "60px", width: "auto" }} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setMobileMenuOpen(!isMobileMenuOpen)} />
        <Navbar.Collapse id="basic-navbar-nav" className={isMobileMenuOpen ? "show" : ""}>
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" className="text-primary">Home</Nav.Link>
            <Nav.Link as={Link} to="/about" className="text-primary">About</Nav.Link>
            <Nav.Link as={Link} to="/blog" className="text-primary">Blog</Nav.Link>
            <Nav.Link as={Link} to="/contact" className="text-primary">Contact Us</Nav.Link>
            <Button as={Link} to="/registration" variant="primary" className="ms-3">
              Login / Register
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
