
import React from "react";
import { Outlet } from "react-router-dom";
import Layout from "../../components/Layout";
import Sidebar from "../../components/admin/Sidebar";
import { useSelector } from 'react-redux';
import AdminState  from '../../redux/rootstate/AdminState';
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"


const AdminApp: React.FC = () => {
  const isAdminSignedIn = useSelector((state: AdminState) => state.admin.isAdminSignedIn);

  return (
    <>
    
        <ToastContainer/>
        <div className="flex">
          {isAdminSignedIn && <Sidebar className="sidebar" />}
          <div className="mainContent flex-1 p-1">
            <Outlet />
          </div>
        </div>
  
    </>
  );
};

export default AdminApp;
