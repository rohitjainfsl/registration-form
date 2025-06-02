import { FaPhoneAlt } from "react-icons/fa";
import { Container } from "react-bootstrap";
import "../styles/Header.css"; // Import external CSS

const Header = () => {
  return (
    <section className="header-section">
      <Container>
        <div className="header-container">
          <p className="header-text">
            <a className="header-link-first" href="tel:918824453320">
              <FaPhoneAlt className="header-phone-icon" />
              <span>+91-8824453320</span>
            </a>
            <a className="header-link-second" href="tel:918824453320">
              <FaPhoneAlt className="header-phone-icon" />
              <span>+91-8824453320</span>
            </a>
          </p>
        </div>
      </Container>
    </section>
  );
};

export default Header;
