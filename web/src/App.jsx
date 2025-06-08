

import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/authentication/Login";
import Home from "./pages/Home";
import Dashborad from "./pages/DashBoard/Dashborad";
import ViewAllLeads from "./pages/DashBoard/ViewAllLeads";
// import EnquiryForm from "./pages/DashBoard/EnquiryForm"; // Uncomment when ready

import { ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css";   

function App() {
  return (
    <Router>

      <ToastContainer position="top-right" autoClose={3000} />


      <Routes>
        <Route path="/login" element={<Login />} />

        {/* Directly render Home and nested routes under it */}
        <Route path="/" element={<Home />}>
          <Route path="dashboard" element={<Dashborad />} />
          <Route path="leads" element={<ViewAllLeads />} />
          {/* <Route path="enquiryForm" element={<EnquiryForm />} /> */}
        </Route>

        {/* Redirect unknown paths to login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
