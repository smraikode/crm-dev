import React from 'react';
import { Link } from 'react-router-dom'; // Use only if you're using React Router
import { FaUserFriends, FaChevronLeft, FaChevronRight } from 'react-icons/fa';


const RecentLeadsCard = () => {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm col-span-2 ">
      {/* Header */}
      <div className="flex flex-col space-y-1.5 p-6 pb-2">
        <div className="flex items-center justify-between">
          <h3 className="tracking-tight text-lg font-semibold">Recent Leads</h3>
          <Link to="/leads" className="text-orange-400 text-sm font-medium hover:underline">
            View All Leads
          </Link>
        </div>
      </div>

      {/* Table Section */}
      <div className="p-6 pt-0">
        <div className="overflow-x-auto h-96">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Name</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Source</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Assigned To</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Status</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="5">
                  <div className="text-center py-10">
                    <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                    <FaUserFriends className="text-gray-400 text-xl" />
                    </div>
                    <h3 className="text-base font-medium text-gray-900">No leads yet</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Click &quot;Add New Lead&quot; to get started.
                    </p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-6">
          <nav className="flex items-center">
            <button
              className="px-3 py-1 text-sm text-gray-500 border border-gray-300 rounded-l-lg disabled:opacity-50"
              disabled
            >
              <FaChevronLeft />
            </button>
            <button className="px-3 py-1 text-sm text-white bg-orange-400 border border-orange-400">
              1
            </button>
            <button className="px-3 py-1 text-sm text-gray-500 border border-gray-300 rounded-r-lg">
            <FaChevronRight />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default RecentLeadsCard;
