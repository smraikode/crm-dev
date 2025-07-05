import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Tab } from "@headlessui/react";
import { Pencil, Trash2 } from "lucide-react";
import { activeEnvironment } from "../../services/apiConfig";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const defaultForm = {
  id: null,
  name: "",
  location: "",
  price: "",
  type: "",
  status: "",
  description: "",
};

const ManageProperties = () => {
  const [properties, setProperties] = useState([]);
  const [formData, setFormData] = useState(defaultForm);
  const [isEditingId, setIsEditingId] = useState(null);
  const [tabIndex, setTabIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const token = localStorage.getItem("token");
  const fetchProperties = async () => {
    try {
      const res = await axios.get(`${activeEnvironment}/properties`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProperties(Array.isArray(res.data) ? res.data : []);
    } catch {
      toast.error("Failed to load properties");
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  useEffect(() => {
    if (tabIndex === 1 && !isEditingId) resetForm();
  }, [tabIndex]);

  const resetForm = () => {
    setFormData(defaultForm);
    setIsEditingId(null);
  };

  const validateForm = () => {
    const { name, location, price, type, status } = formData;
    if (!name || !location || !price || !type || !status) {
      toast.error("Please fill all required fields.");
      return false;
    }
    if (isNaN(price)) {
      toast.error("Price must be a number.");
      return false;
    }
    return true;
  };

  const handleAddOrUpdate = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      if (isEditingId) {
        await axios.put(
          `${activeEnvironment}/properties/${formData.id}`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success("Property updated");
      } else {
        await axios.post(
          `${activeEnvironment}/properties`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success("Property added");
      }
      resetForm();
      fetchProperties();
      setTabIndex(0);
    } catch {
      toast.error(isEditingId ? "Update failed" : "Add failed");
    }
    setIsSubmitting(false);
  };

  const handleEdit = (prop) => {
    setFormData(prop);
    setIsEditingId(prop.id);
  };

  const handleRemove = async (id) => {
    try {
      await axios.delete(`${activeEnvironment}/properties/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success("Property removed");
      fetchProperties();
    } catch {
      toast.error("Remove failed");
    }
  };

  const filteredProperties = properties.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <Tab.Group selectedIndex={tabIndex} onChange={setTabIndex}>
        <Tab.List className="flex space-x-2 border-b mb-4">
          <Tab className={({ selected }) =>
            classNames(
              "px-4 py-2 font-semibold",
              selected ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-600"
            )
          }>
            All Properties
          </Tab>
          <Tab className={({ selected }) =>
            classNames(
              "px-4 py-2 font-semibold",
              selected ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-600"
            )
          }>
            {isEditingId ? "Edit Property" : "Add New Property"}
          </Tab>
        </Tab.List>

        <Tab.Panels>
          {/* All Properties Panel */}
          <Tab.Panel>
            <input
              type="text"
              placeholder="Search by name or location"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border p-2 w-full sm:w-64 mb-4 rounded"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProperties.map((prop) =>
                isEditingId === prop.id ? (
                  <div key={prop.id} className="border p-4 rounded-xl bg-yellow-50">
                    <h3 className="text-md font-semibold mb-2">Editing {prop.name}</h3>
                    {["name", "location", "price", "description"].map((key) => (
                      <input
                        key={key}
                        className="border p-2 rounded w-full mb-2"
                        placeholder={key}
                        value={formData[key]}
                        onChange={(e) =>
                          setFormData({ ...formData, [key]: e.target.value })
                        }
                      />
                    ))}
                    <select
                      className="border p-2 rounded w-full mb-2"
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    >
                      <option value="">Select Type</option>
                      {["Residential", "Commercial", "Plot"].map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                    <select
                      className="border p-2 rounded w-full mb-4"
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    >
                      <option value="">Select Status</option>
                      {["Available", "Sold", "Under Construction"].map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    <div className="flex gap-2">
                      <button
                        onClick={handleAddOrUpdate}
                        disabled={isSubmitting}
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                      >
                        {isSubmitting ? "Saving..." : "Save"}
                      </button>
                      <button
                        onClick={resetForm}
                        className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div key={prop.id} className="bg-white border p-4 rounded-xl shadow">
                    <h3 className="text-lg font-bold text-gray-800">{prop.name}</h3>
                    <p className="text-sm text-gray-600">{prop.location}</p>
                    <p className="text-sm">₹{Number(prop.price).toLocaleString()}</p>
                    <p className="text-sm">{prop.type}</p>
                    <p className="text-sm">{prop.status}</p>
                    <p className="text-sm text-gray-500">{prop.description}</p>
                    <div className="flex gap-3 mt-4">
                      <button onClick={() => handleEdit(prop)} className="text-blue-600 hover:text-blue-800">
                        <Pencil size={18} />
                      </button>
                      <button onClick={() => handleRemove(prop.id)} className="text-red-500 hover:text-red-700">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                )
              )}
            </div>
          </Tab.Panel>

          {/* Add New Property Panel */}
          <Tab.Panel>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {["name", "location", "price", "description"].map((key) => (
                <input
                  key={key}
                  className="border p-2 rounded"
                  type="text"
                  placeholder={key}
                  value={formData[key]}
                  onChange={(e) =>
                    setFormData({ ...formData, [key]: e.target.value })
                  }
                />
              ))}
              <select
                className="border p-2 rounded"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              >
                <option value="">Select Type</option>
                {["Residential", "Commercial", "Plot"].map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
              <select
                className="border p-2 rounded"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <option value="">Select Status</option>
                {["Available", "Sold", "Under Construction"].map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div className="flex gap-3">
              <button
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                onClick={handleAddOrUpdate}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving..." : isEditingId ? "Update Property" : "Add Property"}
              </button>
              {isEditingId && (
                <button
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                  onClick={resetForm}
                >
                  Cancel
                </button>
              )}
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default ManageProperties;
