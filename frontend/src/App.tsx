// App.tsx

import React from 'react';
import UserNavbar from './components/user/Navbar';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const App: React.FC = () => {
 

  return (
    <>
        <ToastContainer/>
        {/* <UserNavbar /> */}
        <Outlet />
    </>
  );
};

export default App;
