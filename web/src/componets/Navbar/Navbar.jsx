import React, { useState } from "react";
import { FaBell, FaBars, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-white shadow-md px-4 py-3 flex items-center relative z-20">
      {/* Hamburger for Mobile */}
      <button
        className="md:hidden flex items-center text-gray-700 text-2xl focus:outline-none"
        onClick={() => setMobileMenuOpen((prev) => !prev)}
        aria-label="Open menu"
      >
        {mobileMenuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Company Name */}
      <h1
        className="
          mx-auto
          text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-orange-400
          truncate max-w-[90vw] md:max-w-xs lg:max-w-lg
        "
      >
        XYZ Solution Pvt Ltd
      </h1>

      {/* Bell Icon - always top right */}
      <FaBell className="ml-auto text-gray-600 w-6 h-6 cursor-pointer hover:text-orange-400 transition" />

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="absolute top-0 right-0 w-3/4 max-w-xs h-full bg-white shadow-lg flex flex-col gap-4 p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="self-end text-2xl text-gray-700 mb-2"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <FaTimes />
            </button>
            {/* You can add mobile menu items here if needed */}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
