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

const DashInfo = ({onClose}) => {
const [LeadModal, setLeadModal] = useState(false)



  return (
    <div className="w-full flex justify-start items-center flex-wrap p-1 gap-x-2 gap-y-3">

<div className="w-full overflow-x-hidden flex items-center justify-between mb-6">
      <div>
        <h1 className="text-2xl font-bold text-orange-400">Dashboard</h1>
        <p className="text-sm text-gray-500">
          Welcome back, overview of your leads and team performance:
        </p>
      </div>
      <div className="flex space-x-3">
        <select className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium appearance-none cursor-pointer">
          <option value="last7">Last 7 days</option>
          <option value="last30">Last 30 days</option>
          <option value="last90">Last 90 days</option>
          <option value="ytd">Year to date</option>
        </select>
        <button className="px-4 py-2 bg-orange-400 hover:bg-orange-700 text-white rounded-lg flex items-center text-sm font-medium"
        onClick={()=> {setLeadModal(!LeadModal)}}
        
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
          <span>Add New Lead</span>
          
        </button>
      </div>
    </div>

{/* Modal code */}
{LeadModal && <div className='fixed inset-0 z-50 bg-black/80 '>
  <AddNewLeadModal onClose={()=> {setLeadModal(!LeadModal)}}/>
  </div>}

      {/* Total Leads */}
      <div className="bg-purple-100 hover:bg-purple-200  rounded border p-2 flex items-center justify-between w-36 h-20 cursor-pointer transition duration-200 shadow-sm hover:shadow-md transform hover:scale-105">
        <div>
          <h3 className="text-[11px] font-medium text-[#0077B6]">Total Leads</h3>
          <p className="text-base font-bold text-[#0077B6]">250</p>
        </div>
        <div className="text-[#0077B6] text-lg">
          <FaUserPlus />
        </div>
      </div>

      {/* Active */}
      <div className="bg-orange-100 hover:bg-orange-200 rounded border p-2 flex items-center justify-between w-36 h-20 cursor-pointer transition duration-200 shadow-sm hover:shadow-md transform hover:scale-105">
        <div>
          <h3 className="text-[11px] font-medium text-[#2D6A4F]">Active</h3>
          <p className="text-base font-bold text-[#2D6A4F]">108</p>
        </div>
        <div className="text-[#2D6A4F] text-lg">
          <FaUserCheck />
        </div>
      </div>

      {/* Unassigned */}
      <div className="bg-red-100 hover:bg-red-200 rounded border p-2 flex items-center justify-between w-36 h-20 cursor-pointer transition duration-200 shadow-sm hover:shadow-md transform hover:scale-105">
        <div>
          <h3 className="text-[11px] font-medium text-[#A67C00]">Unassigned</h3>
          <p className="text-base font-bold text-[#A67C00]">69</p>
        </div>
        <div className="text-[#A67C00] text-lg">
          <FaUserClock />
        </div>
      </div>

      {/* Deleted */}
      <div className="bg-yellow-100 hover:bg-yellow-200  rounded border p-2 flex items-center justify-between w-36 h-20 cursor-pointer transition duration-200 shadow-sm hover:shadow-md transform hover:scale-105">
        <div>
          <h3 className="text-[11px] font-medium text-[#D00000]">Deleted</h3>
          <p className="text-base font-bold text-[#D00000]">165</p>
        </div>
        <div className="text-[#D00000] text-lg">
          <FaUserTimes />
        </div>
      </div>

      {/* Booked */}
      <div className="bg-green-100 hover:bg-green-200 rounded border p-2 flex items-center justify-between w-36 h-20 cursor-pointer transition duration-200 shadow-sm hover:shadow-md transform hover:scale-105">
        <div>
          <h3 className="text-[11px] font-medium text-[#C16C00]">Booked</h3>
          <p className="text-base font-bold text-[#C16C00]">33</p>
        </div>
        <div className="text-[#C16C00] text-lg">
          <FaUserTie />
        </div>
      </div>

      {/* Not Interested */}
      <div className="bg-blue-100 hover:bg-blue-200 rounded border p-2 flex items-center justify-between w-36 h-20 cursor-pointer transition duration-200 shadow-sm hover:shadow-md transform hover:scale-105">
        <div>
          <h3 className="text-[11px] font-medium text-[#6A1B9A]">Not Interested</h3>
          <p className="text-base font-bold text-[#6A1B9A]">49</p>
        </div>
        <div className="text-[#6A1B9A] text-lg">
          <FaUserSlash />
        </div>
      </div>
    </div>
  );
};

export default DashInfo;



