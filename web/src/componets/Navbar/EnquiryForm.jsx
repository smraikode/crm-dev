// import {React,useState} from 'react';

// const EnquiryForm = () => {
//   const [selectedProject, setSelectedProject] = useState('');
//   const projects = [
//     'Project Alpha',
//     'Project Beta',
//     'Project Gamma',
//     'Project Delta',
//     'Project Epsilon',
//   ];
//   return (
//     <div className="bg-gray-100 p-8 rounded-md shadow-md max-w-4xl mx-auto my-8">
//       <div className='flex items-center'> 
//       <h2 className="text-2xl font-bold pt-7 text-gray-800 mb-6">PROJECT NAME:</h2>

//       <div className="w-full max-w-sm mx-auto">
//       <label htmlFor="project" className="block text-sm font-medium text-gray-700 mb-1">
//         Select Project
//       </label>
//       <select
//         id="project"
//         name="project"
//         value={selectedProject}
//         onChange={(e) => setSelectedProject(e.target.value)}
//         className="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//       >
//         <option value="" disabled>
//           -- Choose a project --
//         </option>
//         {projects.map((project, index) => (
//           <option key={index} value={project}>
//             {project}
//           </option>
//         ))}
//       </select>
     
//     </div>
//       </div>

//       <form className="space-y-6">
//         {/* Form No */}
//         <div>
//           <label
//             htmlFor="formNo"
//             className="block text-gray-700 font-medium mb-1"
//           >
//             Form No.:
//           </label>
//           <input
//             type="text"
//             id="formNo"
//             className="w-full border rounded px-3 py-2"
//           />
//         </div>

//         {/* Visit Time & Date */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div>
//             {/* <label
//               htmlFor="inTime"
//               className="block text-gray-700 font-medium mb-1"
//             >
//               In Time:
//             </label>
//             <div className="flex">
//               <input
//                 type="time"
//                 id="inTime"
//                 className="flex-1 border rounded px-3 py-2"
//               />
//               <select className="ml-2 border rounded px-2">
//                 <option>AM</option>
//                 <option>PM</option>
//               </select>
//             </div>
//           </div>
//           <div>
//             <label
//               htmlFor="outTime"
//               className="block text-gray-700 font-medium mb-1"
//             >
//               Out Time:
//             </label>
//             <div className="flex">
//               <input
//                 type="time"
//                 id="outTime"
//                 className="flex-1 border rounded px-3 py-2"
//               />
//               <select className="ml-2 border rounded px-2">
//                 <option>AM</option>
//                 <option>PM</option>
//               </select>
//             </div>
//           </div>
//           <div> */}
//             <label
//               htmlFor="dateOfVisit"
//               className="block text-gray-700 font-medium mb-1"
//             >
//               Date of Visit:
//             </label>
//             <input
//               type="date"
//               id="dateOfVisit"
//               className="w-full border rounded px-3 py-2"
//             />
//           </div>
//         </div>

//         {/* Visit Type */}
//         <div>
//           <span className="block text-gray-700 font-medium mb-1">
//             Type of Visit:
//           </span>
//           <div className="flex flex-col md:flex-row md:items-center md:space-x-6">
//             <label className="inline-flex items-center">
//               <input
//                 type="radio"
//                 name="visitType"
//                 value="fresh"
//                 className="mr-2"
//               />
//               Fresh
//             </label>
//             <label className="inline-flex items-center">
//               <input
//                 type="radio"
//                 name="visitType"
//                 value="revisit"
//                 className="mr-2"
//               />
//               Revisit
//               <input type="date" className="ml-2 border rounded px-2 py-1" />
//             </label>
//           </div>
//         </div>

//         {/* Walk-In Details */}
//         <div>
//           <span className="block text-gray-700 font-medium mb-1">
//             Walk-In Details:
//           </span>
//           <div className="flex space-x-4">
//             <label>
//               <input type="radio" value="individual" name="walkIn" className="mr-1" />{' '}
//               Individual
//             </label>
//             <label>
//               <input type="radio" value="group" name="walkIn" className="mr-1" /> Group
//             </label>
//             <label>
//               <input type="radio" value="family" name="walkIn" className="mr-1" /> Family
//             </label>
//           </div>
//         </div>

//         {/* Applicant Details */}
//         <div>
//           <h3 className="text-xl font-semibold text-gray-800 mb-4">
//             Applicant Details:
//           </h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <input
//               type="text"
//               placeholder="Name Mr./Dr./Ms./Mrs."
//               className="border rounded px-3 py-2"
//             />
//             <input
//               type="tel"
//               placeholder="Mobile No."
//               className="border rounded px-3 py-2"
//             />
//             <input
//               type="email"
//               placeholder="Email ID"
//               className="border rounded px-3 py-2"
//             />
//             <input
//               type="date"
//               placeholder="Date of Birth"
//               className="border rounded px-3 py-2"
//             />
//             <input
//               type="text"
//               placeholder="Ethnicity"
//               className="border rounded px-3 py-2"
//             />
//             <input
//               type="text"
//               placeholder="Marital Status"
//               className="border rounded px-3 py-2"
//             />
//           </div>
//         </div>

//         {/* Residential Address */}
//         <div>
//           <h3 className="text-lg font-semibold text-gray-800 mb-2">
//             Residential Address
//           </h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <input
//               type="text"
//               placeholder="Bldg./Bunglw. Name"
//               className="border rounded px-3 py-2"
//             />
//             <input
//               type="text"
//               placeholder="Landmark/Road"
//               className="border rounded px-3 py-2"
//             />
//             <input
//               type="text"
//               placeholder="Location"
//               className="border rounded px-3 py-2"
//             />
//             <input
//               type="text"
//               placeholder="City"
//               className="border rounded px-3 py-2"
//             />
//             <input
//               type="text"
//               placeholder="Pin Code"
//               className="border rounded px-3 py-2"
//             />
//             <input
//               type="text"
//               placeholder="Area"
//               className="border rounded px-3 py-2"
//             />
//           </div>
//         </div>

//         {/* Professional Details */}
//         <div>
//           <h3 className="text-lg font-semibold text-gray-800 mb-2">
//             Professional Details
//           </h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <input
//               type="text"
//               placeholder="Company Name"
//               className="border rounded px-3 py-2"
//             />
//             <input
//               type="text"
//               placeholder="Designation"
//               className="border rounded px-3 py-2"
//             />
//             <input
//               type="text"
//               placeholder="Place of Work"
//               className="border rounded px-3 py-2"
//             />
//           </div>
//         </div>

//         {/* Source of Information */}
//         <div>
//           <label className="block text-gray-700 font-medium mb-1">
//             How did you hear about the project?
//           </label>
//           <div className="grid grid-cols-2 gap-4">
//             {[
//               'Newspaper',
//               'Hoarding',
//               'Website',
//               'Pre Sales',
//               'Exhibition',
//               'Direct Mailer/Invitation',
//               'Word Of Mouth',
//               'Referral',
//               'Existing customer',
//             ].map((source) => (
//               <label key={source}>
//                 <input type="radio" className="mr-2" name="source" /> {source}
//               </label>
//             ))}
//           </div>
//           <input
//             type="text"
//             placeholder="Other Source Details"
//             className="mt-2 w-full border rounded px-3 py-2"
//           />
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
//             <input
//               type="text"
//               placeholder="Channel Partner/CP Organization"
//               className="border rounded px-3 py-2"
//             />
//             <input
//               type="text"
//               placeholder="Partner ID"
//               className="border rounded px-3 py-2"
//             />
//           </div>
//         </div>

//         {/* Interested In */}
//         <div>
//           <label className="block text-gray-700 font-medium mb-1">
//             Interested In:
//           </label>
//           <div className="flex flex-wrap gap-4">
//             {['1BHK', '2BHK', '3BHK', 'Shop'].map((unit) => (
//               <label key={unit}>
//                 <input type="radio" name="interestedIn" value={unit} className="mr-1" /> {unit}
//               </label>
//             ))}
//           </div>
//         </div>

//         {/* Budget */}
//         <div>
//           <label
//             htmlFor="budget"
//             className="block text-gray-700 font-medium mb-1"
//           >
//             Budget:
//           </label>
//           <input
//             type="text"
//             id="budget"
//             className="w-full border rounded px-3 py-2"
//           />
//         </div>

//         {/* Rating */}
//         <div>
//           <label className="block text-gray-700 font-medium mb-1">
//             Rating:
//           </label>
//           <div className="flex flex-wrap gap-4">
//             {['Booked', 'Hot', 'Warm', 'Cold', 'Lost'].map((status) => (
//               <label key={status}>
//                 <input
//                   type="radio"
//                   name="rating"
//                   value={status.toLowerCase()}
//                   className="mr-1"
//                 />{' '}
//                 {status}
//               </label>
//             ))}
//           </div>
//         </div>

//         {/* Remarks */}
//         <div>
//           <label
//             htmlFor="remarks"
//             className="block text-gray-700 font-medium mb-1"
//           >
//             Remarks:
//           </label>
//           <textarea
//             id="remarks"
//             rows="3"
//             className="w-full border rounded px-3 py-2"
//             placeholder="Add any additional remarks..."
//           />
//         </div>

//         {/* Sourcing By */}
//         <div>
//           <label
//             htmlFor="sourcingBy"
//             className="block text-gray-700 font-medium mb-1"
//           >
//             Sourcing By:
//           </label>
//           <input
//             type="text"
//             id="sourcingBy"
//             className="w-full border rounded px-3 py-2"
//             placeholder="Name of the source or channel"
//           />
//         </div>

//         {/* Attended By Salesperson */}
//         <div>
//           <label
//             htmlFor="attendedBy"
//             className="block text-gray-700 font-medium mb-1"
//           >
//             Attended By Salesperson:
//           </label>
//           <input
//             type="text"
//             id="attendedBy"
//             className="w-full border rounded px-3 py-2"
//             placeholder="Salesperson name"
//           />
//         </div>

//         {/* Date and Place */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label
//               htmlFor="date"
//               className="block text-gray-700 font-medium mb-1"
//             >
//               Date:
//             </label>
//             <input
//               type="date"
//               id="date"
//               className="w-full border rounded px-3 py-2"
//             />
//           </div>
//           <div>
//             <label
//               htmlFor="place"
//               className="block text-gray-700 font-medium mb-1"
//             >
//               Place:
//             </label>
//             <input
//               type="text"
//               id="place"
//               className="w-full border rounded px-3 py-2"
//             />
//           </div>
//         </div>

//         <button className="bg-blue-500 text-white py-2 px-4 rounded mt-4">
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default EnquiryForm;


import React, { useState } from 'react';

const EnquiryForm = () => {
  const [selectedProject, setSelectedProject] = useState('');
  const projects = [
    'Project Alpha',
    'Project Beta',
    'Project Gamma',
    'Project Delta',
    'Project Epsilon',
  ];

  return (
    <div className="bg-gray-100 p-6 sm:p-8 rounded-md shadow-md max-w-5xl mx-auto my-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-0 whitespace-nowrap">
          PROJECT NAME:
        </h2>

        <div className="w-full max-w-sm">
          <label
            htmlFor="project"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Select Project
          </label>
          <select
            id="project"
            name="project"
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>
              -- Choose a project --
            </option>
            {projects.map((project, index) => (
              <option key={index} value={project}>
                {project}
              </option>
            ))}
          </select>
        </div>
      </div>

      <form className="space-y-6">
        {/* Form No */}
        <div>
          <label htmlFor="formNo" className="block text-gray-700 font-medium mb-1">
            Form No.:
          </label>
          <input
            type="text"
            id="formNo"
            className="w-full border rounded px-3 py-2"
            placeholder="Enter form number"
          />
        </div>

        {/* Date of Visit */}
        <div>
          <label
            htmlFor="dateOfVisit"
            className="block text-gray-700 font-medium mb-1"
          >
            Date of Visit:
          </label>
          <input
            type="date"
            id="dateOfVisit"
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Type of Visit */}
        <div>
          <span className="block text-gray-700 font-medium mb-2">Type of Visit:</span>
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6">
            <label className="inline-flex items-center mb-2 sm:mb-0">
              <input type="radio" name="visitType" value="fresh" className="mr-2" />
              Fresh
            </label>
            <label className="inline-flex items-center space-x-2">
              <input type="radio" name="visitType" value="revisit" className="mr-2" />
              <span>Revisit</span>
              <input
                type="date"
                className="border rounded px-2 py-1"
                aria-label="Revisit date"
              />
            </label>
          </div>
        </div>

        {/* Walk-In Details */}
        <div>
          <span className="block text-gray-700 font-medium mb-2">Walk-In Details:</span>
          <div className="flex flex-wrap gap-4">
            <label className="inline-flex items-center">
              <input type="radio" value="individual" name="walkIn" className="mr-1" />
              Individual
            </label>
            <label className="inline-flex items-center">
              <input type="radio" value="group" name="walkIn" className="mr-1" />
              Group
            </label>
            <label className="inline-flex items-center">
              <input type="radio" value="family" name="walkIn" className="mr-1" />
              Family
            </label>
          </div>
        </div>

        {/* Applicant Details */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Applicant Details:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Name Mr./Dr./Ms./Mrs."
              className="border rounded px-3 py-2"
            />
            <input
              type="tel"
              placeholder="Mobile No."
              className="border rounded px-3 py-2"
            />
            <input
              type="email"
              placeholder="Email ID"
              className="border rounded px-3 py-2"
            />
            <input
              type="date"
              placeholder="Date of Birth"
              className="border rounded px-3 py-2"
            />
            <input
              type="text"
              placeholder="Ethnicity"
              className="border rounded px-3 py-2"
            />
            <input
              type="text"
              placeholder="Marital Status"
              className="border rounded px-3 py-2"
            />
          </div>
        </div>

        {/* Residential Address */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Residential Address
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Bldg./Bunglw. Name"
              className="border rounded px-3 py-2"
            />
            <input
              type="text"
              placeholder="Landmark/Road"
              className="border rounded px-3 py-2"
            />
            <input
              type="text"
              placeholder="Location"
              className="border rounded px-3 py-2"
            />
            <input
              type="text"
              placeholder="City"
              className="border rounded px-3 py-2"
            />
            <input
              type="text"
              placeholder="Pin Code"
              className="border rounded px-3 py-2"
            />
            <input
              type="text"
              placeholder="Area"
              className="border rounded px-3 py-2"
            />
          </div>
        </div>

        {/* Professional Details */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Professional Details
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Company Name"
              className="border rounded px-3 py-2"
            />
            <input
              type="text"
              placeholder="Designation"
              className="border rounded px-3 py-2"
            />
            <input
              type="text"
              placeholder="Place of Work"
              className="border rounded px-3 py-2"
            />
          </div>
        </div>

        {/* Source of Information */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            How did you hear about the project?
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[
              'Newspaper',
              'Hoarding',
              'Website',
              'Pre Sales',
              'Exhibition',
              'Direct Mailer/Invitation',
              'Word Of Mouth',
              'Referral',
              'Existing customer',
            ].map((source) => (
              <label key={source} className="inline-flex items-center">
                <input type="radio" className="mr-2" name="source" />
                {source}
              </label>
            ))}
          </div>
          <input
            type="text"
            placeholder="Other Source Details"
            className="mt-2 w-full border rounded px-3 py-2"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
            <input
              type="text"
              placeholder="Channel Partner/CP Organization"
              className="border rounded px-3 py-2"
            />
            <input
              type="text"
              placeholder="Partner ID"
              className="border rounded px-3 py-2"
            />
          </div>
        </div>

        {/* Interested In */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Interested In:</label>
          <div className="flex flex-wrap gap-4">
            {['1BHK', '2BHK', '3BHK', 'Shop'].map((unit) => (
              <label key={unit} className="inline-flex items-center">
                <input
                  type="radio"
                  name="interestedIn"
                  value={unit}
                  className="mr-1"
                />
                {unit}
              </label>
            ))}
          </div>
        </div>

        {/* Budget */}
        <div>
          <label
            htmlFor="budget"
            className="block text-gray-700 font-medium mb-1"
          >
            Budget:
          </label>
          <input
            type="text"
            id="budget"
            className="w-full border rounded px-3 py-2"
            placeholder="Enter budget"
          />
        </div>

        {/* Rating */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Rating:</label>
          <div className="flex flex-wrap gap-4">
            {['Booked', 'Hot', 'Warm', 'Cold', 'Lost'].map((status) => (
              <label key={status} className="inline-flex items-center">
                <input
                  type="radio"
                  name="rating"
                  value={status.toLowerCase()}
                  className="mr-1"
                />
                {status}
              </label>
            ))}
          </div>
        </div>

        {/* Remarks */}
        <div>
          <label
            htmlFor="remarks"
            className="block text-gray-700 font-medium mb-1"
          >
            Remarks:
          </label>
          <textarea
            id="remarks"
            rows="3"
            className="w-full border rounded px-3 py-2"
            placeholder="Add any additional remarks..."
          />
        </div>

        {/* Sourcing By */}
        <div>
          <label
            htmlFor="sourcingBy"
            className="block text-gray-700 font-medium mb-1"
          >
            Sourcing By:
          </label>
          <input
            type="text"
            id="sourcingBy"
            className="w-full border rounded px-3 py-2"
            placeholder="Name of the source or channel"
          />
        </div>

        {/* Attended By Salesperson */}
        <div>
          <label
            htmlFor="attendedBy"
            className="block text-gray-700 font-medium mb-1"
          >
            Attended By Salesperson:
          </label>
          <input
            type="text"
            id="attendedBy"
            className="w-full border rounded px-3 py-2"
            placeholder="Salesperson name"
          />
        </div>

        {/* Date and Place */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="date"
              className="block text-gray-700 font-medium mb-1"
            >
              Date:
            </label>
            <input
              type="date"
              id="date"
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label
              htmlFor="place"
              className="block text-gray-700 font-medium mb-1"
            >
              Place:
            </label>
            <input
              type="text"
              id="place"
              className="w-full border rounded px-3 py-2"
              placeholder="Enter place"
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 transition-colors text-white py-2 px-6 rounded mt-6 w-full sm:w-auto"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default EnquiryForm;
