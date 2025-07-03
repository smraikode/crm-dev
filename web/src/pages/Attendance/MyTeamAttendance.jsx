// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { format, isSameDay } from "date-fns";
// import { checkUserValid } from "../../CommonUserValidCheck/checkUserValid";
// import { useNavigate } from "react-router-dom";
// import { apiEndpoints } from "../../services/apiConfig";

// const RECORDS_PER_PAGE = 15;

// const MyTeamAttendance = () => {
//   const [attendanceData, setAttendanceData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [selectedDate, setSelectedDate] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchAttendanceData = async () => {
//       const token = localStorage.getItem("token");

//       const isValid = checkUserValid();
//       if (!isValid) {
//         navigate("/login");
//         return;
//       }

//       try {
//         const response = await axios.get(apiEndpoints.MyTeamAttendance, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         const data = response.data.data || [];

//         // Sort by updated_at DESC
//         const sorted = [...data].sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
//         setAttendanceData(sorted);
//         setFilteredData(sorted);
//       } catch (error) {
//         console.error("Error fetching attendance data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAttendanceData();
//   }, []);

//   const handleDateChange = (e) => {
//     const dateValue = e.target.value;
//     setSelectedDate(dateValue);
//     setCurrentPage(1); // Reset to first page

//     if (dateValue === "") {
//       setFilteredData(attendanceData);
//     } else {
//       const filtered = attendanceData.filter((item) =>
//         isSameDay(new Date(item.updated_at), new Date(dateValue))
//       );
//       setFilteredData(filtered);
//     }
//   };

//   const totalPages = Math.ceil(filteredData.length / RECORDS_PER_PAGE);
//   const startIndex = (currentPage - 1) * RECORDS_PER_PAGE;
//   const currentRecords = filteredData.slice(startIndex, startIndex + RECORDS_PER_PAGE);

//   const handlePrev = () => {
//     if (currentPage > 1) setCurrentPage((prev) => prev - 1);
//   };

//   const handleNext = () => {
//     if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-semibold mb-4">Team Attendance</h2>

//       <div className="mb-4">
//         <label className="font-medium mr-2">Filter by Date:</label>
//         <input
//           type="date"
//           value={selectedDate}
//           onChange={handleDateChange}
//           className="border px-3 py-1 rounded"
//         />
//       </div>

//       {loading ? (
//         <p>Loading...</p>
//       ) : filteredData.length === 0 ? (
//         <p>No attendance data found.</p>
//       ) : (
//         <>
//           <div className="overflow-x-auto rounded shadow">
//             <table className="min-w-full bg-white text-sm text-left border border-gray-200">
//               <thead className="bg-gray-100 border-b">
//                 <tr>
//                   <th className="px-4 py-2">Email</th>
//                   <th className="px-4 py-2">Latitude</th>
//                   <th className="px-4 py-2">Longitude</th>
//                   <th className="px-4 py-2">Status</th>
//                   <th className="px-4 py-2">Updated At</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {currentRecords.map((item, index) => (
//                   <tr key={index} className="border-b hover:bg-gray-50">
//                     <td className="px-4 py-2">{item.email}</td>
//                     <td className="px-4 py-2">{item.latitude}</td>
//                     <td className="px-4 py-2">{item.longitude}</td>
//                     <td className="px-4 py-2 capitalize">{item.status}</td>
//                     <td className="px-4 py-2">
//                       {item.updated_at
//                         ? format(new Date(item.updated_at), "PPpp")
//                         : "N/A"}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {/* Pagination Controls */}
//           <div className="flex justify-between items-center mt-4">
//             <button
//               className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
//               onClick={handlePrev}
//               disabled={currentPage === 1}
//             >
//               Previous
//             </button>
//             <span className="text-sm text-gray-700">
//               Page {currentPage} of {totalPages}
//             </span>
//             <button
//               className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
//               onClick={handleNext}
//               disabled={currentPage === totalPages}
//             >
//               Next
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default MyTeamAttendance;




import React, { useEffect, useState } from "react";
import axios from "axios";
import { format, isSameDay } from "date-fns";
import { checkUserValid } from "../../CommonUserValidCheck/checkUserValid";
import { useNavigate } from "react-router-dom";
import { apiEndpoints } from "../../services/apiConfig";

const RECORDS_PER_PAGE = 15;

const MyTeamAttendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedEmail, setSelectedEmail] = useState("");
  const [emailList, setEmailList] = useState([]);
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

        const sorted = [...data].sort(
          (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
        );

        setAttendanceData(sorted);
        setFilteredData(sorted);

        const emails = [...new Set(sorted.map((item) => item.email))];
        setEmailList(emails);
      } catch (error) {
        console.error("Error fetching attendance data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendanceData();
  }, [navigate]);

  useEffect(() => {
    let filtered = [...attendanceData];

    if (selectedDate) {
      filtered = filtered.filter((item) =>
        isSameDay(new Date(item.updated_at), new Date(selectedDate))
      );
    }

    if (selectedEmail) {
      filtered = filtered.filter((item) => item.email === selectedEmail);
    }

    setFilteredData(filtered);
    setCurrentPage(1);
  }, [selectedDate, selectedEmail, attendanceData]);

  const totalPages = Math.ceil(filteredData.length / RECORDS_PER_PAGE);
  const startIndex = (currentPage - 1) * RECORDS_PER_PAGE;
  const currentRecords = filteredData.slice(startIndex, startIndex + RECORDS_PER_PAGE);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "clockin":
        return "text-green-600 font-semibold";
      case "clockout":
        return "text-red-600 font-semibold";
      case "auto-clockout":
        return "text-yellow-600 font-semibold";
      case "update":
        return "text-blue-500 font-medium";
      default:
        return "text-gray-700";
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-orange-500">📅 Team Attendance</h2>

      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        {/* Date Filter */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-1">Filter by Date</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Email Filter */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-1">Filter by Email</label>
          <select
            value={selectedEmail}
            onChange={(e) => setSelectedEmail(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">All Emails</option>
            {emailList.map((email, idx) => (
              <option key={idx} value={email}>
                {email}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <p className="text-gray-600">Loading attendance data...</p>
      ) : filteredData.length === 0 ? (
        <p className="text-gray-600">No attendance data found for the selected filters.</p>
      ) : (
        <>
          <div className="overflow-x-auto shadow rounded-lg">
            <table className="min-w-full text-sm text-left bg-white border border-gray-200">
              <thead className="bg-gray-100 text-gray-700 text-sm uppercase tracking-wider">
                <tr>
                  <th className="px-5 py-3 border-b">Email</th>
                  <th className="px-5 py-3 border-b">Latitude</th>
                  <th className="px-5 py-3 border-b">Longitude</th>
                  <th className="px-5 py-3 border-b">Status</th>
                  <th className="px-5 py-3 border-b">Updated At</th>
                </tr>
              </thead>
              <tbody>
                {currentRecords.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50 border-b">
                    <td className="px-5 py-3">{item.email}</td>
                    <td className="px-5 py-3">{item.latitude}</td>
                    <td className="px-5 py-3">{item.longitude}</td>
                    <td className={`px-5 py-3 capitalize ${getStatusColor(item.status)}`}>
                      {item.status}
                    </td>
                    <td className="px-5 py-3">
                      {item.updated_at
                        ? format(new Date(item.updated_at), "PPpp")
                        : "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-6">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              ⬅️ Previous
            </button>
            <span className="text-gray-600 text-sm">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              Next ➡️
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default MyTeamAttendance;
