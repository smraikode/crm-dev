import React, { useEffect, useState } from "react";
import axios from "axios";
import { format, isSameDay, parseISO } from "date-fns";
import { checkUserValid } from "../../CommonUserValidCheck/checkUserValid";
import { useNavigate } from "react-router-dom";
import { apiEndpoints } from "../../services/apiConfig";

const RECORDS_PER_PAGE = 15;

const MyTeamAttendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAttendanceData = async () => {
      const token = localStorage.getItem("token");

      const isValid = checkUserValid();
      if (!isValid) {
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get(apiEndpoints.MyTeamAttendance, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = response.data.data || [];

        // Sort by updated_at DESC
        const sorted = [...data].sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
        setAttendanceData(sorted);
        setFilteredData(sorted);
      } catch (error) {
        console.error("Error fetching attendance data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendanceData();
  }, []);

  const handleDateChange = (e) => {
    const dateValue = e.target.value;
    setSelectedDate(dateValue);
    setCurrentPage(1); // Reset to first page

    if (dateValue === "") {
      setFilteredData(attendanceData);
    } else {
      const filtered = attendanceData.filter((item) =>
        isSameDay(new Date(item.updated_at), new Date(dateValue))
      );
      setFilteredData(filtered);
    }
  };

  const totalPages = Math.ceil(filteredData.length / RECORDS_PER_PAGE);
  const startIndex = (currentPage - 1) * RECORDS_PER_PAGE;
  const currentRecords = filteredData.slice(startIndex, startIndex + RECORDS_PER_PAGE);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Team Attendance</h2>

      <div className="mb-4">
        <label className="font-medium mr-2">Filter by Date:</label>
        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          className="border px-3 py-1 rounded"
        />
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : filteredData.length === 0 ? (
        <p>No attendance data found.</p>
      ) : (
        <>
          <div className="overflow-x-auto rounded shadow">
            <table className="min-w-full bg-white text-sm text-left border border-gray-200">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Latitude</th>
                  <th className="px-4 py-2">Longitude</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Updated At</th>
                </tr>
              </thead>
              <tbody>
                {currentRecords.map((item, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2">{item.email}</td>
                    <td className="px-4 py-2">{item.latitude}</td>
                    <td className="px-4 py-2">{item.longitude}</td>
                    <td className="px-4 py-2 capitalize">{item.status}</td>
                    <td className="px-4 py-2">
                      {item.updated_at
                        ? format(new Date(item.updated_at), "PPpp")
                        : "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-between items-center mt-4">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
              onClick={handlePrev}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="text-sm text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
              onClick={handleNext}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default MyTeamAttendance;
