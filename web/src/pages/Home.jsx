// import React from 'react'
// import Sidebar from './Sidebar/Sidebar'
// import { Outlet } from 'react-router-dom'
// import Navbar from '../componets/Navbar/Navbar'
// import Profile from '../componets/Navbar/Profile'

// const Home = () => {
//   return (
//     <>
//     <div className='flex w-full h-screen'>
    
//     <Sidebar />
//     <div className='ml-56 flex flex-col flex-1 overflow-y-auto'>
//     <Navbar className='p-4 bg-gray-100 flex-1 overflow-y-auto'/>
//     <Outlet />
    
//     </div>
    
//     </div>

     
//     </>
//   )
// }

// export default Home


// src/pages/Home.jsx
import React from 'react';
import Sidebar from './Sidebar/Sidebar';
import { Outlet } from 'react-router-dom';
import Navbar from '../componets/Navbar/Navbar';
import { checkUserValid } from "../CommonUserValidCheck/checkUserValid";
import { useNavigate } from 'react-router-dom';
import  { useState, useEffect } from 'react';




const Home = () => {


  const navigate = useNavigate();

  useEffect(() => {
    if (!checkUserValid()) {
      navigate('/login');
    }
  }, [navigate]);


  return (
    <div className="flex w-full h-screen">
      <Sidebar />
      <div className="ml-56 flex flex-col flex-1 overflow-y-auto">
        <Navbar className="p-4 bg-gray-100" />
        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Home;
