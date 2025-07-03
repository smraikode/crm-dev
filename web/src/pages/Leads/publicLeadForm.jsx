import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { activeEnvironment } from "../../services/apiConfig";

const PublicLeadForm = () => {
  const [lead, setLead] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    source: "",
    customSource: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (
      !lead.firstName.trim() ||
      !lead.lastName.trim() ||
      !emailRegex.test(lead.email) ||
      !/^\d{10}$/.test(lead.phone) ||
      !lead.source.trim() ||
      (lead.source === "Other" && !lead.customSource.trim())
    ) {
      toast.error("Please fill in all required fields correctly.");
      return;
    }

    const finalPayload = {
      ...lead,
      source: lead.source === "Other" ? lead.customSource : lead.source,
    };

    delete finalPayload.customSource;

    try {
      setLoading(true);
      await axios.post(`${activeEnvironment}/public-leads`, finalPayload);
      toast.success("Thank you! We will reach out soon.");
      setLead({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        source: "",
        customSource: "",
        notes: "",
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      toast.error(error.response?.data?.detail || "Failed to submit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-md shadow-md mt-10">
      <h2 className="text-lg font-bold mb-4">Register Your Interest</h2>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={lead.firstName}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
          aria-label="First Name"
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={lead.lastName}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
          aria-label="Last Name"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={lead.email}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
          aria-label="Email"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone"
          value={lead.phone}
          onChange={handleChange}
          maxLength={10}
          className="border p-2 rounded w-full"
          required
          aria-label="Phone Number"
        />
        <select
          name="source"
          value={lead.source}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
          aria-label="How did you hear about us?"
        >
          <option value="">How did you hear about us?</option>
          <option value="Facebook">Facebook</option>
          <option value="Instagram">Instagram</option>
          <option value="Google">Google</option>
          <option value="Referral">Referral</option>
          <option value="Website">Website</option>
          <option value="Other">Other</option>
        </select>

        {lead.source === "Other" && (
          <input
            type="text"
            name="customSource"
            placeholder="Please specify"
            value={lead.customSource}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
            aria-label="Custom Source"
          />
        )}

        <textarea
          name="notes"
          value={lead.notes}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          placeholder="Any additional notes (optional)"
          rows={3}
          aria-label="Additional Notes"
        />

        <button
          type="submit"
          disabled={loading}
          aria-busy={loading}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default PublicLeadForm;
