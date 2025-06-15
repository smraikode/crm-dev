import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkUserValid } from "../../CommonUserValidCheck/checkUserValid";

const AddNewLeadModal = ({ onClose }) => {
  const navigate = useNavigate();

  useEffect(() => {
     const isValid = checkUserValid();
   if (!isValid) {
     navigate('/login');
   }
 }, [navigate]);

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    leadSource: 'website',
    assignTo: '',
    project: '',
    propertyInterest: '',
    minBudget: '',
    maxBudget: '',
    notes: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    // Add lead submit logic
  };

  const inputClass = 'mt-1 w-full h-10 px-3 py-2 border rounded-md text-sm';

  return (
    <div className="fixed left-1/2 top-1/2 z-50 w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%] -translate-x-1/2 -translate-y-1/2 bg-white border shadow-lg p-4 sm:p-6 rounded-lg max-h-[90vh] overflow-y-auto">
      <div className="flex justify-between items-start">
        <h2 className="text-lg font-semibold">Add New Lead</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-black text-xl">✕</button>
      </div>

      <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { label: 'First Name', name: 'firstName', type: 'text' },
            { label: 'Last Name', name: 'lastName', type: 'text' },
            { label: 'Email Address', name: 'email', type: 'email' },
            { label: 'Phone Number', name: 'phone', type: 'tel' },
          ].map(({ label, name, type }) => (
            <div key={name}>
              <label className="text-sm font-medium">{label}</label>
              <input
                type={type}
                name={name}
                value={form[name]}
                onChange={handleChange}
                placeholder={label}
                className={inputClass}
              />
            </div>
          ))}

          <div>
            <label className="text-sm font-medium">Lead Source</label>
            <select
              name="leadSource"
              value={form.leadSource}
              onChange={handleChange}
              className={inputClass}
            >
              {['Website', 'Direct Call', 'Referral', 'Marketing', 'Other'].map((source) => (
                <option key={source} value={source.toLowerCase().replace(' ', '_')}>
                  {source}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">Assign To</label>
            <select
              name="assignTo"
              value={form.assignTo}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="">Select Team Member</option>
              {/* Add team members here */}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">Project</label>
            <select
              name="project"
              value={form.project}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="">Select Project</option>
              {[
                'Emerald Heights',
                'Horizon Business Park',
                'Serene Villas',
                'Coastal Retreat',
                'Heritage Homes',
                'Tech Park Plaza',
                'Riverside Gardens',
                'Urban Heights',
              ].map((project, idx) => (
                <option key={project} value={idx + 1}>
                  {project}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">Property Interest</label>
            <select
              name="propertyInterest"
              value={form.propertyInterest}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="">Select Property Type</option>
              <option value="apartment">Apartment</option>
              <option value="villa">Villa</option>
              <option value="plot">Plot</option>
              <option value="commercial">Commercial Space</option>
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className="text-sm font-medium">Budget Range</label>
            <div className="flex gap-4 mt-1">
              <input
                type="number"
                name="minBudget"
                value={form.minBudget}
                onChange={handleChange}
                placeholder="Min Budget"
                className="flex-1 h-10 px-3 py-2 border rounded-md text-sm"
              />
              <span className="self-center text-gray-500">to</span>
              <input
                type="number"
                name="maxBudget"
                value={form.maxBudget}
                onChange={handleChange}
                placeholder="Max Budget"
                className="flex-1 h-10 px-3 py-2 border rounded-md text-sm"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label className="text-sm font-medium">Notes</label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              placeholder="Additional notes about this lead..."
              className="w-full mt-1 h-20 px-3 py-2 border rounded-md text-sm"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:justify-end pt-4">
          <button
            type="button"
            onClick={onClose}
            className="h-10 px-4 py-2 border rounded-md text-sm hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="h-10 px-4 py-2 bg-orange-400 text-white rounded-md hover:bg-orange-600"
          >
            Add Lead
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNewLeadModal;
