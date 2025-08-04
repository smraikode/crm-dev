import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { apiEndpoints } from "../../services/apiConfig";
import { checkUserValid } from "../../CommonUserValidCheck/checkUserValid";
import { useNavigate } from "react-router-dom";
import {
    FaCalendarAlt,
    FaHashtag,
    FaMapMarkerAlt,
    FaUserCheck,
} from "react-icons/fa";

const MyAttendance = () => {
    const [timeline, setTimeline] = useState([]);
    const [selectedDate, setSelectedDate] = useState("");
    const [loading, setLoading] = useState(true);
    const [userEmail, setUserEmail] = useState("");
    const navigate = useNavigate();

    const fetchTimeline = async (date = null) => {
        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("❌ No token found. Please login again.");
            return;
        }

        try {
            setLoading(true);
            const response = await axios.get(apiEndpoints.MyAttendance, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: date ? { date } : {},
            });

            const data = response.data;
            setTimeline(data.timeline);
            setUserEmail(data.email);
        } catch (error) {
            console.error("❌ Error fetching attendance:", error);
            toast.error("Failed to load attendance.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const isValid = checkUserValid();
        if (!isValid) {
            navigate("/login");
            return;
        }
        fetchTimeline(); // fetch once authenticated
    }, []);

    const handleDateSearch = (e) => {
        e.preventDefault();
        if (!selectedDate) {
            toast.warn("📅 Please select a date.");
            return;
        }
        fetchTimeline(selectedDate);
    };

    const statusColor = (status) => {
        switch (status) {
            case "clockin":
                return "bg-green-100 text-green-700";
            case "clockout":
                return "bg-red-100 text-red-700";
            default:
                return "bg-yellow-100 text-yellow-700";
        }
    };

    return (
        <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                <div>
                    <h2 className="text-2xl font-bold text-orange-600 flex items-center gap-2">
                        <FaUserCheck className="text-orange-500" /> My Attendance
                    </h2>
                    <p className="text-sm text-gray-600">User: <strong>{userEmail}</strong></p>
                </div>

                <form onSubmit={handleDateSearch} className="flex flex-col sm:flex-row gap-3">
                    <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        max={new Date().toISOString().split("T")[0]} // 👈 disables future dates
                        className="border rounded-md px-4 py-2 w-full sm:w-auto"
                    />

                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                    >
                        🔍 Search
                    </button>
                </form>
            </div>

            {loading ? (
                <p className="text-gray-500">🔄 Loading attendance records...</p>
            ) : timeline.length === 0 ? (
                <p className="text-red-400 text-center">📭 No attendance records found.</p>
            ) : (
                <div className="overflow-x-auto rounded-lg shadow border border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200 bg-white text-sm">
                        <thead className="bg-gray-100 sticky top-0 z-10">
                            <tr>
                                <th className="px-6 py-3 text-left font-semibold text-gray-700">
                                    <div className="flex items-center gap-2"><FaHashtag /> #</div>
                                </th>
                                <th className="px-6 py-3 text-left font-semibold text-gray-700">
                                    <div className="flex items-center gap-2"><FaCalendarAlt /> Timestamp</div>
                                </th>
                                <th className="px-6 py-3 text-left font-semibold text-gray-700">
                                    <div className="flex items-center gap-2"><FaMapMarkerAlt /> Latitude</div>
                                </th>
                                <th className="px-6 py-3 text-left font-semibold text-gray-700">
                                    <div className="flex items-center gap-2"><FaMapMarkerAlt /> Longitude</div>
                                </th>
                                <th className="px-6 py-3 text-left font-semibold text-gray-700">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {timeline.map((item, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="px-6 py-3 text-gray-700">{index + 1}</td>
                                    <td className="px-6 py-3 text-gray-700 whitespace-nowrap">
                                        {new Date(item.timestamp).toLocaleString()}
                                    </td>
                                    <td className="px-6 py-3 text-gray-700">{item.latitude}</td>
                                    <td className="px-6 py-3 text-gray-700">{item.longitude}</td>
                                    <td className="px-6 py-3">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor(item.status)}`}
                                        >
                                            {item.status.toUpperCase()}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default MyAttendance;
