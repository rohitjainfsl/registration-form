import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "./assets/logo.png";

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="navbar navbar-expand-lg bg py-0">
      <div className="container">
        <a className="navbar-brand imglogo" href="#">
          <Link to="/">
            <img src={Logo} alt="Full Stack Learning" />
          </Link>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span>
            <i id="bar" className="ri-menu-line"></i>
          </span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav m-auto mb-2 mb-lg-0">
            <li className="nav-item font">
              <Link to="/" className="nav-link active" aria-current="page">
                Home
              </Link>
            </li>
            <li className="nav-item font">
              <Link className="nav-link active" aria-current="page" to="">
                Courses
              </Link>
            </li>
            <li className="nav-item font">
              <Link className="nav-link active" aria-current="page" to="">
                About
              </Link>
            </li>
            <li className="nav-item font">
              <Link className="nav-link active" aria-current="page" to="#">
                Blog
              </Link>
            </li>

            <li className="nav-item font">
              <Link className="nav-link active" aria-current="page" to="">
                Contact Us
              </Link>
            </li>
          </ul>
          <form className="d-flex">
            <Link
              to="/registration"
              className="btn btn-warning"
              target="_blank"
            >
              Login / Register
            </Link>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
