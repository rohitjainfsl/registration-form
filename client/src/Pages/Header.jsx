import { FaPhoneAlt } from "react-icons/fa";
const Header = () => {
  return (
    <section className="upper-header">
      <div className="container">
        <div className="gradient">
          <p className="mb-0">
            <a className="d-flex items-center" href="tel:918824453320">
              <FaPhoneAlt />
              +91-8824453320
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Header;
