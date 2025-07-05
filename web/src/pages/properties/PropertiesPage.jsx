// src/pages/properties/PropertiesPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { activeEnvironment } from "../../services/apiConfig";
import { MapPin, Home, IndianRupee } from "lucide-react";

const ITEMS_PER_PAGE = 6;

const badgeColor = (status) => {
  switch (status?.toLowerCase()) {
    case "available":
      return "bg-green-100 text-green-700";
    case "sold":
      return "bg-red-100 text-red-700";
    case "rented":
      return "bg-yellow-100 text-yellow-800";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

const PropertiesPage = () => {
  const [properties, setProperties] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [sortOrder, setSortOrder] = useState("");
  const token = localStorage.getItem("token");
  const fetchProperties = async () => {
    try {
      const res = await axios.get(`${activeEnvironment}/properties`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (Array.isArray(res.data)) {
        setProperties(res.data);
        setFiltered(res.data);
      } else {
        toast.error("Invalid response from server");
        setProperties([]);
        setFiltered([]);
      }
    } catch (err) {
      toast.error("Failed to fetch properties");
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const locations = [...new Set(properties.map((p) => p.location))];

  const handleFilterSort = () => {
    let temp = [...properties];

    if (selectedLocation !== "all") {
      temp = temp.filter((p) => p.location === selectedLocation);
    }

    if (sortOrder === "low") {
      temp.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (sortOrder === "high") {
      temp.sort((a, b) => Number(b.price) - Number(a.price));
    }

    setFiltered(temp);
    setCurrentPage(1);
  };

  useEffect(() => {
    handleFilterSort();
  }, [selectedLocation, sortOrder, properties]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginatedProps = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="min-h-screen flex flex-col p-6 bg-gray-50">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">🏠 Properties Overview</h2>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6 items-center">
        <select
          className="border rounded px-3 py-2 text-sm text-gray-700"
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
        >
          <option value="all">All Locations</option>
          {locations.map((loc, i) => (
            <option key={i} value={loc}>
              {loc}
            </option>
          ))}
        </select>

        <select
          className="border rounded px-3 py-2 text-sm text-gray-700"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="">Sort By Price</option>
          <option value="low">Low to High</option>
          <option value="high">High to Low</option>
        </select>
      </div>

      {/* Properties */}
      {filtered.length === 0 ? (
        <p className="text-gray-500 flex-grow">No properties found.</p>
      ) : (
        <div className="flex-grow">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedProps.map((prop) => (
              <div
                key={prop.id}
                className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5 transition hover:shadow-lg"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                    <Home size={18} /> {prop.name}
                  </h3>
                  <span className={`px-3 py-0.5 rounded-full text-xs font-semibold ${badgeColor(prop.status)}`}>
                    {prop.status}
                  </span>
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <p className="flex items-center gap-2">
                    <MapPin size={14} /> {prop.location}
                  </p>
                  <p>
                    <span className="font-medium">Type:</span> {prop.type}
                  </p>
                  <p className="flex items-center gap-2">
                    <IndianRupee size={14} />
                    <span>{Number(prop.price).toLocaleString()}</span>
                  </p>
                  {prop.description && (
                    <p className="text-xs italic mt-2 text-gray-500">{prop.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-10 flex justify-center items-center gap-4">
            <button
              className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              ← Prev
            </button>
            <span className="text-sm text-gray-600 font-medium">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-sm"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              Next →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertiesPage;
