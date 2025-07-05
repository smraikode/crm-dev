import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon, XCircleIcon } from "@heroicons/react/20/solid";
import { motion } from "framer-motion";
import { activeEnvironment } from "../../services/apiConfig";

const roles = [
  { value: "admin", label: "🛡️ Admin" },
  { value: "manager", label: "📈 Manager" },
  { value: "lead", label: "💼 Lead" },
  { value: "employee", label: "👨‍💼 Employee" },
];

const roleHierarchy = {
  admin: [],
  manager: ["manager", "lead", "employee"],
  lead: ["lead", "employee"],
  employee: [],
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function AssignRolePage() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);
  const [isAssigning, setIsAssigning] = useState(false);
  const [isAssigned, setIsAssigned] = useState(false);
  const [userSelected, setUserSelected] = useState(false);
  const [subordinateQuery, setSubordinateQuery] = useState("");
  const [subordinateUsers, setSubordinateUsers] = useState([]);
  const [assignedSubordinates, setAssignedSubordinates] = useState([]);
  const lastNoUserToastQuery = useRef("");
  const token = localStorage.getItem("token");
  useEffect(() => {
    setAssignedSubordinates([]);
    setSubordinateQuery("");
    setSubordinateUsers([]);
  }, [selectedRole]);

  const fetchUsers = async (query, rolesFilter = []) => {
    try {
      const res = await axios.get(
        `${activeEnvironment}/search/search-users?query=${encodeURIComponent(query)}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (Array.isArray(res.data)) {
        const filtered = rolesFilter.length > 0
          ? res.data.filter((u) => rolesFilter.includes(u.role))
          : res.data;

        setUsers(filtered);


      }
    } catch {
      toast.error("Error fetching users");
    }
  };


  const fetchExistingSubordinates = async (email) => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(
        `${activeEnvironment}/roles/get-subordinates/${email}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const entries = res.data?.subordinates || [];

      const formatted = entries
        .map((entry) => {
          const match = entry.match(/^(.*?)\s\((.*?)\)\s-\s(.*)$/);
          if (!match) return null;
          const name = match[1];
          const role = match[2];
          const matchedUser = users.find(
            (u) => u.name === name && u.role === role
          );
          return {
            name,
            role,
            email: matchedUser?.email || name,
          };
        })
        .filter(Boolean);

      setAssignedSubordinates(formatted);
    } catch {
      toast.error("Failed to fetch existing subordinates");
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    setUserSelected(false);
    if (value.length >= 2) fetchUsers(value);
    else setUsers([]);
  };

  const handleAssign = async (e) => {
    e.preventDefault();
    if (!selectedUser || !selectedRole) {
      toast.error("Select user and role");
      return;
    }
    setIsAssigning(true);
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${activeEnvironment}/roles/assign-role`,
        {
          email: selectedUser.email,
          role: selectedRole.value,
          subordinates: assignedSubordinates.map((u) => `${u.name} (${u.role}) - ${u.email}`),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Role assigned successfully!");
      setIsAssigned(true);
    } catch (err) {
      toast.error(err.response?.data?.detail || "Error assigning role");
    } finally {
      setIsAssigning(false);
    }
  };

  const handleSubordinateSearch = async (value) => {
    setSubordinateQuery(value);
    if (value.length >= 2 && selectedRole) {
      const lowerRoles = roleHierarchy[selectedRole.value] || [];
      try {
        const res = await axios.get(
          `${activeEnvironment}/search/search-users?query=${encodeURIComponent(value)}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (Array.isArray(res.data)) {
          const filtered = res.data.filter((u) => lowerRoles.includes(u.role));
          setSubordinateUsers(filtered);
        }
      } catch {
        toast.error("Error fetching subordinate users");
      }
    } else {
      setSubordinateUsers([]);
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
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Assign Roles & Manage Teams</h2>

        {/* Search Box */}
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
                    onClick={async () => {
                      setSelectedUser(user);
                      setSearch(`${user.name || user.email} (${user.email})`);
                      setUserSelected(true);
                      const currentRole = roles.find((r) => r.value === user.role);
                      setSelectedRole(currentRole || null);
                      setIsAssigned(false);
                      await fetchUsers(user.email);
                      fetchExistingSubordinates(user.email);
                    }}
                    className="cursor-pointer px-3 py-2 hover:bg-blue-100 text-gray-700"
                  >
                    {user.name || user.email} ({user.email})
                  </div>
                ))
              ) : (
                <div className="px-3 py-2 text-gray-500 italic">No users found</div>
              )}
            </div>
          )}

        </div>

        {/* Current Role */}
        {selectedUser?.role && (
          <div className="mb-4 text-sm text-gray-800">
            <strong>Current Role:</strong>{" "}
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md">
              {selectedUser.role}
            </span>
          </div>
        )}

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

        {/* Subordinate Search */}
        {selectedRole && roleHierarchy[selectedRole.value].length > 0 && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Add Users under this Role
            </label>
            <input
              type="text"
              value={subordinateQuery}
              onChange={(e) => handleSubordinateSearch(e.target.value)}
              placeholder="Search users by name or email"
              className="w-full border px-3 py-2 rounded-md text-sm"
            />
            {subordinateQuery.length >= 2 && (
              <div className="border mt-1 rounded-md bg-white max-h-48 overflow-y-auto shadow text-sm">
                {subordinateUsers.length > 0 ? (
                  subordinateUsers.map((user) => (
                    <div
                      key={user.email}
                      onClick={() => {
                        if (user.email === selectedUser?.email) {
                          toast.warning("User cannot be assigned under themselves.");
                          return;
                        }
                        if (assignedSubordinates.some((u) => u.email === user.email)) {
                          toast.info("User already added.");
                          return;
                        }
                        setAssignedSubordinates((prev) => [...prev, user]);
                        setSubordinateQuery("");
                        setSubordinateUsers([]);
                      }}
                      className="px-3 py-2 hover:bg-blue-100 cursor-pointer"
                    >
                      {user.name || user.email} ({user.email}) - {user.role}
                    </div>
                  ))
                ) : (
                  <div className="px-3 py-2 text-gray-500 italic">No matching subordinates</div>
                )}
              </div>
            )}

          </div>
        )}

        {/* Assigned Subordinates */}
        {assignedSubordinates.length > 0 && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Assigned Subordinates
            </label>
            <ul className="flex flex-wrap gap-2">
              {assignedSubordinates.map((user) => (
                <li
                  key={user.name || user.email}
                  className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full flex items-center gap-2"
                >
                  {user.name || user.email} ({user.role})
                  <XCircleIcon
                    className="w-4 h-4 cursor-pointer hover:text-red-500"
                    onClick={() => {
                      toast.warn(
                        ({ closeToast }) => (
                          <div>
                            <div className="mb-2">
                              Remove {user.name || user.email} from subordinates?
                            </div>
                            <div className="flex gap-2">
                              <button
                                className="px-2 py-1 bg-red-600 text-white rounded text-xs"
                                onClick={async () => {
                                  closeToast();
                                  const token = localStorage.getItem("token");
                                  try {
                                    await axios.post(
                                      `${activeEnvironment}/roles/remove-subordinate`,
                                      {
                                        userEmail: selectedUser.email,
                                        subordinateEmail: user.email,
                                      },
                                      {
                                        headers: {
                                          Authorization: `Bearer ${token}`,
                                        },
                                      }
                                    );


                                    toast.success("Subordinate removed");
                                    setAssignedSubordinates((prev) =>
                                      prev.filter((u) => u.email !== user.email)
                                    );
                                  } catch (err) {
                                    toast.error("Failed to remove subordinate");
                                  }
                                }}
                              >
                                Yes, Remove
                              </button>
                              <button
                                className="px-2 py-1 bg-gray-300 text-black rounded text-xs"
                                onClick={closeToast}
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ),
                        { autoClose: false }
                      );
                    }}
                  />



                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Submit Button */}
        <button
          onClick={handleAssign}
          disabled={!selectedUser || !selectedRole || isAssigning}

          className="w-full py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {isAssigning ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z" />
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

