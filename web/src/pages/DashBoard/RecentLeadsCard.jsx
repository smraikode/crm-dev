import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserFriends, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const RecentLeadsCard = () => {
  return (
    <div className="rounded-xl border bg-white shadow-sm w-full overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b">
        <h3 className="text-lg font-semibold text-gray-800">Recent Leads</h3>
        <Link to="/leads" className="text-orange-500 text-sm font-medium hover:underline">
          View All Leads
        </Link>
      </div>

      {/* Table */}
      <div className="p-6 pt-4 overflow-x-auto h-96">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 uppercase text-xs border-b">
              <th className="pb-3">Name</th>
              <th className="pb-3">Source</th>
              <th className="pb-3">Assigned To</th>
              <th className="pb-3">Status</th>
              <th className="pb-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="5">
                <div className="flex flex-col items-center justify-center py-10 text-center text-gray-500">
                  <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                    <FaUserFriends className="text-xl" />
                  </div>
                  <h3 className="text-base font-medium text-gray-700">No leads yet</h3>
                  <p className="text-sm mt-1">
                    Click &quot;Add New Lead&quot; to get started.
                  </p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center py-4 border-t">
        <nav className="flex items-center space-x-1">
          <button
            className="px-3 py-1 text-sm border rounded-l-lg text-gray-400 bg-white cursor-not-allowed"
            disabled
          >
            <FaChevronLeft />
          </button>
          <button className="px-3 py-1 text-sm bg-orange-500 text-white border border-orange-500">
            1
          </button>
          <button className="px-3 py-1 text-sm border rounded-r-lg text-gray-600 bg-white">
            <FaChevronRight />
          </button>
        </nav>
      </div>
    </div>
  );
};

export default RecentLeadsCard;
