import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import getDecodedToken from "../../utils/decodeToken";
import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
} from "recharts";
import { activeEnvironment } from "../../services/apiConfig";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#00C49F"];

const LeadsAll = () => {
  const token = localStorage.getItem("token");

  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [detailLead, setDetailLead] = useState(null);
  const [task, setTask] = useState({
    title: "",
    description: "",
    assignedTo: "",
    priority: "Medium",
    dueDate: "",
  });

  const [employeeQuery, setEmployeeQuery] = useState("");
  const [employeeOptions, setEmployeeOptions] = useState([]);
  const [employeeDropdownOpen, setEmployeeDropdownOpen] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const decoded = getDecodedToken();
  const isAdmin = decoded?.role === "admin";

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const res = await axios.get(`${activeEnvironment}/leads`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setLeads(res.data);
    } catch {
      toast.error("Failed to load leads");
    } finally {
      setLoading(false);
    }
  };

  const fetchEmployees = async (query) => {
    try {
      const token = localStorage.getItem("token");
      const user = getDecodedToken();
      const userEmail = user?.email;

      if (!userEmail) throw new Error("Invalid token or missing email (sub)");

      const res = await axios.get(
        `${activeEnvironment}/roles/get-subordinates/${userEmail}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const subordinateEmails = res.data.subordinates.map((s) => s.split(" - ").pop().trim());

      const all = await axios.get(
        `${activeEnvironment}/search/search-users?query=${encodeURIComponent(query)}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const employees = all.data.filter(
        (u) => u.role === "employee" && subordinateEmails.includes(u.email)
      );

      setEmployeeOptions(employees);
    } catch (error) {
      toast.error("Error fetching employees");
      console.error(error);
    }
  };

  const handleTaskChange = (e) => {
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleTaskSubmit = async () => {
    if (!task.title.trim() || !task.assignedTo.trim()) {
      return toast.error("Title and Assignee are required");
    }
    try {
      const token = localStorage.getItem("token");

      await axios.post(`${activeEnvironment}/tasks/createTask`, {
        title: task.title,
        description: task.description,
        assigned_to: task.assignedTo,
        lead_email: selectedLead.email,
        priority: task.priority,
        due_date: task.dueDate,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      toast.success("Task created successfully");
      setTask({ title: "", description: "", assignedTo: "", priority: "Medium", dueDate: "" });
      setEmployeeQuery("");
      setShowTaskForm(false);
    } catch {
      toast.error("Failed to create task");
    }
  };

  const getChartData = (key) => {
    const counts = leads.reduce((acc, lead) => {
      const label = lead[key] || "Unknown";
      acc[label] = (acc[label] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  };

  const filteredLeads = leads.filter(
    (lead) =>
      lead.firstName?.toLowerCase().includes(search.toLowerCase()) ||
      lead.email?.toLowerCase().includes(search.toLowerCase()) ||
      lead.phone?.includes(search)
  );

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentLeads = filteredLeads.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredLeads.length / itemsPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Lead Management</h2>

      <input
        type="text"
        placeholder="Search by name, email or phone"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-6 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
      />

      {loading ? (
        <p className="text-center text-gray-600">Loading leads...</p>
      ) : (
        <>
          <div className="bg-white rounded-xl shadow-md mb-10 overflow-hidden">
            <h3 className="text-xl font-bold px-6 py-4 bg-blue-100 text-blue-900 border-b">📋 Leads List</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-700">
                <thead className="bg-gray-200 text-gray-600">
                  <tr>
                    <th className="px-6 py-3">Name</th>
                    <th className="px-6 py-3">Email</th>
                    <th className="px-6 py-3">Phone</th>
                    <th className="px-6 py-3">Project</th>
                    <th className="px-6 py-3">Type</th>
                    <th className="px-6 py-3">Property Interest</th>
                    <th className="px-6 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentLeads.map((lead) => (
                    <tr key={lead.id} className="border-t hover:bg-gray-100 transition">
                      <td className="px-6 py-3">{lead.firstName || "-"}</td>
                      <td className="px-6 py-3">{lead.email || "-"}</td>
                      <td className="px-6 py-3">{lead.phone || "-"}</td>
                      <td className="px-6 py-3">{lead.project || "-"}</td>
                      <td className="px-6 py-3">{lead.type || "-"}</td>
                      <td className="px-6 py-3">{lead.propertyInterest || "-"}</td>
                      <td className="px-6 py-3 space-y-2">
                        <button
                          onClick={() => { setDetailLead(lead); setShowDetailModal(true); }}
                          className="block w-full text-center px-3 py-1 text-sm bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200"
                        >
                          View Details
                        </button>
                        {decoded?.role !== "employee" && (
                          <button
                            onClick={() => { setSelectedLead(lead); setShowTaskForm(true); }}
                            className="block w-full text-center px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                          >
                            Create Task
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between px-6 py-4 bg-gray-100 border-t">
              <div className="text-sm text-gray-700">
                Showing <strong>{indexOfFirstItem + 1}</strong> to{" "}
                <strong>{Math.min(indexOfLastItem, filteredLeads.length)}</strong> of{" "}
                <strong>{filteredLeads.length}</strong> results
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => paginate(i + 1)}
                    className={`px-3 py-1 rounded ${currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">📊 Leads by Type</h4>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={getChartData("type")}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={90}
                    label
                  >
                    {getChartData("type").map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">📈 Leads by Source</h4>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={getChartData("source")}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}

      {/* Task Form Modal */}
      {showTaskForm && selectedLead && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
            <button onClick={() => setShowTaskForm(false)} className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl">&times;</button>
            <h3 className="text-lg font-bold mb-4 text-gray-800">Create Task for {selectedLead.firstName}</h3>

            <label className="block mb-1 text-sm font-medium text-gray-700">Title</label>
            <input type="text" name="title" value={task.title} onChange={handleTaskChange} className="w-full mb-3 px-4 py-2 border rounded" />

            <label className="block mb-1 text-sm font-medium text-gray-700">Description</label>
            <textarea name="description" value={task.description} onChange={handleTaskChange} className="w-full mb-3 px-4 py-2 border rounded" />

            <label className="block mb-1 text-sm font-medium text-gray-700">Assign To (Employee)</label>
            <input
              type="text"
              value={employeeQuery}
              onChange={(e) => {
                const val = e.target.value;
                setEmployeeQuery(val);
                setEmployeeDropdownOpen(true);
                if (val.length >= 2) fetchEmployees(val);
                else setEmployeeOptions([]);
              }}
              className="w-full mb-2 px-4 py-2 border rounded"
            />

            {employeeDropdownOpen && employeeQuery.length >= 2 && (
              <div className="bg-white border shadow rounded max-h-40 overflow-y-auto text-sm mb-3">
                {employeeOptions.length > 0 ? (
                  employeeOptions.map((emp) => (
                    <div
                      key={emp.email}
                      className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                      onClick={() => {
                        setTask((prev) => ({ ...prev, assignedTo: emp.email }));
                        setEmployeeQuery(`${emp.name || emp.email} (${emp.email})`);
                        setEmployeeDropdownOpen(false);
                      }}
                    >
                      {emp.name || emp.email} ({emp.email})
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-2 text-gray-500 italic">No matching employees</div>
                )}
              </div>
            )}

            <label className="block mb-1 text-sm font-medium text-gray-700">Priority</label>
            <select name="priority" value={task.priority} onChange={handleTaskChange} className="w-full mb-3 px-4 py-2 border rounded">
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>

            <label className="block mb-1 text-sm font-medium text-gray-700">Due Date</label>
            <input type="date" name="dueDate" value={task.dueDate} onChange={handleTaskChange} className="w-full mb-5 px-4 py-2 border rounded" />

            <button onClick={handleTaskSubmit} className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Submit Task</button>
          </div>
        </div>
      )}

      {/* Lead Detail Modal */}
      {showDetailModal && detailLead && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
            <button onClick={() => setShowDetailModal(false)} className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl">&times;</button>
            <h3 className="text-lg font-bold mb-4 text-gray-800">Lead Details</h3>
            <div className="text-sm text-gray-700 space-y-2">
              <p><strong>Name:</strong> {detailLead.firstName || "-"}</p>
              <p><strong>Email:</strong> {detailLead.email || "-"}</p>
              <p><strong>Phone:</strong> {detailLead.phone || "-"}</p>
              <p><strong>Project:</strong> {detailLead.project || "-"}</p>
              <p><strong>Type:</strong> {detailLead.type || "-"}</p>
              <p><strong>Property Interest:</strong> {detailLead.propertyInterest || "-"}</p>
              <p><strong>Source:</strong> {detailLead.source || "-"}</p>
              <p><strong>Status:</strong> {detailLead.status || "-"}</p>
              <p><strong>Notes:</strong> {detailLead.notes || "N/A"}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadsAll;
