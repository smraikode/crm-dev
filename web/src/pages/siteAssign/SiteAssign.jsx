import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { apiEndpoints } from '../../services/apiConfig';

const SiteAssign = () => {
  const [offices, setOffices] = useState([]);
  const [selectedSiteId, setSelectedSiteId] = useState('');
  const [userSearch, setUserSearch] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState('');

  const getToken = () => localStorage.getItem('token');

  // Fetch offices on mount
  useEffect(() => {
    const fetchOffices = async () => {
      try {
        const token = getToken();
        const res = await axios.get(apiEndpoints.getAllOffices, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOffices(res.data);
      } catch (err) {
        console.error('Failed to fetch offices:', err);
      }
    };
    fetchOffices();
  }, []);

  // Fetch users when userSearch changes
  useEffect(() => {
    const fetchUsers = async () => {
      if (userSearch.trim() === '') return;
      try {
        const token = getToken();
        const res = await axios.get(
          `${apiEndpoints.searchUsers}?query=${encodeURIComponent(userSearch)}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setFilteredUsers(res.data);
      } catch (err) {
        console.error('Failed to fetch users:', err);
        setFilteredUsers([]);
      }
    };

    const debounce = setTimeout(fetchUsers, 300);
    return () => clearTimeout(debounce);
  }, [userSearch]);

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setUserSearch('');
    setFilteredUsers([]);
  };

  const handleUserRemove = () => {
    setSelectedUser(null);
  };

  const handleSubmit = async () => {
    if (!selectedSiteId || !selectedUser) {
      setMessage('❗ Please select a site and one user.');
      return;
    }

    const payload = {
      office_id: selectedSiteId,
      user_email: selectedUser.email,
    };

    try {
      const token = getToken();
      await axios.post(apiEndpoints.assignOfficeToUser, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMessage('✅ Site assigned successfully!');
      setSelectedUser(null);
      setSelectedSiteId('');
    } catch (err) {
      console.error('❌ Assignment failed:', err);
      setMessage('❌ Failed to assign site. Please try again.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">Assign Site to User</h2>

        {/* Office Dropdown */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Select Site</label>
          <select
            value={selectedSiteId}
            onChange={(e) => setSelectedSiteId(e.target.value)}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">-- Select Site --</option>
            {offices.map((office) => (
              <option key={office.id} value={office.id}>
                {office.name}
              </option>
            ))}
          </select>
        </div>

        {/* User Search */}
        <div className="relative">
          <label className="block text-gray-700 font-medium mb-2">Search & Select User</label>
          <input
            type="text"
            value={userSearch}
            onChange={(e) => setUserSearch(e.target.value)}
            placeholder="Type to search users..."
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {userSearch && filteredUsers.length > 0 && (
            <ul className="absolute z-10 bg-white border rounded mt-1 w-full max-h-40 overflow-auto shadow-lg">
              {filteredUsers.map((user) => (
                <li
                  key={user.id}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleUserSelect(user)}
                >
                  {user.email} ({user.name})
                </li>
              ))}
            </ul>
          )}

          {/* Selected user */}
          {selectedUser && (
            <div className="mt-2 flex items-center justify-between bg-blue-100 px-4 py-2 rounded-full">
              <span className="text-blue-800">{selectedUser.email}</span>
              <button
                onClick={handleUserRemove}
                className="text-sm font-bold text-red-600 hover:text-red-800"
              >
                ×
              </button>
            </div>
          )}
        </div>

        {/* Submit */}
        <div className="pt-4">
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white font-semibold py-2 px-6 rounded hover:bg-blue-700 transition"
          >
            Assign
          </button>
        </div>

        {/* Message */}
        {message && (
          <div className="text-center text-sm font-medium text-green-700 mt-2">{message}</div>
        )}
      </div>
    </div>
  );
};

export default SiteAssign;
