import React, { useState } from "react";
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
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const [openSubmenus, setOpenSubmenus] = useState({});
  const location = useLocation();

  const toggleSubmenu = (label) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const isActive = (path) => location.pathname.startsWith(path);

  const menuItems = [
    {
      label: "Dashboard",
      icon: <FaTachometerAlt />,
      path: "/dashboard",
    },
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
    {
      label: "Reports",
      icon: <FaChartBar />,
      path: "/reports",
      submenu: [
        { label: "My Reports", path: "/reports/my" },
        { label: "Team Reports", path: "/reports/team" },
        { label: "Company Reports", path: "/reports/company" },
      ],
    },
    {
      label: "Tasks",
      icon: <FaTasks />,
      path: "/tasks",
      submenu: [
        { label: "My Tasks", path: "/tasks/my" },
        { label: "Team Tasks", path: "/tasks/team" },
      ],
    },
    {
      label: "Attendance",
      icon: <FaUserCheck />,
      submenu: [
        { label: "My Attendance", path: "/attendance/my" },
        { label: "Team Attendance", path: "/attendance/team" },
      ],
    },
  ];

  return (
    <div className="w-64 h-screen bg-[#0e1e49] text-white flex flex-col justify-between fixed top-0 left-0 z-50 p-4">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-6">
          <FaRegGem className="text-orange-400 text-2xl" />
          <h1 className="text-2xl font-bold text-orange-400">Unknown</h1>
        </div>

        {/* Navigation */}
        <ul className="space-y-4">
          {menuItems.map((item) => {
            const isSubmenuOpen = openSubmenus[item.label];
            const active = isActive(item.path || "");

            return (
              <li key={item.label}>
                {item.submenu ? (
                  <>
                    <div
                      onClick={() => toggleSubmenu(item.label)}
                      className={`flex items-center justify-between px-3 py-2 rounded cursor-pointer hover:bg-gray-500 ${
                        active ? "bg-gray-700" : ""
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{item.icon}</span>
                        <span>{item.label}</span>
                      </div>
                      {isSubmenuOpen ? <FaChevronDown /> : <FaChevronRight />}
                    </div>
                    {isSubmenuOpen && (
                      <ul className="pl-8 mt-2 space-y-2">
                        {item.submenu.map((sub) => (
                          <Link key={sub.path} to={sub.path}>
                            <li
                              className={`px-2 py-1 rounded hover:bg-gray-500 ${
                                isActive(sub.path) ? "bg-gray-700" : ""
                              }`}
                            >
                              {sub.label}
                            </li>
                          </Link>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <Link to={item.path}>
                    <div
                      className={`flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-500 ${
                        active ? "bg-gray-700" : ""
                      }`}
                    >
                      <span className="text-lg">{item.icon}</span>
                      <span>{item.label}</span>
                    </div>
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      {/* Bottom Section */}
      <div className="mt-6 space-y-4">
        <div className="flex items-center gap-3 px-3 py-2 rounded cursor-pointer hover:bg-gray-500">
          <FaCog className="text-lg" />
          <span>Settings</span>
        </div>
        <div className="flex items-center gap-3 px-3 py-2 rounded cursor-pointer text-orange-400 hover:text-red-400 hover:bg-gray-500">
          <FaSignOutAlt className="text-lg" />
          <span>Logout</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
