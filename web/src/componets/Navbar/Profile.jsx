import React, { useState } from 'react';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <main className="flex-1 overflow-y-auto bg-neutral-100 p-6 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-blue-900">Settings</h1>
        <p className="text-sm text-gray-500">Manage your account settings and preferences</p>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Tab Buttons */}
        <div className="grid grid-cols-3 bg-gray-100 text-gray-600 rounded-md mb-6 p-1">
          {['profile', 'password', 'notifications'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-2 text-sm font-medium rounded-sm transition-all ${
                activeTab === tab
                  ? 'bg-white text-black shadow-sm'
                  : 'hover:bg-white/60'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'profile' && (
          <div className="rounded-lg border bg-white text-gray-800 shadow-sm">
            <div className="p-6 border-b">
              <h3 className="text-2xl font-semibold">Profile Information</h3>
              <p className="text-sm text-gray-500">
                Update your account profile information and personal details
              </p>
            </div>

            <form className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">First Name</label>
                  <input
                    type="text"
                    className="w-full border px-3 py-2 rounded-md text-sm focus:ring-2 focus:ring-blue-400 outline-none"
                    defaultValue="Admin"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Last Name</label>
                  <input
                    type="text"
                    className="w-full border px-3 py-2 rounded-md text-sm focus:ring-2 focus:ring-blue-400 outline-none"
                    defaultValue="User"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <input
                  type="email"
                  className="w-full border px-3 py-2 rounded-md text-sm focus:ring-2 focus:ring-blue-400 outline-none"
                  defaultValue="admin@example.com"
                />
                <p className="text-xs text-gray-500">
                  This is the email address used for notifications
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Phone Number</label>
                <input
                  type="text"
                  className="w-full border px-3 py-2 rounded-md text-sm focus:ring-2 focus:ring-blue-400 outline-none"
                  defaultValue="1234567890"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        )}

        {activeTab === 'password' && (
          <div className="p-6 bg-white rounded-md shadow text-gray-800">
            <h2 className="text-xl font-semibold mb-2">Password Settings</h2>
            <p className="text-sm text-gray-500">Coming soon...</p>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="p-6 bg-white rounded-md shadow text-gray-800">
            <h2 className="text-xl font-semibold mb-2">Notification Settings</h2>
            <p className="text-sm text-gray-500">Coming soon...</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default Profile;
