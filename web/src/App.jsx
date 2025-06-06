// import "./App.css";
// import React from "react";
// import {
//   Navigate,
//   Route,
//   BrowserRouter as Router,
//   Routes,
// } from "react-router-dom";
// import Login from "./pages/authentication/Login";
// import Sidebar from "./pages/Sidebar/Sidebar";
// import Home from "./pages/Home";
// import Dashborad from "./pages/DashBoard/Dashborad";
// import Navbar from "./componets/Navbar/Navbar";
// // import EnquiryForm from "./componets/Navbar/EnquiryForm";
// import ViewAllLeads from "./pages/DashBoard/ViewAllLeads";
// // import AuthForm from "./pages/authentication/AuthForm";

// function App() {
//   return (
//     <div className="App ">
//       <Router>
//         <Routes>
//           <Route path="/login" element={<Login />} />

//           <Route path="/" element={<Home />}>
//             <Route path="/dashboard" element={<Dashborad />} />
//                         {/* <Route path="/dashboard" element={<AuthForm/>} /> */}

//             {/* <Route path="/enquiryForm" element={<EnquiryForm />} /> */}
//             <Route path="/leads" element={<ViewAllLeads />} />

//           </Route>
//         </Routes>
//       </Router>
//     </div>
//   );
// }

// export default App;


// import React from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// import Login from "./pages/authentication/Login";
// import Home from "./pages/Home";
// import Dashborad from "./pages/DashBoard/Dashborad";
// import ViewAllLeads from "./pages/DashBoard/ViewAllLeads";
// // import EnquiryForm from "./pages/DashBoard/EnquiryForm"; // Uncomment when ready

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/login" element={<Login />} />

//         {/* Directly render Home and nested routes under it */}
//         <Route path="/" element={<Home />}>
//           <Route path="dashboard" element={<Dashborad />} />
//           <Route path="leads" element={<ViewAllLeads />} />
//           {/* <Route path="enquiryForm" element={<EnquiryForm />} /> */}
//         </Route>

//         {/* Redirect unknown paths to login */}
//         <Route path="*" element={<Navigate to="/login" />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;







// src/App.js
//  import React from "react";
//  import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

//  import Login from "./pages/authentication/Login";
//  import Home from "./pages/Home";
//  import Dashborad from "./pages/DashBoard/Dashborad";
//  import ViewAllLeads from "./pages/DashBoard/ViewAllLeads";
// //  import EnquiryForm from "./pages/DashBoard/EnquiryForm"; // ✅ Make sure file exists
// //  import PrivateRoute from "./componets/PrivateRoute/PrivateRoute";

// function App() {
//    return (
//      <Router>
//        <Routes>
//          <Route path="/login" element={<Login />} />
        
//         <Route
//           path="/"
//           element={
//             <PrivateRoute>
//               <Home />
//             </PrivateRoute>
//           }
//         >
//           <Route path="dashboard" element={<Dashborad />} />
//           <Route path="leads" element={<ViewAllLeads />} />
//            {/* <Route path="enquiryForm" element={<EnquiryForm />} />  */}
//         </Route>

//         <Route path="*" element={<Navigate to="/login" />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App; 


import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/authentication/Login";
import Home from "./pages/Home";
import Dashborad from "./pages/DashBoard/Dashborad";
import ViewAllLeads from "./pages/DashBoard/ViewAllLeads";
// import EnquiryForm from "./pages/DashBoard/EnquiryForm"; // Uncomment when ready

function App() {
  return (
    <Router>
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
