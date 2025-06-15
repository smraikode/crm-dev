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
  const infoCards = [
    {
      title: 'New Leads',
      count: 8,
      bgColor: 'blue',
      icon: <FaUserPlus />,
    },
    {
      title: 'Pending',
      count: 10,
      bgColor: 'green',
      icon: <FaClock />,
    },
    {
      title: 'Callbacks',
      count: 11,
      bgColor: 'yellow',
      icon: <FaPhoneAlt />,
    },
    {
      title: 'Meeting Scheduled',
      count: 40,
      bgColor: 'red',
      icon: <FaCalendarCheck />,
    },
    {
      title: 'Site Visit Scheduled',
      count: 20,
      bgColor: 'orange',
      icon: <FaMapMarkerAlt />,
    },
    {
      title: 'Overdue',
      count: 40,
      bgColor: 'purple',
      icon: <FaExclamationCircle />,
    },
  ];

  return (
    <div className="w-full px-4 sm:px-6 md:px-8 mb-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {infoCards.map((card, index) => (
          <div
            key={index}
            className={`bg-${card.bgColor}-100 hover:bg-${card.bgColor}-200 rounded border p-3 flex items-center justify-between cursor-pointer transition duration-200 shadow-sm hover:shadow-md transform hover:scale-105`}
          >
            <div>
              <h3 className={`text-[11px] font-medium text-${card.bgColor}-800`}>
                {card.title}
              </h3>
              <p className={`text-base font-bold text-${card.bgColor}-800`}>
                {card.count.toString().padStart(2, '0')}
              </p>
            </div>
            <div className={`text-lg text-${card.bgColor}-800`}>{card.icon}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashInfoTwo;
