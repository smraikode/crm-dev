import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import getDecodedToken from "../../utils/decodeToken";
import { apiEndpoints } from "../../services/apiConfig";
import { Briefcase, Filter, Loader2, Search } from "lucide-react";


const statusOptions = ["Pending", "In Progress", "Completed"];
const priorityOptions = ["High", "Medium", "Low"];

const badgeColors = {
  Pending: "bg-yellow-100 text-yellow-700",
  "In Progress": "bg-blue-100 text-blue-700",
  Completed: "bg-green-100 text-green-700",
  High: "bg-red-100 text-red-700",
  Medium: "bg-orange-100 text-orange-700",
  Low: "bg-gray-100 text-gray-700",
};

const formatDate = (dateStr) => {
  try {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat("en-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date);
  } catch {
    return "Invalid date";
  }
};

const MyTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [selectedTask, setSelectedTask] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sort, setSort] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const userEmail = getDecodedToken()?.email;
  const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          `${apiEndpoints.getMyTasks}?email=${userEmail}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setTasks(res.data || []);
        setFilteredTasks(res.data || []);
      } catch {
        toast.error("Failed to load tasks");
      } finally {
        setIsLoaded(true);
      }
    };
    fetchTasks();
  }, [userEmail]);

  useEffect(() => {
    let result = [...tasks];

    if (selectedFilter !== "All") {
      const [type, value] = selectedFilter.split(": ");
      result = result.filter((task) =>
        type === "Status" ? task.status === value : task.priority === value
      );
    }

    if (searchQuery.trim()) {
      result = result.filter(
        (task) =>
          task.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          task.leadEmail?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (sort === "DueDate") {
      result.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    }

    setFilteredTasks(result);
    setCurrentPage(1);
  }, [selectedFilter, searchQuery, sort, tasks]);

  const handleStatusUpdate = async () => {
    try {
      await axios.put(
        apiEndpoints.updateTaskStatus,
        null,
        {
          params: {
            task_id: selectedTask.id,
            new_status: selectedTask.status,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Task status updated");
      setTasks((prev) =>
        prev.map((t) => (t.id === selectedTask.id ? { ...t, status: selectedTask.status } : t))
      );
      setFilteredTasks((prev) =>
        prev.map((t) => (t.id === selectedTask.id ? { ...t, status: selectedTask.status } : t))
      );
      setSelectedTask(null);
    } catch (err) {
      toast.error("Failed to update task status");
    }
  };

  const paginatedTasks = filteredTasks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const today = new Date();
  const totalTasks = filteredTasks.length;
  const completedTasks = filteredTasks.filter((t) => t.status === "Completed").length;
  const overdueTasks = filteredTasks.filter(
    (t) => new Date(t.dueDate) < today && t.status !== "Completed"
  ).length;
  const highPriorityTasks = filteredTasks.filter((t) => t.priority === "High").length;
  // whatspp and sms service
  const sendMessage = async (type, to, message) => {
    try {
      const endpoint = type === "sms" ? apiEndpoints.sendSMS : apiEndpoints.sendWhatsApp;

      const res = await axios.post(
        endpoint,
        {
          to,
          message,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(`${type.toUpperCase()} sent!`);
    } catch (err) {
      toast.error(`Failed to send ${type.toUpperCase()}`);
    }
  };

  return (
    <div className="p-6">
      <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
        <div className="flex items-center gap-2">
          <Briefcase className="text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-800">My Tasks</h2>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Filter className="text-gray-500" />
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="border rounded px-3 py-1 text-sm shadow-sm"
          >
            <option value="All">All Tasks</option>
            <optgroup label="Status">
              {statusOptions.map((s) => (
                <option key={s} value={`Status: ${s}`}>{s}</option>
              ))}
            </optgroup>
            <optgroup label="Priority">
              {priorityOptions.map((p) => (
                <option key={p} value={`Priority: ${p}`}>{p}</option>
              ))}
            </optgroup>
          </select>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border rounded px-3 py-1 text-sm shadow-sm"
          >
            <option value="">Sort By</option>
            <option value="DueDate">Due Date</option>
          </select>

          <div className="flex items-center border rounded px-2 py-1 shadow-sm text-sm">
            <Search className="w-4 h-4 text-gray-400 mr-1" />
            <input
              type="text"
              placeholder="Search task or lead email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="outline-none text-sm w-full"
            />
          </div>
        </div>
      </div>

      {/* Analytics Section */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-white border shadow-sm rounded-lg p-4 text-center">
          <p className="text-sm text-gray-500">Total Tasks</p>
          <p className="text-xl font-bold text-indigo-600">{totalTasks}</p>
        </div>
        <div className="bg-white border shadow-sm rounded-lg p-4 text-center">
          <p className="text-sm text-gray-500">Completed</p>
          <p className="text-xl font-bold text-green-600">{completedTasks}</p>
        </div>
        <div className="bg-white border shadow-sm rounded-lg p-4 text-center">
          <p className="text-sm text-gray-500">Overdue</p>
          <p className="text-xl font-bold text-red-600">{overdueTasks}</p>
        </div>
        <div className="bg-white border shadow-sm rounded-lg p-4 text-center">
          <p className="text-sm text-gray-500">High Priority</p>
          <p className="text-xl font-bold text-orange-600">{highPriorityTasks}</p>
        </div>
      </div>

      {!isLoaded ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin w-10 h-10 text-gray-400" />
        </div>
      ) : filteredTasks.length === 0 ? (
        <div className="text-center py-24 text-gray-500 text-sm italic">
          No tasks match the selected filter.
        </div>
      ) : (
        <div>
          <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {paginatedTasks.map((task) => (
              <div
                key={task.id}
                onClick={() => setSelectedTask(task)}
                className="cursor-pointer bg-white hover:shadow-xl transition-all p-4 rounded-xl border border-gray-200 shadow-sm hover:-translate-y-1 duration-200"
              >
                <div className="flex justify-between items-center mb-1">
                  <h4 className="text-md font-semibold text-gray-800 truncate">{task.title}</h4>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${badgeColors[task.priority]}`}>
                    {task.priority}
                  </span>
                </div>
                <p className="text-sm text-gray-600 truncate mb-2">
                  {task.description || "No description"}
                </p>
                <div className="flex justify-between items-center mt-3 text-xs text-gray-500">
                  <span className={`px-2 py-0.5 rounded-full ${badgeColors[task.status]}`}>
                    {task.status}
                  </span>
                  <span>{task.dueDate ? formatDate(task.dueDate) : "No due date"}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          {filteredTasks.length > itemsPerPage && (
            <div className="flex justify-center mt-6 space-x-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className="px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200"
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span className="px-3 py-1 text-sm text-gray-600">
                Page {currentPage} of {Math.ceil(filteredTasks.length / itemsPerPage)}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((prev) =>
                    prev < Math.ceil(filteredTasks.length / itemsPerPage) ? prev + 1 : prev
                  )
                }
                className="px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200"
                disabled={currentPage === Math.ceil(filteredTasks.length / itemsPerPage)}
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}

      {/* Task Detail Modal */}
      {selectedTask && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-md p-6 relative animate-fade-in">
            <button
              onClick={() => setSelectedTask(null)}
              className="absolute top-3 right-4 text-gray-400 hover:text-gray-800 text-2xl"
            >
              &times;
            </button>
            <h3 className="text-lg font-bold text-gray-800 mb-4">Task Details</h3>
            <div className="space-y-2 text-sm text-gray-700">
              <p><strong>Title:</strong> {selectedTask.title}</p>
              <p><strong>Description:</strong> {selectedTask.description || "-"}</p>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Status</label>
                <select
                  className="w-full border px-3 py-2 rounded text-sm"
                  value={selectedTask.status}
                  onChange={(e) => setSelectedTask({ ...selectedTask, status: e.target.value })}
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
                <button
                  onClick={handleStatusUpdate}
                  className="mt-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
                >
                  Update Status
                </button>
              </div>
              <p><strong>Priority:</strong> {selectedTask.priority}</p>
              <p><strong>Due Date:</strong> {selectedTask.dueDate ? formatDate(selectedTask.dueDate) : "Not specified"}</p>
            </div>
            <hr className="my-4" />
            <div className="space-y-2 text-sm text-gray-700">
              <h4 className="font-semibold">Lead Info</h4>
              <p><strong>Name:</strong> {selectedTask.leadName || "-"}</p>
              <p><strong>Email:</strong> {selectedTask.leadEmail || "-"}</p>
              <p><strong>Phone:</strong> {selectedTask.leadPhone || "-"}</p>
              <p><strong>Project:</strong> {selectedTask.leadProject || "-"}</p>
            </div>

            {selectedTask?.leadPhone && (
              <div className="mt-4 space-y-2">
                <button
                  onClick={() =>
                    toast.info(
                      ({ closeToast }) => (
                        <div>
                          <p className="mb-2">
                            Confirm sending <strong>SMS</strong> to {selectedTask.leadPhone}?
                          </p>
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => {
                                sendMessage(
                                  "sms",
                                  selectedTask.leadPhone,
                                  `Hi ${selectedTask.leadName}, regarding your project ${selectedTask.leadProject}...`
                                );
                                closeToast();
                              }}
                              className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
                            >
                              Yes
                            </button>
                            <button
                              onClick={closeToast}
                              className="bg-gray-300 hover:bg-gray-400 px-3 py-1 rounded text-sm"
                            >
                              No
                            </button>
                          </div>
                        </div>
                      ),
                      { autoClose: false }
                    )
                  }
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 text-sm w-full"
                >
                  Send SMS
                </button>

                <button
                  onClick={() =>
                    toast.info(
                      ({ closeToast }) => (
                        <div>
                          <p className="mb-2">
                            Confirm sending <strong>WhatsApp</strong> to {selectedTask.leadPhone}?
                          </p>
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => {
                                sendMessage(
                                  "whatsapp",
                                  selectedTask.leadPhone,
                                  `Hello ${selectedTask.leadName}, this is about your interest in project ${selectedTask.leadProject}.`
                                );
                                closeToast();
                              }}
                              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
                            >
                              Yes
                            </button>
                            <button
                              onClick={closeToast}
                              className="bg-gray-300 hover:bg-gray-400 px-3 py-1 rounded text-sm"
                            >
                              No
                            </button>
                          </div>
                        </div>
                      ),
                      { autoClose: false }
                    )
                  }
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-sm w-full"
                >
                  Send WhatsApp Message
                </button>
                {/* Call Client Button */}
                {/* Call Client Button */}
                <button
                  onClick={async () => {
                    try {
                      toast.info("Initiating call...");
                      const res = await axios.post(
                        `${apiEndpoints.callClient}?to_number=${encodeURIComponent(selectedTask.leadPhone)}`,
                        {},
                        {
                          headers: {
                            Authorization: `Bearer ${token}`,
                          },
                        }
                      );
                      toast.success(`Call started (SID: ${res.data.call_sid})`);
                    } catch (err) {
                      console.error(err);
                      toast.error("Failed to start call");
                    }
                  }}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded text-sm w-full"
                >
                  Call Client
                </button>


              </div>
            )}


          </div>
        </div>
      )}
    </div>
  );
};

export default MyTasks;
