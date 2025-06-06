import React, { useState, useRef, useEffect } from "react";
import { FaBell, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full h-14 sm:h-16 md:h-18 bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 py-3 flex justify-between items-center relative">
      {/* Company Name */}
      <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-orange-400 truncate max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
        XYZ Solution Pvt Ltd
      </h1>

      {/* Right Section */}
      <div className="flex items-center gap-3 sm:gap-5 md:gap-6 lg:gap-8 xl:gap-10">
        {/* Enquiry Form Button */}
        <button
          onClick={() => navigate("/enquiryForm")}
          className="bg-orange-400 text-white px-2.5 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 rounded-md text-xs sm:text-sm md:text-base hover:bg-orange-700 transition"
        >
          Enquiry Form
        </button>

        {/* Notification Icon */}
        <FaBell className="text-gray-600 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 cursor-pointer hover:text-orange-400 transition" />

        {/* Profile Icon and Dropdown */}
        <div className="relative" ref={profileRef}>
          <FaUserCircle
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="text-gray-600 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 cursor-pointer hover:text-orange-400 transition"
          />
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-40 sm:w-44 md:w-48 bg-white shadow-lg rounded-md border z-10">
              <ul className="text-sm sm:text-base text-gray-700">
                <li
                  onClick={() => {
                    navigate("/profile");
                    setShowProfileMenu(false);
                  }}
                  className="px-4 py-2 hover:bg-orange-400 cursor-pointer transition"
                >
                  Profile
                </li>
                <li className="px-4 py-2 hover:bg-orange-400 cursor-pointer transition">
                  Setting
                </li>
                {/* <li className="px-4 py-2 hover:bg-orange-400 cursor-pointer transition">
                  Logout
                </li> */}
                <li
                  onClick={() => {
                    navigate("/login");
                    setShowProfileMenu(false);
                  }}
                  className="px-4 py-2 hover:bg-orange-400 cursor-pointer transition"
                >
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;



