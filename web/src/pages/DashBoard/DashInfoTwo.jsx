import React from 'react';
import {
  FaUserPlus,
  FaClock,
  FaPhoneAlt,
  FaCalendarCheck,
  FaMapMarkerAlt,
  FaExclamationCircle,
} from 'react-icons/fa';

const DashInfoTwo = () => {
  return (
    <div className="flex justify-start items-center flex-wrap p-1 gap-x-2 gap-y-3">
      
      {/* Card 1: New Leads */}
      <div className="bg-blue-100 hover:bg-blue-200 rounded border p-2 flex items-center justify-between w-36 h-20 cursor-pointer shadow-sm hover:shadow-md transition duration-200 transform hover:scale-105">
        <div>
          <h3 className="text-[11px] font-medium text-blue-800">New Leads</h3>
          <p className="text-base font-bold text-blue-800">08</p>
        </div>
        <div className="text-blue-800 text-lg">
          <FaUserPlus />
        </div>
      </div>

      {/* Card 2: Pending */}
      <div className="bg-green-100 hover:bg-green-200 rounded border p-2 flex items-center justify-between w-36 h-20 cursor-pointer shadow-sm hover:shadow-md transition duration-200 transform hover:scale-105">
        <div>
          <h3 className="text-[11px] font-medium text-green-800">Pending</h3>
          <p className="text-base font-bold text-green-800">10</p>
        </div>
        <div className="text-green-800 text-lg">
          <FaClock />
        </div>
      </div>

      {/* Card 3: Callbacks */}
      <div className="bg-yellow-100 hover:bg-yellow-200 rounded border p-2 flex items-center justify-between w-36 h-20 cursor-pointer shadow-sm hover:shadow-md transition duration-200 transform hover:scale-105">
        <div>
          <h3 className="text-[11px] font-medium text-yellow-800">Callbacks</h3>
          <p className="text-base font-bold text-yellow-800">11</p>
        </div>
        <div className="text-yellow-800 text-lg">
          <FaPhoneAlt />
        </div>
      </div>

      {/* Card 4: Meeting Scheduled */}
      <div className="bg-red-100 hover:bg-red-200 rounded border p-2 flex items-center justify-between w-36 h-20 cursor-pointer shadow-sm hover:shadow-md transition duration-200 transform hover:scale-105">
        <div>
          <h3 className="text-[11px] font-medium text-red-800">Meeting Scheduled</h3>
          <p className="text-base font-bold text-red-800">40</p>
        </div>
        <div className="text-red-800 text-lg">
          <FaCalendarCheck />
        </div>
      </div>

      {/* Card 5: Site Visit Scheduled */}
      <div className="bg-orange-100 hover:bg-orange-200 rounded border p-2 flex items-center justify-between w-36 h-20 cursor-pointer shadow-sm hover:shadow-md transition duration-200 transform hover:scale-105">
        <div>
          <h3 className="text-[11px] font-medium text-orange-800">Site Visit Scheduled</h3>
          <p className="text-base font-bold text-orange-800">20</p>
        </div>
        <div className="text-orange-800 text-lg">
          <FaMapMarkerAlt />
        </div>
      </div>

      {/* Card 6: Overdue */}
      <div className="bg-purple-100 hover:bg-purple-200 rounded border p-2 flex items-center justify-between w-36 h-20 cursor-pointer shadow-sm hover:shadow-md transition duration-200 transform hover:scale-105">
        <div>
          <h3 className="text-[11px] font-medium text-purple-800">Overdue</h3>
          <p className="text-base font-bold text-purple-800">40</p>
        </div>
        <div className="text-purple-800 text-lg">
          <FaExclamationCircle />
        </div>
      </div>

    </div>
  );
};

export default DashInfoTwo;
