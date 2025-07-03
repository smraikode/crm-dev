import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { activeEnvironment } from "../../services/apiConfig";

const LeadCreate = () => {
  const [lead, setLead] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    source: "",
    customSource: "",
    project: "",
    customProject: "",
    propertyInterest: "",
    budgetMin: "",
    budgetMax: "",
    notes: "",
    type: "Buyer",
  });

  const [propertyOptions, setPropertyOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await axios.get(`${activeEnvironment}/properties`);
        if (Array.isArray(res.data)) {
          const names = res.data.map((p) => p.name).filter(Boolean);
          setPropertyOptions(names);
        }
      } catch (err) {
        toast.error("Failed to fetch property list.");
      }
    };
    fetchProperties();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      const digitsOnly = value.replace(/\D/g, "");
      if (digitsOnly.length <= 10) {
        setLead((prev) => ({ ...prev, [name]: digitsOnly }));
      }
    } else {
      setLead((prev) => ({ ...prev, [name]: value }));
    }
  };

  const isFormValid =
    lead.firstName.trim() &&
    lead.lastName.trim() &&
    lead.email.trim() &&
    /^\d{10}$/.test(lead.phone) &&
    lead.source &&
    (lead.source !== "Other" || lead.customSource.trim());

  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalPayload = {
      ...lead,
      source: lead.source === "Other" ? lead.customSource : lead.source,
      project: lead.project === "Other" ? lead.customProject : lead.project,
    };

    delete finalPayload.customSource;
    delete finalPayload.customProject;

    try {
      setLoading(true);
      await axios.post(`${activeEnvironment}/leads`, finalPayload);
      toast.success("Lead created successfully!");
      setLead({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        source: "",
        customSource: "",
        project: "",
        customProject: "",
        propertyInterest: "",
        budgetMin: "",
        budgetMax: "",
        notes: "",
        type: "Buyer",
      });
    } catch (err) {
      if (err.response && err.response.status === 400) {
        toast.error(err.response.data.detail || "Duplicate lead.");
      } else {
        toast.error("Failed to create lead.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-md shadow-md mt-6 overflow-y-auto max-h-[90vh]">
      <h2 className="text-xl font-bold mb-4">Add New Lead</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* First Name */}
        <div>
          <label className="block text-sm mb-1">First Name</label>
          <input
            type="text"
            name="firstName"
            value={lead.firstName}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-sm mb-1">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={lead.lastName}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={lead.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm mb-1">Phone</label>
          <input
            type="tel"
            name="phone"
            value={lead.phone}
            onChange={handleChange}
            inputMode="numeric"
            maxLength={10}
            placeholder="Enter 10-digit phone number"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Source */}
        <div>
          <label className="block text-sm mb-1">Source</label>
          <select
            name="source"
            value={lead.source}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="">Select Source</option>
            <option value="Facebook">Facebook</option>
            <option value="Instagram">Instagram</option>
            <option value="Walk-in">Walk-in</option>
            <option value="Referral">Referral</option>
            <option value="Website">Website</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Custom Source */}
        {lead.source === "Other" && (
          <div>
            <label className="block text-sm mb-1">Custom Source</label>
            <input
              type="text"
              name="customSource"
              value={lead.customSource}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Enter custom source"
            />
          </div>
        )}

        {/* Project (Dynamic Dropdown) */}
        <div>
          <label className="block text-sm mb-1">Project</label>
          <select
            name="project"
            value={lead.project}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="">Select Project</option>
            {propertyOptions.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Custom Project */}
        {lead.project === "Other" && (
          <div>
            <label className="block text-sm mb-1">Custom Project</label>
            <input
              type="text"
              name="customProject"
              value={lead.customProject}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Enter project name"
            />
          </div>
        )}

        {/* Property Interest */}
        <div>
          <label className="block text-sm mb-1">Property Interest</label>
          <select
            name="propertyInterest"
            value={lead.propertyInterest}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="">Select Property Type</option>
            <option value="Apartment">Apartment</option>
            <option value="Villa">Villa</option>
            <option value="Plot">Plot</option>
            <option value="Commercial Space">Commercial Space</option>
          </select>
        </div>

        {/* Budget Min */}
        <div>
          <label className="block text-sm mb-1">Min Budget</label>
          <input
            type="number"
            name="budgetMin"
            value={lead.budgetMin}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Min Budget"
          />
        </div>

        {/* Budget Max */}
        <div>
          <label className="block text-sm mb-1">Max Budget</label>
          <input
            type="number"
            name="budgetMax"
            value={lead.budgetMax}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Max Budget"
          />
        </div>

        {/* Notes */}
        <div className="md:col-span-2">
          <label className="block text-sm mb-1">Notes</label>
          <textarea
            name="notes"
            value={lead.notes}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            rows={3}
            placeholder="Additional notes about this lead..."
          ></textarea>
        </div>

        {/* Type */}
        <div className="md:col-span-2">
          <label className="block text-sm mb-1">Type</label>
          <select
            name="type"
            value={lead.type}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="Buyer">Buyer</option>
            <option value="Seller">Seller</option>
            <option value="Renter">Renter</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="md:col-span-2 flex justify-between">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading || !isFormValid}
            className={`bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 ${
              loading || !isFormValid ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Creating..." : "Add Lead"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LeadCreate;
