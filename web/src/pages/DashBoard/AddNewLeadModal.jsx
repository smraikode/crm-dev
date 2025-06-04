import React, { useState } from 'react';

const AddNewLeadModal = ({onClose}) => {
    let [modalShow, setModalShow] = useState(true)
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
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    // Handle form submission logic here
  };

  
  return (
    <div className="fixed left-1/2 top-1/2 z-50 grid w-full max-w-2xl translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white p-6 shadow-lg sm:rounded-lg max-h-[90vh] overflow-y-auto">
      <div className="flex justify-between items-start">
        <h2 className="text-lg font-semibold">Add New Lead</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-black">
          ✕
        </button>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                className="mt-1 w-full h-10 px-3 py-2 border rounded-md text-sm"
              />
            </div>
          ))}

          <div>
            <label className="text-sm font-medium">Lead Source</label>
            <select
              name="leadSource"
              value={form.leadSource}
              onChange={handleChange}
              className="mt-1 w-full h-10 px-3 py-2 border rounded-md text-sm"
            >
              <option value="website">Website</option>
              <option value="direct_call">Direct Call</option>
              <option value="referral">Referral</option>
              <option value="marketing">Marketing</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">Assign To</label>
            <select
              name="assignTo"
              value={form.assignTo}
              onChange={handleChange}
              className="mt-1 w-full h-10 px-3 py-2 border rounded-md text-sm"
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
              className="mt-1 w-full h-10 px-3 py-2 border rounded-md text-sm"
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
                <option key={idx} value={idx + 1}>{project}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">Property Interest</label>
            <select
              name="propertyInterest"
              value={form.propertyInterest}
              onChange={handleChange}
              className="mt-1 w-full h-10 px-3 py-2 border rounded-md text-sm"
            >
              <option value="">Select Property Type</option>
              <option value="apartment">Apartment</option>
              <option value="villa">Villa</option>
              <option value="plot">Plot</option>
              <option value="commercial">Commercial Space</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="text-sm font-medium">Budget Range</label>
            <div className="flex gap-4 mt-2">
              <input
                type="number"
                name="minBudget"
                placeholder="Min Budget"
                value={form.minBudget}
                onChange={handleChange}
                className="flex-1 h-10 px-3 py-2 border rounded-md text-sm"
              />
              <span className="text-gray-500 self-center">to</span>
              <input
                type="number"
                name="maxBudget"
                placeholder="Max Budget"
                value={form.maxBudget}
                onChange={handleChange}
                className="flex-1 h-10 px-3 py-2 border rounded-md text-sm"
              />
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="text-sm font-medium">Notes</label>
            <textarea
              name="notes"
              placeholder="Additional notes about this lead..."
              value={form.notes}
              onChange={handleChange}
              className="w-full mt-1 h-20 px-3 py-2 border rounded-md text-sm"
            ></textarea>
          </div>
        </div>

        <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="h-10 px-4 py-2 border rounded-md text-sm hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="h-10 px-4 py-2 bg-orange-400 text-white rounded-md hover:bg-orange-700"
          >
            Add Lead
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNewLeadModal;
