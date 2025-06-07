// import React from "react";
// import DashInfo from "./DashInfo";
// import DashInfoTwo from "./DashInfoTwo";
// import SocialMediaStatus from "./SocialMediaStatus";
// import RecentLeadsHeader from "./RecentLeadsCard";
// import TeamPerformance from "./TeamPerformance";

// function Dashboard() {

  
//   return (
//     <div className="w-full px-4 sm:px-6 md:px-8 py-4 space-y-6">
//       <DashInfo />
//       <DashInfoTwo />

//       <div className="flex flex-col lg:flex-row mb-4 gap-4">
//         <SocialMediaStatus />
//       </div>

//       <div className="flex flex-col lg:flex-row gap-4">
//         <div className="w-full lg:w-7/12">
//           <RecentLeadsHeader />
//         </div>
//         <div className="w-full lg:w-5/12">
//           <TeamPerformance />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;



import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { checkUserValid } from "../../CommonUserValidCheck/checkUserValid";
import DashInfo from "./DashInfo";
import DashInfoTwo from "./DashInfoTwo";
import SocialMediaStatus from "./SocialMediaStatus";
import RecentLeadsHeader from "./RecentLeadsCard";
import TeamPerformance from "./TeamPerformance";

function Dashboard() {
  const navigate = useNavigate();

  // useEffect(() => {
  //   const isValid = checkUserValid();
  //   if (!isValid) {
  //     navigate("/login");
  //   }
  // }, []);

  useEffect(() => {
    const isValid = checkUserValid();
  if (!isValid) {
    navigate('/login');
  }
}, [navigate]);


  return (
    <div className="w-full px-4 sm:px-6 md:px-8 py-4 space-y-6">
      <DashInfo />
      <DashInfoTwo />

      <div className="flex flex-col lg:flex-row mb-4 gap-4">
        <SocialMediaStatus />
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        <div className="w-full lg:w-7/12">
          <RecentLeadsHeader />
        </div>
        <div className="w-full lg:w-5/12">
          <TeamPerformance />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
