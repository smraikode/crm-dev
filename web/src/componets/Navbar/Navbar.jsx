import React, { useState, useEffect } from "react";
import { FaBell, FaUserCircle, FaTimes, FaUser, FaCog, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Menu } from "@headlessui/react";
import getDecodedToken from "../../utils/decodeToken"; 


const Navbar = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const decoded = getDecodedToken(); 

  useEffect(() => {
    const storedUser = decoded?.email || "";
    setUserName(storedUser || "User");
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="w-full bg-white shadow-md px-4 py-3 flex items-center relative z-20">
      {/* Company Name */}
      <h1 className="mx-auto text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-orange-400 truncate max-w-[90vw] md:max-w-xs lg:max-w-lg">
        XYZ Solution Pvt Ltd
      </h1>

      {/* Right Side Icons */}
      <div className="ml-auto flex items-center gap-4 relative">
        <FaBell className="text-gray-600 w-6 h-6 cursor-pointer hover:text-orange-400 transition" />

        {/* Dropdown Menu */}
        <Menu as="div" className="relative inline-block text-left">
          <Menu.Button className="focus:outline-none">
            <FaUserCircle className="text-gray-600 w-7 h-7 cursor-pointer hover:text-orange-400 transition" />
          </Menu.Button>
          <Menu.Items
  
  className="fixed top-14 right-4 w-52 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg focus:outline-none z-[9999]">
            <div className="px-4 py-2 text-sm text-gray-700 font-semibold cursor-default">
              👤 {userName}
            </div>
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => navigate("/profile")}
                    className={`${
                      active ? "bg-gray-100" : ""
                    } flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-gray-700`}
                  >
                    <FaUser className="text-gray-500" /> Profile
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => navigate("/settings")}
                    className={`${
                      active ? "bg-gray-100" : ""
                    } flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-gray-700`}
                  >
                    <FaCog className="text-gray-500" /> Settings
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={handleLogout}
                    className={`${
                      active ? "bg-gray-100" : ""
                    } flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-600`}
                  >
                    <FaSignOutAlt className="text-red-500" /> Logout
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Menu>
      </div>

      {/* Mobile Menu Overlay */}
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
            {/* Add mobile nav links here */}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
