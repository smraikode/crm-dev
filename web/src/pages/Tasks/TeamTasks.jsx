import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Loader2,
  Users,
  BadgeCheck,
  AlarmClock,
  Filter,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import getDecodedToken from "../../utils/decodeToken";
import { apiEndpoints } from "../../services/apiConfig";

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

const TaskCard = ({ task, onClick }) => {
  const isOverdue = task.status !== "Completed" && new Date(task.dueDate) < new Date();
  return (
    <div
      onClick={() => onClick(task)}
      className={`bg-white transition-shadow border rounded-xl p-5 shadow-sm cursor-pointer hover:-translate-y-1 duration-200 ${isOverdue ? "border-red-400 ring-1 ring-red-300" : "hover:shadow-lg"
        }`}
    >
      <div className="flex justify-between items-center mb-2">
        <h4 className="text-lg font-semibold text-gray-800 truncate">
          {task.title}
        </h4>
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${badgeColors[task.status]}`}>
          {task.status}
        </span>
      </div>
      <p className="text-sm text-gray-600 mb-2">
        {task.description || "No description"}
      </p>
      <div className="flex items-center text-sm text-gray-500 gap-2">
        <BadgeCheck className="w-4 h-4 text-indigo-400" />
        <span>{task.assigned_to || "Unassigned"}</span>
      </div>
      <div className="flex items-center text-sm text-gray-500 gap-2 mt-1">
        <AlarmClock className="w-4 h-4 text-red-400" />
        <span>{formatDate(task.dueDate)}</span>
      </div>
    </div>
  );
};

const TeamTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [page, setPage] = useState(1);
  const tasksPerPage = 6;
  const userEmail = getDecodedToken()?.email;
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get(apiEndpoints.getTeamTasks, {
          params: { user_email: userEmail },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTasks(res.data || []);
        setFilteredTasks(res.data || []);
      } catch (error) {
        console.error("Failed to fetch team tasks", error);
        toast.error("Failed to load team tasks");
      } finally {
        setIsLoaded(true);
      }
    };
    fetchTasks();
  }, [userEmail]);

  useEffect(() => {
    let result = [...tasks];

    if (filter !== "All") {
      const [type, value] = filter.split(": ");
      result = result.filter((task) =>
        type === "Status" ? task.status === value : task.priority === value
      );
    }

    if (searchQuery.trim()) {
      result = result.filter((task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.assigned_to.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (sort === "DueDate") {
      result.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    } else if (sort === "Priority") {
      result.sort((a, b) => a.priority.localeCompare(b.priority));
    }

    setFilteredTasks(result);
    setPage(1);
  }, [searchQuery, filter, sort, tasks]);

  const paginatedTasks = filteredTasks.slice(
    (page - 1) * tasksPerPage,
    page * tasksPerPage
  );
  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);

  const today = new Date();
  const totalTasks = filteredTasks.length;
  const completedTasks = filteredTasks.filter((t) => t.status === "Completed").length;
  const overdueTasks = filteredTasks.filter(
    (t) => new Date(t.dueDate) < today && t.status !== "Completed"
  ).length;
  const highPriorityTasks = filteredTasks.filter((t) => t.priority === "High").length;

  useEffect(() => {
    const closeOnEscape = (e) => e.key === "Escape" && setSelectedTask(null);
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6 flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <Users className="text-indigo-600 w-6 h-6" />
          <h2 className="text-2xl font-bold text-gray-800">Team Tasks</h2>
        </div>
        <div className="flex items-center gap-2">
          <Filter className="text-gray-500" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border px-3 py-1 rounded text-sm"
          >
            <option value="All">All</option>
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
            className="border px-2 py-1 rounded text-sm"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="">Sort By</option>
            <option value="DueDate">Due Date</option>
            <option value="Priority">Priority</option>
          </select>
          <div className="flex items-center border rounded px-2 py-1 shadow-sm text-sm">
            <Search className="w-4 h-4 text-gray-400 mr-1" />
            <input
              type="text"
              placeholder="Search task or assignee..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="outline-none text-sm w-full"
            />
          </div>
        </div>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
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
        <div className="text-center py-20 text-gray-500 italic">
          No tasks match your filters. Try clearing filters or searching another keyword.
        </div>
      ) : (
        <>
          <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {paginatedTasks.map((task) => (
              <TaskCard key={task.id} task={task} onClick={setSelectedTask} />
            ))}
          </div>

          <div className="flex justify-center gap-3 mt-6 flex-wrap">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              className="flex items-center gap-1 px-3 py-1 border rounded disabled:opacity-50"
            >
              <ChevronLeft className="w-4 h-4" /> Prev
            </button>

            <select
              value={page}
              onChange={(e) => setPage(Number(e.target.value))}
              className="border rounded px-2 py-1 text-sm"
            >
              {[...Array(totalPages).keys()].map((_, i) => (
                <option key={i} value={i + 1}>Page {i + 1}</option>
              ))}
            </select>

            <button
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page === totalPages}
              className="flex items-center gap-1 px-3 py-1 border rounded disabled:opacity-50"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </>
      )}

      {selectedTask && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center" role="dialog" aria-modal="true">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-md max-h-[80vh] overflow-y-auto p-6 relative animate-fade-in">
            <button
              onClick={() => setSelectedTask(null)}
              className="absolute top-3 right-4 text-gray-400 hover:text-gray-800 text-2xl"
              aria-label="Close task details"
            >
              &times;
            </button>
            <h3 className="text-lg font-bold text-gray-800 mb-4">Task Details</h3>
            <div className="space-y-2 text-sm text-gray-700">
              <p><strong>Title:</strong> {selectedTask.title}</p>
              <p><strong>Description:</strong> {selectedTask.description || "-"}</p>
              <p><strong>Status:</strong> {selectedTask.status}</p>
              <p><strong>Priority:</strong> {selectedTask.priority}</p>
              <p><strong>Due Date:</strong> {selectedTask.dueDate ? formatDate(selectedTask.dueDate) : "Not specified"}</p>
              <hr className="my-2" />
              <p><strong>Assigned To:</strong> {selectedTask.assigned_to}</p>
              <p><strong>Lead Email:</strong> {selectedTask.lead_email || "-"}</p>
              <p><strong>Lead Name:</strong> {selectedTask.leadName || "-"}</p>
              <p><strong>Lead Phone:</strong> {selectedTask.leadPhone || "-"}</p>
              <p><strong>Lead Project:</strong> {selectedTask.leadProject || "-"}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamTasks;
