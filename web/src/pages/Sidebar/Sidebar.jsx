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
  FaUser,
  FaUsers,
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const [openSubmenus, setOpenSubmenus] = useState({});
  const location = useLocation();

  const toggleSubmenu = (label) => {
    setOpenSubmenus((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const menuItems = [
    {
      label: "Dashboard",
      icon: <FaTachometerAlt />,
      path: "/dashboard",
      // submenu: [
      //   { label: "Overview", path: "/dashboard/overview" },
      //   { label: "Analytics", path: "/dashboard/analytics" },
      // ],
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
        { label: "All Projects", path: "/dashboard/overview" },
        { label: "Analytics", path: "/dashboard/analytics" },
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
      path: "/reports", submenu: [
        { label: "My Reports", path: "/reports/my" },
        { label: "Team Reports", path: "/reports/team" },
        { label: "Company Reports", path: "/reports/team" },
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
    <div className="w-56 h-screen bg-[#0e1e49] text-white flex flex-col justify-between p-4 fixed top-0 left-0 z-50">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-6">
          <FaRegGem className="text-orange-400 text-2xl" />
          <h1 className="text-2xl font-bold text-orange-400">Unknown</h1>
        </div>

        {/* Menu Items */}
        <ul className="space-y-4">
          {menuItems.map((item) => (
            <li key={item.label} className="cursor-pointer">
              {item.submenu ? (
                <>
                  <div
                    onClick={() => toggleSubmenu(item.label)}
                    className="flex items-center justify-between px-2 py-2 rounded hover:bg-gray-500"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{item.icon}</span>
                      <span>{item.label}</span>
                    </div>
                    {openSubmenus[item.label] ? <FaChevronDown /> : <FaChevronRight />}
                  </div>

                  {openSubmenus[item.label] && (
                    <div className="relative ml-8 mt-2">
                      <div className="absolute left-2 top-0 bottom-0 border-l-2 border-gray-400" />
                      <ul className="space-y-2 pl-4">
                        {item.submenu.map((sub) => (
                          <Link key={sub.path} to={sub.path}>
                            <li className="flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-500">
                              {sub.icon && <span className="text-sm">{sub.icon}</span>}
                              {sub.label}
                            </li>
                          </Link>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              ) : (
                <Link to={item.path}>
                  <div className="flex items-center gap-3 px-2 py-2 rounded hover:bg-gray-500">
                    <span className="text-lg">{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                </Link>
              )}
            </li>
          ))}
        </ul>

        {/* Settings & Logout */}
        <div className="mt-8 space-y-4">
          <div className="flex items-center gap-3 px-2 py-2 hover:bg-gray-500 rounded cursor-pointer">
            <FaCog className="text-lg" />
            <span>Settings</span>
          </div>
          <div className="flex items-center gap-3 px-2 py-2 hover:bg-gray-500 rounded cursor-pointer text-orange-400 hover:text-red-300">
            <FaSignOutAlt className="text-lg" />
            <span>Logout</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
