import React from "react";

const Header = () => {
  return (
    <div className="flex w-full h-12">
      <div className="w-1/2 bg-[#f27144] text-black text-center flex items-center justify-center">
        <a
          href="tel:+8824453320"
          className="hover:underline transition duration-200"
        >
          +8824453320
        </a>
      </div>
      <div className="w-1/2 bg-[#2691bf] text-white text-center flex items-center justify-center">
        <a
          href="tel:+9024881021"
          className="hover:underline transition duration-200"
        >
          +9024881021
        </a>
      </div>
    </div>
  );
};

export default Header;
