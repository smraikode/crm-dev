import "./App.css";
import React from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Login from "./pages/authentication/Login";
import Sidebar from "./pages/Sidebar/Sidebar";
import Home from "./pages/Home";
import Dashborad from "./pages/DashBoard/Dashborad";
import Navbar from "./componets/Navbar/Navbar";
// import EnquiryForm from "./componets/Navbar/EnquiryForm";
import ViewAllLeads from "./pages/DashBoard/ViewAllLeads";
function App() {
  return (
    <div className="App ">
      <Router>
        <Routes>
          <Route path="login" element={<Login />} />

          <Route path="/" element={<Home />}>
            <Route path="/dashboard" element={<Dashborad />} />
            {/* <Route path="/enquiryForm" element={<EnquiryForm />} /> */}
            <Route path="/leads" element={<ViewAllLeads />} />

          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
