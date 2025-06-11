import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Select from "react-select";
import { motion } from "framer-motion";
import { activeEnvironment } from "../../services/apiConfig";

const roles = [
    { value: "admin", label: "🛡️ Admin" },
    { value: "lead", label: "💼 Lead" },
    { value: "manager", label: "📊 Manager" },
    { value: "support", label: "🎧 Support" },
];

export default function AssignRolePage() {
    const [search, setSearch] = useState("");
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedRole, setSelectedRole] = useState(null);

    const fetchUsers = async () => {
        try {
            const apiEndpoint = `${activeEnvironment}/search/search-users`;
            const res = await axios.get(`${apiEndpoint}?query=${encodeURIComponent(search)}`);
            console.log("User search response:", res.data);

            if (Array.isArray(res.data)) {
                setUsers(res.data);

                if (res.data.length === 0) {
                    toast.error("No users found with that search.");
                }
            } else {
                throw new Error("Invalid response format");
            }
        } catch (err) {
            console.error("Error fetching users:", err);
            toast.error("Failed to fetch users");
        }
    };


    const handleAssign = async () => {
        if (!selectedUser?.value?.email || !selectedRole?.value) {
            toast.error("User or role not selected");
            return;
        }

        try {
            const assignRoleEndpoint = `${activeEnvironment}/permissions/assign-role`;
            await axios.post(assignRoleEndpoint, {
                email: selectedUser.value.email,
                role: selectedRole.value,
            });

            toast.success("Role assigned successfully!");
            setSelectedUser(null);
            setSelectedRole(null);
            setSearch("");
            setUsers([]);
        } catch (err) {
            console.error("Error assigning role:", err);
            toast.error(`Error: ${err.response?.data?.detail || "Something went wrong"}`);
        }
    };

    return (
        <motion.div
            className="min-h-screen bg-gray-100 flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
        >
            <motion.div
                className="bg-white/70 backdrop-blur-md p-8 rounded-2xl shadow-xl w-full max-w-2xl"
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Assign Role</h2>

                {/* Search Input */}
                <div className="relative z-0 w-full mb-6 group">
                    <input
                        type="text"
                        name="search"
                        id="search"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <label
                        htmlFor="search"
                        className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Search user
                    </label>
                </div>

                <button
                    type="button"
                    onClick={fetchUsers}
                    className="mb-6 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    Search
                </button>

                {/* User Dropdown */}
                <Select
                    value={selectedUser}
                    onChange={setSelectedUser}
                    options={users.map((user) => ({
                        value: user,
                        label: `${user.name || user.email} (${user.email})`,
                    }))}
                    placeholder="Select a user"
                    className="mb-4 text-sm"
                />

                {/* Selected User Info (No Avatar) */}
                {selectedUser?.value && (
                    <motion.div
                        className="bg-white border p-4 rounded-lg shadow-sm mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <p className="font-semibold">{selectedUser.value.name || "No Name"}</p>
                        <p className="text-sm text-gray-500">{selectedUser.value.email}</p>
                    </motion.div>
                )}

                {/* Role Dropdown */}
                <div className="mb-4">
                    <Select
                        value={selectedRole}
                        onChange={setSelectedRole}
                        options={roles}
                        placeholder="Select a role"
                        className="text-sm"
                    />
                </div>

                {/* Assign Button */}
                <button
                    className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
                    disabled={!selectedUser || !selectedRole}
                    onClick={handleAssign}
                >
                    Assign Role
                </button>
            </motion.div>
        </motion.div>
    );
}
