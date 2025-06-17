import React, { useState } from 'react';
import {
  FaUserPlus,
  FaUserCheck,
  FaUserClock,
  FaUserTimes,
  FaUserTie,
  FaUserSlash,
} from 'react-icons/fa';
import AddNewLeadModal from './AddNewLeadModal';

const DashInfo = () => {
  const [LeadModal, setLeadModal] = useState(false);

  const stats = [
    {
      title: 'Total Leads',
      value: '250',
      color: 'purple',
      icon: <FaUserPlus />,
      textColor: '#0077B6',
    },
    {
      title: 'Active',
      value: '108',
      color: 'orange',
      icon: <FaUserCheck />,
      textColor: '#2D6A4F',
    },
    {
      title: 'Unassigned',
      value: '69',
      color: 'red',
      icon: <FaUserClock />,
      textColor: '#A67C00',
    },
    {
      title: 'Deleted',
      value: '165',
      color: 'yellow',
      icon: <FaUserTimes />,
      textColor: '#D00000',
    },
    {
      title: 'Booked',
      value: '33',
      color: 'green',
      icon: <FaUserTie />,
      textColor: '#C16C00',
    },
    {
      title: 'Not Interested',
      value: '49',
      color: 'blue',
      icon: <FaUserSlash />,
      textColor: '#6A1B9A',
    },
  ];

  return (
    <div className="w-full px-4 sm:px-6 md:px-8">
      {/* Header */}
      <div className="w-full flex flex-col lg:flex-row items-start justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-orange-400">Dashboard</h1>
          <p className="text-sm text-gray-500">
            Welcome back, overview of your leads and team performance:
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
          <select className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium appearance-none cursor-pointer">
            <option value="last7">Last 7 days</option>
            <option value="last30">Last 30 days</option>
            <option value="last90">Last 90 days</option>
            <option value="ytd">Year to date</option>
          </select>
          <button
            onClick={() => setLeadModal(true)}
            className="px-4 py-2 bg-orange-400 hover:bg-orange-700 text-white rounded-lg flex items-center text-sm font-medium"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-2"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Add New Lead
          </button>
        </div>
      </div>

      {/* Modal */}
      {LeadModal && (
        <div className="fixed inset-0 z-50 bg-black/80">
          <AddNewLeadModal onClose={() => setLeadModal(false)} />
        </div>
      )}

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`bg-${stat.color}-100 hover:bg-${stat.color}-200 rounded border p-3 flex items-center justify-between cursor-pointer transition duration-200 shadow-sm hover:shadow-md transform hover:scale-105`}
          >
            <div>
              <h3 className="text-[11px] font-medium" style={{ color: stat.textColor }}>
                {stat.title}
              </h3>
              <p className="text-base font-bold" style={{ color: stat.textColor }}>
                {stat.value}
              </p>
            </div>
            <div className="text-lg" style={{ color: stat.textColor }}>
              {stat.icon}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashInfo;
