import React, { useState } from "react";
import getDecodedToken from "../../utils/decodeToken";
import {
  FaTachometerAlt,
  FaUserFriends,
  FaProjectDiagram,
  FaHome,
  FaChartBar,
  FaTasks,
  FaCog,
  FaSignOutAlt,
  FaRegGem,
  FaChevronRight,
  FaChevronDown,
  FaUserCheck,
  FaBars,
  FaTimes,
  FaUserCircle,
} from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [openSubmenus, setOpenSubmenus] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleSubmenu = (label) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const isActive = (path) => location.pathname.startsWith(path);
  const decoded = getDecodedToken();
  const userRole = decoded?.role || "";

  // Define menu items based on role
  const menuItems = [
    {
      label: "Dashboard",
      icon: <FaTachometerAlt />,
      path: "/dashboard",
    },

    ...(userRole === "admin"
      ? [
          {
            label: "Leads",
            icon: <FaUserFriends />,
            path: "/leads",
            submenu: [
              { label: "All Leads", path: "/leads/all" },
              { label: "New Lead", path: "/leads/new" },
            ],
          },
          {
            label: "Projects",
            icon: <FaProjectDiagram />,
            path: "/projects",
            submenu: [
              { label: "All Projects", path: "/projects/all" },
              { label: "Analytics", path: "/projects/analytics" },
            ],
          },
          {
            label: "Properties",
            icon: <FaHome />,
            path: "/properties",
          },
        ]
      : []),

    {
      label: "Reports",
      icon: <FaChartBar />,
      path: "/reports",
      submenu: [
        { label: "My Reports", path: "/reports/my" },
        ...(userRole === "admin"
          ? [
              { label: "Team Reports", path: "/reports/team" },
              { label: "Company Reports", path: "/reports/company" },
            ]
          : []),
      ],
    },

    {
      label: "Tasks",
      icon: <FaTasks />,
      path: "/tasks",
      submenu: [
        { label: "My Tasks", path: "/tasks/my" },
        ...(userRole === "admin"
          ? [{ label: "Team Tasks", path: "/tasks/team" }]
          : []),
      ],
    },

    {
      label: "Attendance",
      icon: <FaUserCheck />,
      submenu: [
        { label: "My Attendance", path: "/attendance/my" },
        { label: "My Timeline", path: "/attendance/mytimeline" },
        ...(userRole === "admin"
          ? [{ label: "Team Attendance", path: "/attendance/team" }]
          : []),
      ],
    },

    ...(userRole === "admin"
      ? [
          {
            label: "Manage Roles",
            icon: <FaUserCircle />,
            path: "/assign-role",
          },
        ]
      : []),
  ];

  // Close sidebar on mobile after clicking a link
  const handleNav = () => setSidebarOpen(false);

  const sidebarContent = (
    <div className="flex flex-col h-full min-h-0">
      <div className="flex items-center gap-4 mb-6 px-1 min-w-0">
        <FaRegGem className="text-orange-400 text-lg xs:text-xl sm:text-2xl" />
        <h1
          className="font-bold text-orange-400 text-base xs:text-lg sm:text-xl md:text-2xl whitespace-nowrap truncate max-w-[120px] xs:max-w-[160px] sm:max-w-[200px] md:max-w-[240px] mt-1"
          title="Menu"
        >
          Menu
        </h1>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const isSubmenuOpen = openSubmenus[item.label];
            const active = isActive(item.path || "");

            return (
              <li key={item.label}>
                {item.submenu ? (
                  <>
                    <div
                      onClick={() => toggleSubmenu(item.label)}
                      className={`flex items-center justify-between px-2 py-2 rounded cursor-pointer hover:bg-gray-500 ${
                        active ? "bg-gray-700" : ""
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-base sm:text-lg">
                          {item.icon}
                        </span>
                        <span className="text-xs xs:text-sm sm:text-base">
                          {item.label}
                        </span>
                      </div>
                      {isSubmenuOpen ? <FaChevronDown /> : <FaChevronRight />}
                    </div>
                    {isSubmenuOpen && (
                      <ul className="pl-7 mt-1 space-y-1">
                        {item.submenu.map((sub) => (
                          <Link key={sub.path} to={sub.path} onClick={handleNav}>
                            <li
                              className={`px-2 py-1 rounded hover:bg-gray-500 ${
                                isActive(sub.path) ? "bg-gray-700" : ""
                              } text-xs sm:text-sm`}
                            >
                              {sub.label}
                            </li>
                          </Link>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <Link to={item.path} onClick={handleNav}>
                    <div
                      className={`flex items-center gap-2 px-2 py-2 rounded hover:bg-gray-500 ${
                        active ? "bg-gray-700" : ""
                      }`}
                    >
                      <span className="text-base sm:text-lg">{item.icon}</span>
                      <span className="text-xs xs:text-sm sm:text-base">
                        {item.label}
                      </span>
                    </div>
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );

  return (
    <>
      {/* Hamburger Button (Mobile/Tablet) */}
      <button
        className="fixed top-3 left-3 z-50 md:hidden bg-[#0e1e49] text-white p-2 rounded shadow-lg focus:outline-none"
        onClick={() => setSidebarOpen(true)}
        aria-label="Open sidebar"
      >
        <FaBars size={20} />
      </button>

      {/* Sidebar Overlay (Mobile) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden transition-all duration-300"
          onClick={() => setSidebarOpen(false)}
        >
          <div
            className="fixed top-0 left-0 h-full w-44 sm:w-48 md:w-56 max-w-xs bg-[#0e1e49] text-white p-3 z-50 shadow-lg transition-all duration-300"
            style={{ maxHeight: "100dvh" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-3 right-3 text-white text-xl"
              onClick={() => setSidebarOpen(false)}
              aria-label="Close sidebar"
            >
              <FaTimes />
            </button>
            {sidebarContent}
          </div>
        </div>
      )}

      {/* Sidebar (Desktop/Tablet) */}
      <div className="hidden md:flex flex-col w-44 lg:w-56 xl:w-64 max-w-xs h-screen bg-[#0e1e49] text-white fixed top-0 left-0 z-30 p-3 transition-all duration-300">
        {sidebarContent}
      </div>
    </>
  );
};

export default Sidebar;
