import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import AssignRolePage from "./pages/DashBoard/AssignRole";
import Login from "./pages/authentication/Login";
import Home from "./pages/Home";
import Dashborad from "./pages/DashBoard/Dashborad";
import ViewAllLeads from "./pages/DashBoard/ViewAllLeads";
import MyTimeline from "./pages/Attendance/MyTimeline";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./componets/Navbar/protectedRoutes";
import LeadsAll from "./pages/Leads/LeadsAll";
import LeadCreate from "./pages/Leads/LeadCreate";
import MyTasks from "./pages/Tasks/MyTasks";
import TeamTasks from "./pages/Tasks/TeamTasks";
import PublicLeadForm from "./pages/Leads/publicLeadForm";
// import OrgTree from "./pages/DashBoard/orgChartTree";
import PropertiesPage from "./pages/properties/PropertiesPage";
import ManageProperties from "./pages/properties/manageProperties";
import getDecodedToken from "./utils/decodeToken";
import MyTeamAttendance from "./pages/Attendance/MyTeamAttendance";

function App() {
  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route path="/public-lead" element={<PublicLeadForm />} />
        {/* All routes with Sidebar + Navbar */}
        <Route path="/" element={<Home />}>
          <Route index element={<Navigate to="/dashboard" />} />
          <Route
            path="dashboard"
            element={
              <ProtectedRoute allowedRoles={["admin", "manager", "lead", "employee"]}>
                <Dashborad />
              </ProtectedRoute>
            }
          />
          <Route
            path="attendance/team"
            element={
              <ProtectedRoute allowedRoles={["admin", "manager", "lead"]}>
                <MyTeamAttendance />
              </ProtectedRoute>
            }
          />
          <Route
            path="leads"
            element={
              <ProtectedRoute allowedRoles={["admin", "manager", "lead", "employee"]}>
                <ViewAllLeads />
              </ProtectedRoute>
            }
          />
          <Route
            path="leads/all"
            element={
              <ProtectedRoute allowedRoles={["admin", "manager", "lead", "employee"]}>
                <LeadsAll />
              </ProtectedRoute>
            }
          />
          <Route
            path="leads/new"
            element={
              <ProtectedRoute allowedRoles={["admin", "manager", "lead", "employee"]}>
                <LeadCreate />
              </ProtectedRoute>
            }
          />
          <Route
            path="attendance/mytimeline"
            element={
              <ProtectedRoute allowedRoles={["admin", "manager", "lead"]}>
                <MyTimeline />
              </ProtectedRoute>
            }
          />
          <Route
            path="assign-role"
            element={
              <ProtectedRoute allowedRoles={["admin", "manager"]}>
                <AssignRolePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="tasks/my"
            element={
              <ProtectedRoute allowedRoles={["admin", "manager", "lead", "employee"]}>
                <MyTasks />
              </ProtectedRoute>
            }
          />
          <Route
            path="tasks/team"
            element={
              <ProtectedRoute allowedRoles={["admin", "manager", "lead"]}>
                <TeamTasks />
              </ProtectedRoute>
            }
          />
          <Route
            path="properties/all"
            element={
              <ProtectedRoute allowedRoles={["admin", "manager", "lead", "employee"]}>
                <PropertiesPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="properties/manage"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <ManageProperties />
              </ProtectedRoute>
            }
          />


          {/* <Route
          path="org-tree"
          element={
            <ProtectedRoute allowedRoles={["admin", "manager", "lead", "employee"]}>
              <OrgTree />
            </ProtectedRoute>
          }
        /> */}
        </Route>


        {/* Fallback to login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
