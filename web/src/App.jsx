import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import AssignRolePage from "./pages/DashBoard/AssignRole";
import Login from "./pages/authentication/Login";
import Home from "./pages/Home";
import Dashborad from "./pages/DashBoard/Dashborad";
import ViewAllLeads from "./pages/DashBoard/ViewAllLeads";
// import EnquiryForm from "./pages/DashBoard/EnquiryForm"; // Uncomment when ready

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./componets/Navbar/protectedRoutes";
import getDecodedToken from "./utils/decodeToken"; 

function App() {
    const decoded = getDecodedToken(); 
    const role = decoded?.role || "";
  return (
    <Router>

      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<Home />}>
          <Route path="dashboard" element={<Dashborad />} />
          <Route path="leads" element={<ViewAllLeads />} />
          <Route
            path="assign-role"
            element={
              <ProtectedRoute allowedRoles={["admin", "manager"]}>
                <AssignRolePage />
              </ProtectedRoute>
            }
          />
        </Route>


        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>

    </Router>
  );
}

export default App;
