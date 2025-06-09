import React, { useEffect } from "react";
import Sidebar from "./Sidebar/Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../componets/Navbar/Navbar";
import { checkUserValid } from "../CommonUserValidCheck/checkUserValid";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!checkUserValid()) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex flex-col flex-1 pt-4 px-2 md:ml-44 lg:ml-56 xl:ml-64 transition-all duration-300 overflow-x-auto">
        <Navbar className="p-4 bg-gray-100" />
        <div className="p-4">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Home;
