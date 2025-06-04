import React, { useState, useRef, useEffect } from 'react';
import { FaBell, FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

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
    <div className="w-full h-12 bg-white shadow-md px-6 py-4 flex justify-between items-center relative">
      {/* Company Name */}
      <h1 className="text-xl font-bold text-orange-400">XYZ Solution Pvt Ltd</h1>

      {/* Right Section */}
      <div className="flex items-center gap-6">
        {/* Enquiry Form Button */}
        {/* <button
          onClick={() => navigate("/enquiryForm")}
          className="bg-orange-400 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition"
        >
          Enquiry Form
        </button> */}

        {/* Notification Icon */}
        <FaBell className="text-gray-600 w-5 h-5 cursor-pointer hover:text-orange-400" />

        {/* Profile Icon and Dropdown */}
        <div className="relative" ref={profileRef}>
          <FaUserCircle
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="text-gray-600 w-6 h-6 cursor-pointer hover:text-orange-400"
          />
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md border z-10">
              <ul className="text-sm text-gray-700">
                <li
                  onClick={() => {
                    navigate("/profile");
                    setShowProfileMenu(false);
                  }}
                  className="px-4 py-2 hover:bg-orange-400 cursor-pointer"
                >
                 Profile
                </li>
                <li className="px-4 py-2 hover:bg-orange-400 cursor-pointer">
                  Setting
                </li>
                <li className="px-4 py-2 hover:bg-orange-400 cursor-pointer">
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
