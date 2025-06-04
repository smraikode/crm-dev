import React from "react";
import DashInfo from "./DashInfo";
import DashInfoTwo from "./DashInfoTwo";
import SocialMediaStatus from "./SocialMediaStatus";
import RecentLeadsHeader from "./RecentLeadsCard";
import TeamPerformance from "./TeamPerformance";

function Dashborad() {
  return (
    <div className="w-full">
      <DashInfo />
      <DashInfoTwo />
      <div className="flex mb-4">
        <SocialMediaStatus />
      </div>
      <div className="flex gap-x-6">
        <div className="w-7/12">
          <RecentLeadsHeader />
        </div>
        <div className="w-5/12">
          <TeamPerformance />
        </div>
      </div>
    </div>
  );
}

export default Dashborad;
