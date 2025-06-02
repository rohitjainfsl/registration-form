import { useState, useContext} from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
// import Logo from "./assets/logo.png";
import Logo from "../assets/logo.png"
import "../styles/navbar.css";
import { adminContext } from "../Pages/Context/Admincontext";

const CustomNavbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, LogOut } = useContext(adminContext);
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/";

  function handleLogOut() {
    LogOut();
    navigate("/");
  }
  // console.log(isAuthenticated);

  return (
    <Navbar
      expand="md"
      className={`custom-navbar ${isHomePage ? "home-page" : ""}`}
      fixed="top"
    >
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
            {}
            {isAuthenticated ? (
              <Button onClick={() => handleLogOut()} className="navbar-button">
                Logout
              </Button>
            ) : (
              <Button as={Link} to="/student/login" className="navbar-button">
                Login 
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
