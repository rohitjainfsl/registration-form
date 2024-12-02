import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-[#2691bf] shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-black text-xl font-bold">
          <span className="bg-[#f27144] text-white px-2 py-1 rounded">MyApp</span>
        </Link>

        {/* Desktop Navigation */}
        <nav>
          <ul className="hidden md:flex space-x-6 text-black font-semibold">
            <li>
              <Link
                to="/"
                className=" text-black hover:text-[#f27144] transition duration-200"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/courses"
                className=" text-black hover:text-[#f27144] transition duration-200"
              >
                Courses
              </Link>
            </li>
            <li>
              <Link
                to="/blog"
                className=" text-black hover:text-[#f27144] transition duration-200"
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className=" text-black hover:text-[#f27144] transition duration-200"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                to="/registration"
                className=" text-black hover:text-[#f27144] transition duration-200"
              >
                Register/Login
              </Link>
            </li>
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-white focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <nav className="md:hidden bg-[#2691bf] text-white">
          <ul className="flex flex-col space-y-4 p-4">
            <li>
              <Link
                to="/"
                className=" text-black hover:text-[#f27144] transition duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/courses"
                className=" text-black hover:text-[#f27144] transition duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                Courses
              </Link>
            </li>
            <li>
              <Link
                to="/blog"
                className=" text-black hover:text-[#f27144] transition duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className=" text-black hover:text-[#f27144] transition duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                to="/registration"
                className=" text-black hover:text-[#f27144] transition duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                register/Login
              </Link>
            </li>
            <li>
              <a
                href="tel:+1234567890"
                className=" text-black hover:text-[#f27144] transition duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                +1234567890
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
