import { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import Logo from "./assets/logo.png";
import "./styles/Navbar.css";

const CustomNavbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isHomePage = location.pathname === "/";
  return (
    <Navbar expand="md" 
    className={`custom-navbar ${isHomePage ? "home-page" : ""}`}
    fixed="top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img src={Logo} alt="Full Stack Learning" />
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
        />
        <Navbar.Collapse
          id="basic-navbar-nav"
          className={isMobileMenuOpen ? "show" : ""}
        >
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/about">
              About
            </Nav.Link>
            <Nav.Link as={Link} to="/blog">
              Blog
            </Nav.Link>
            <Nav.Link as={Link} to="/contact">
              Contact Us
            </Nav.Link>
            <Button as={Link} to="/registration" className="navbar-button">
              Login / Register
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
