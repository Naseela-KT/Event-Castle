// App.tsx

import React from 'react';
import UserNavbar from './components/user/Navbar';
import { Outlet } from 'react-router-dom';
import Layout from './components/Layout';
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const App: React.FC = () => {
  const role = 'user'; 

  return (
    <>
      <Layout role={role}>
        <ToastContainer/>
        <UserNavbar />
        <Outlet />
      </Layout>
    </>
  );
};

export default App;
