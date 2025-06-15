// import {React,useState} from 'react';
// import { useNavigate } from 'react-router-dom';
// import AddNewLeadModal from './AddNewLeadModal';

// const ViewAllLeads = () => {
//     const [showModal, setShowModal] = useState(false);

//   const handleClickAddNewLead = () => {
//     setShowModal(true);
//   };

//   const closeModal = () => {
//     setShowModal(false);
//   };

  
//   return (
//     <main className="flex-1 overflow-y-auto bg-neutral p-6">
//       {/* Header Section */}
//       <div className="flex items-center justify-between mb-6">

//       {showModal && <div className='fixed inset-0 z-50 bg-black/80 '>
//       <AddNewLeadModal onClose={closeModal} />  
//       </div>}

//         <div>
//           <h1 className="text-2xl font-bold text-primary">Leads</h1>
//           <p className="text-sm text-gray-500">Manage and track your leads</p>
//         </div>
//         <div className="flex space-x-3">
//           {/* Search Input */}
//           <div className="relative">
//             <input
//               type="text"
//               className="flex h-10 w-64 rounded-md border border-input bg-background px-3 py-2 text-sm pr-10 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
//               placeholder="Search leads..."
//             />
//             <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
//               <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//                 <circle cx="11" cy="11" r="8" />
//                 <line x1="21" y1="21" x2="16.65" y2="16.65" />
//               </svg>
//             </button>
//           </div>
//           {/* Add New Lead Button */}
//           <button onClick={()=>handleClickAddNewLead()} className="inline-flex items-center justify-center gap-2 h-10 px-4 py-2 text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 rounded-md">
//             <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//               <line x1="12" y1="5" x2="12" y2="19" />
//               <line x1="5" y1="12" x2="19" y2="12" />
//             </svg>
//             Add New Lead
//           </button>
//         </div>
//       </div>

//       {/* Tabbed Filters */}
//       <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
//         <div className="flex flex-col space-y-1.5 p-6 pb-3">
//           <h3 className="text-2xl font-semibold leading-none tracking-tight">
//             <div className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground">
//               {['All Leads', 'New', 'In Progress', 'Converted', 'Lost', 'Unassigned'].map((tab, idx) => (
//                 <button
//                   key={tab}
//                   type="button"
//                   className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
//                     tab === 'Converted'
//                       ? 'bg-background text-foreground shadow-sm'
//                       : 'text-muted-foreground'
//                   }`}
//                 >
//                   {tab}
//                 </button>
//               ))}
//             </div>
//           </h3>
//         </div>

//         {/* Leads Table */}
//         <div className="p-6 pt-0">
//           <div className="overflow-x-auto">
//             <div className="relative w-full overflow-auto">
//               <table className="w-full text-sm">
//                 <thead>
//                   <tr className="border-b transition-colors hover:bg-muted/50">
//                     {[
//                       'Name',
//                       'Contact',
//                       'Source',
//                       'Project',
//                       'Assigned To',
//                       'Property Interest',
//                       'Status',
//                       'Created Date',
//                       'Actions',
//                     ].map((heading) => (
//                       <th
//                         key={heading}
//                         className="h-12 px-4 text-left align-middle font-medium text-muted-foreground"
//                       >
//                         {heading}
//                       </th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr className="border-b hover:bg-muted/50">
//                     <td
//                       className="p-4 text-center py-6 text-gray-500"
//                       colSpan="8"
//                     >
//                       No leads found. Click "Add New Lead" to create one.
//                     </td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//           </div>

//           {/* Pagination */}
//           <div className="flex justify-center mt-6">
//             <nav className="flex items-center">
//               <button
//                 className="px-3 py-1 text-sm text-gray-500 border border-gray-300 rounded-l-lg disabled:opacity-50"
//                 disabled
//               >
//                 <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//                   <polyline points="15 18 9 12 15 6" />
//                 </svg>
//               </button>
//               <button className="px-3 py-1 text-sm text-white bg-orange-500 border border-orange-500">1</button>
//               <button className="px-3 py-1 text-sm text-gray-500 border border-gray-300 rounded-r-lg">
//                 <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//                   <polyline points="9 18 15 12 9 6" />
//                 </svg>
//               </button>
//             </nav>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// };

// export default ViewAllLeads;


// import React, { useState } from 'react';


// const ViewAllLeads = () => {
//   const [showModal, setShowModal] = useState(false);
//   const [activeTab, setActiveTab] = useState('All Leads');

//   const tabs = ['All Leads', 'New', 'In Progress', 'Converted', 'Lost', 'Unassigned'];

//   const handleClickAddNewLead = () => {
//     setShowModal(true);
//   };

//   const closeModal = () => {
//     setShowModal(false);
//   };

//   return (
//     <main className="flex-1 overflow-y-auto bg-neutral p-6">
//       {/* Header Section */}
//       <div className="flex items-center justify-between mb-6">
//         {showModal && (
//           <div className="fixed inset-0 z-50 bg-black/80">
//             <AddNewLeadModal onClose={closeModal} />
//           </div>
//         )}

//         <div>
//           <h1 className="text-2xl font-bold text-primary">Leads</h1>
//           <p className="text-sm text-gray-500">Manage and track your leads</p>
//         </div>

//         <div className="flex space-x-3">
//           {/* Search Input */}
//           <div className="relative">
//             <input
//               type="text"
//               className="flex h-10 w-64 rounded-md border border-input bg-background px-3 py-2 text-sm pr-10 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
//               placeholder="Search leads..."
//             />
//             <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
//               <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//                 <circle cx="11" cy="11" r="8" />
//                 <line x1="21" y1="21" x2="16.65" y2="16.65" />
//               </svg>
//             </button>
//           </div>

//           {/* Add New Lead Button */}
//           <button
//             onClick={handleClickAddNewLead}
//             className="inline-flex items-center justify-center gap-2 h-10 px-4 py-2 text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 rounded-md"
//           >
//             <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//               <line x1="12" y1="5" x2="12" y2="19" />
//               <line x1="5" y1="12" x2="19" y2="12" />
//             </svg>
//             Add New Lead
//           </button>
//         </div>
//       </div>

//       {/* Tabbed Filters */}
//       <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
//         <div className="flex flex-col space-y-1.5 p-6 pb-3">
//           <h3 className="text-2xl font-semibold leading-none tracking-tight">
//             <div className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground">
//               {tabs.map((tab) => (
//                 <button
//                   key={tab}
//                   type="button"
//                   onClick={() => setActiveTab(tab)}
//                   className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
//                     ${activeTab === tab
//                       ? 'bg-background text-foreground shadow-sm'
//                       : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'}
//                   `}
//                 >
//                   {tab}
//                 </button>
//               ))}
//             </div>
//           </h3>
//         </div>

//         {/* Leads Table */}
//         <div className="p-6 pt-0">
//           <div className="overflow-x-auto">
//             <div className="relative w-full overflow-auto">
//               <table className="w-full text-sm">
//                 <thead>
//                   <tr className="border-b transition-colors hover:bg-muted/50">
//                     {[
//                       'Name',
//                       'Contact',
//                       'Source',
//                       'Project',
//                       'Assigned To',
//                       'Property Interest',
//                       'Status',
//                       'Created Date',
//                       'Actions',
//                     ].map((heading) => (
//                       <th
//                         key={heading}
//                         className="h-12 px-4 text-left align-middle font-medium text-muted-foreground"
//                       >
//                         {heading}
//                       </th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr className="border-b hover:bg-muted/50">
//                     <td className="p-4 text-center py-6 text-gray-500" colSpan="8">
//                       No leads found in "<strong>{activeTab}</strong>" tab.
//                     </td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//           </div>

//           {/* Pagination */}
//           <div className="flex justify-center mt-6">
//             <nav className="flex items-center">
//               <button
//                 className="px-3 py-1 text-sm text-gray-500 border border-gray-300 rounded-l-lg disabled:opacity-50"
//                 disabled
//               >
//                 <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//                   <polyline points="15 18 9 12 15 6" />
//                 </svg>
//               </button>
//               <button className="px-3 py-1 text-sm text-white bg-orange-500 border border-orange-500">1</button>
//               <button className="px-3 py-1 text-sm text-gray-500 border border-gray-300 rounded-r-lg">
//                 <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//                   <polyline points="9 18 15 12 9 6" />
//                 </svg>
//               </button>
//             </nav>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// };

// export default ViewAllLeads;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddNewLeadModal from './AddNewLeadModal';
import { checkUserValid } from "../../CommonUserValidCheck/checkUserValid";


const ViewAllLeads = () => {
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState('All Leads');

  const navigate = useNavigate();
  
   useEffect(() => {
      const isValid = checkUserValid();
    if (!isValid) {
      navigate('/login');
    }
  }, [navigate]);
  

  const handleClickAddNewLead = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const tabs = ['All Leads', 'New', 'In Progress', 'Converted', 'Lost', 'Unassigned'];

  return (
    <main className="flex-1 overflow-y-auto bg-neutral p-6">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        {showModal && (
          <div className="fixed inset-0 z-50 bg-black/80">
            <AddNewLeadModal onClose={closeModal} />
          </div>
        )}

        <div>
          <h1 className="text-2xl font-bold text-primary">Leads</h1>
          <p className="text-sm text-gray-500">Manage and track your leads</p>
        </div>

        <div className="flex space-x-3">
          {/* Search Input */}
          <div className="relative">
            <input
              type="text"
              className="flex h-10 w-64 rounded-md border border-input bg-background px-3 py-2 text-sm pr-10 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Search leads..."
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
          </div>

          {/* Add New Lead Button */}
          <button
            onClick={handleClickAddNewLead}
            className="inline-flex items-center justify-center gap-2 h-10 px-4 py-2 text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 rounded-md"
          >
            <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Add New Lead
          </button>
        </div>
      </div>

      {/* Tabbed Filters */}
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="flex flex-col space-y-1.5 p-6 pb-3">
          <h3 className="text-2xl font-semibold leading-none tracking-tight mb-3">Lead Status</h3>
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`inline-flex items-center justify-center whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium transition-colors duration-200
                  ${
                    activeTab === tab
                      ? 'bg-gray-700 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }
                `}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Leads Table */}
        <div className="p-6 pt-0">
          <div className="overflow-x-auto">
            <div className="relative w-full overflow-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b transition-colors hover:bg-muted/50">
                    {[
                      'Name',
                      'Contact',
                      'Source',
                      'Project',
                      'Assigned To',
                      'Property Interest',
                      'Status',
                      'Created Date',
                      'Actions',
                    ].map((heading) => (
                      <th
                        key={heading}
                        className="h-12 px-4 text-left align-middle font-medium text-muted-foreground"
                      >
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b hover:bg-muted/50">
                    <td
                      className="p-4 text-center py-6 text-gray-500"
                      colSpan="9"
                    >
                      No leads found in <strong>{activeTab}</strong>. Click "Add New Lead" to create one.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-6">
            <nav className="flex items-center">
              <button
                className="px-3 py-1 text-sm text-gray-500 border border-gray-300 rounded-l-lg disabled:opacity-50"
                disabled
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button className="px-3 py-1 text-sm text-white bg-orange-500 border border-orange-500">1</button>
              <button className="px-3 py-1 text-sm text-gray-500 border border-gray-300 rounded-r-lg">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ViewAllLeads;
