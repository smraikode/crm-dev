import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { motion } from "framer-motion";
import { activeEnvironment } from "../../services/apiConfig";

const roles = [
  { value: "admin", label: "🛡️ Admin" },
  { value: "lead", label: "💼 Lead" },
  { value: "manager", label: "📊 Manager" },
  { value: "support", label: "🎧 Support" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function AssignRolePage() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);
  const [isAssigning, setIsAssigning] = useState(false);
  const [userSelected, setUserSelected] = useState(false);

  const fetchUsers = async (query) => {
    try {
      const res = await axios.get(
        `${activeEnvironment}/search/search-users?query=${encodeURIComponent(query)}`
      );
      if (Array.isArray(res.data)) {
        setUsers(res.data);
        if (res.data.length === 0) {
          toast.info("No user found");
        }
      } else {
        throw new Error("Invalid response");
      }
    } catch (err) {
      toast.error("Error fetching users");
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    setUserSelected(false);
    if (value.length >= 2) {
      fetchUsers(value);
    } else {
      setUsers([]);
    }
  };

  const handleAssign = async () => {
    if (!selectedUser || !selectedRole) {
      toast.error("Select user and role");
      return;
    }

    setIsAssigning(true);
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${activeEnvironment}/permissions/assign-role`,
        {
          email: selectedUser.email,
          role: selectedRole.value,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Role assigned successfully!");
      setSelectedUser(null);
      setSelectedRole(null);
      setSearch("");
      setUsers([]);
      setUserSelected(false);
    } catch (err) {
      toast.error(err.response?.data?.detail || "Error assigning role");
    } finally {
      setIsAssigning(false);
    }
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-blue-50 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-white/80 backdrop-blur p-8 rounded-2xl shadow-xl w-full max-w-2xl">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Assign Role</h2>

        {/* Search input with dropdown suggestions */}
        <div className="mb-4 relative">
          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="Search user by email"
            disabled={isAssigning}
            className="w-full border-b-2 border-gray-300 focus:border-blue-500 outline-none p-2 text-sm"
          />
          {search.length >= 2 && !userSelected && (
            <div className="absolute w-full bg-white border rounded shadow z-10 max-h-60 overflow-y-auto mt-1 text-sm">
              {users.length > 0 ? (
                users.map((user) => (
                  <div
                    key={user.email}
                    onClick={() => {
                      setSelectedUser(user);
                      setSearch(`${user.name || user.email} (${user.email})`);
                      setUsers([]);
                      setUserSelected(true);
                    }}
                    className="cursor-pointer px-3 py-2 hover:bg-blue-100 text-gray-700"
                  >
                    {user.name || user.email} ({user.email})
                  </div>
                ))
              ) : (
                <div className="px-3 py-2 text-gray-500 italic">No user found</div>
              )}
            </div>
          )}
        </div>

        {/* Role Dropdown */}
        <Listbox value={selectedRole} onChange={setSelectedRole}>
          {({ open }) => (
            <div className="mb-6">
              <Listbox.Label className="block text-sm font-medium text-gray-700 mb-1">
                Select Role
              </Listbox.Label>
              <div className="relative">
                <Listbox.Button className="relative w-full rounded-md bg-white py-2 pl-3 pr-10 text-left border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm">
                  <span className="block truncate">
                    {selectedRole ? selectedRole.label : "Select a role"}
                  </span>
                  <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <ChevronUpDownIcon className="h-5 w-5 text-gray-400" />
                  </span>
                </Listbox.Button>

                <Transition
                  show={open}
                  className="absolute mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-sm ring-1 ring-black ring-opacity-5 overflow-auto z-10"
                >
                  <Listbox.Options>
                    {roles.map((role) => (
                      <Listbox.Option
                        key={role.value}
                        value={role}
                        className={({ active }) =>
                          classNames(
                            active ? "bg-blue-100 text-blue-900" : "text-gray-900",
                            "cursor-pointer select-none relative py-2 pl-3 pr-9"
                          )
                        }
                      >
                        {({ selected }) => (
                          <>
                            <span className="block truncate">{role.label}</span>
                            {selected && (
                              <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-blue-600">
                                <CheckIcon className="h-5 w-5" />
                              </span>
                            )}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </div>
          )}
        </Listbox>

        {/* Assign Button with spinner */}
        <button
          onClick={handleAssign}
          disabled={!selectedUser || !selectedRole || isAssigning}
          className="w-full py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {isAssigning ? (
            <>
              <svg
                className="animate-spin h-5 w-5 text-white"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z"
                />
              </svg>
              Assigning...
            </>
          ) : (
            "Assign Role"
          )}
        </button>
      </div>
    </motion.div>
  );
}
