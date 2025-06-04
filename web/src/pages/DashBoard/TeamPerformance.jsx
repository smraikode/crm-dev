import React from "react";

const TeamPerformance = () => {
  const teamData = [
    { name: "Amit Mehta", initials: "AM", color: "blue", leads: 32, progress: 85 },
    { name: "Priya Kumar", initials: "PK", color: "purple", leads: 28, progress: 76 },
    { name: "Ankit Kumar", initials: "AK", color: "green", leads: 25, progress: 62 },
    { name: "Sneha Das", initials: "SD", color: "yellow", leads: 22, progress: 54 },
    { name: "Rajesh Joshi", initials: "RJ", color: "red", leads: 18, progress: 45 },
  ];

  const attendance = [
    { initials: "AM", color: "blue", name: "Amit Mehta" },
    { initials: "PK", color: "purple", name: "Priya Kumar" },
    { initials: "AK", color: "green", name: "Ankit Kumar" },
    { initials: "SD", color: "yellow", name: "Sneha Das" },
    { initials: "RJ", color: "red", name: "Rajesh Joshi" },
    { initials: "NV", color: "gray", name: "Neha Verma" },
    { initials: "VP", color: "gray", name: "Vikas Patel", absent: true },
  ];

  return (
    <div className="rounded-lg border bg-white text-gray-800 shadow-sm">
      <div className="flex flex-col space-y-1.5 p-6 pb-2">
        <div className="flex items-center justify-between">
          <h3 className="tracking-tight text-lg font-semibold">Team Performance</h3>
          <a href="/team" className="text-secondary text-sm font-medium hover:underline">
            View Team
          </a>
        </div>
      </div>

      <div className="p-6 pt-0">
        <div className="space-y-5">
          {teamData.map((member) => (
            <div key={member.name} className="flex items-center">
              <div className={`w-10 h-10 rounded-full bg-${member.color}-100 flex items-center justify-center mr-3`}>
                <span className={`text-${member.color}-600 font-medium`}>{member.initials}</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium">{member.name}</p>
                  <p className="text-sm font-medium">{member.leads} leads</p>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <div className="relative overflow-hidden rounded-full h-2 bg-gray-200 w-full max-w-xs">
                    <div
                      className="h-full bg-primary transition-all"
                      style={{ width: `${member.progress}%` }}
                    ></div>
                  </div>
                  <p className="text-sm font-medium ml-3">{member.progress}%</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-6 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">Team Attendance Today</h4>
            <p className="text-sm font-medium text-green-600">86% Present</p>
          </div>

          <div className="flex mt-3 space-x-2 flex-wrap">
            {attendance.map((member, index) => (
              <div
                key={index}
                className={`w-8 h-8 rounded-full bg-${member.color}-100 flex items-center justify-center ${
                  member.absent ? "opacity-40" : ""
                }`}
                title={`${member.name} ${member.absent ? "(Absent)" : ""}`}
              >
                <span className={`text-${member.color}-600 text-xs font-medium`}>{member.initials}</span>
              </div>
            ))}
            <div
              className="w-8 h-8 rounded-full bg-gray-100 border border-dashed border-gray-300 flex items-center justify-center"
              title="View All Team Members"
            >
              <span className="text-gray-500 text-xs">+5</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamPerformance;
