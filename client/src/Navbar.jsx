import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "./assets/logo.png";

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-700 shadow-lg h-16 md:h-20 w-full">
      <div className="container mx-auto flex justify-between items-center h-full">
        <Link to="/" className="flex items-center">
          <img src={Logo} alt="Full Stack Learning" className="h-1 md:h-14" />
        </Link>
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
        >
          <i className="ri-menu-line text-3xl"></i>
        </button>
        <div className={`md:flex space-x-6 items-center ${isMobileMenuOpen ? "block" : "hidden"}`}>
          <ul className="md:flex md:space-x-6">
            <li><Link to="/" className="text-white hover:text-yellow-300 transition-colors">Home</Link></li>
            <li><Link to="" className="text-white hover:text-yellow-300 transition-colors">Courses</Link></li>
            <li><Link to="" className="text-white hover:text-yellow-300 transition-colors">About</Link></li>
            <li><Link to="#" className="text-white hover:text-yellow-300 transition-colors">Blog</Link></li>
            <li><Link to="" className="text-white hover:text-yellow-300 transition-colors">Contact Us</Link></li>
          </ul>
          <Link to="/registration" className="bg-yellow-500 text-white px-6 py-3 rounded-md shadow-md hover:bg-yellow-600 transition-all">
            Login / Register
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
