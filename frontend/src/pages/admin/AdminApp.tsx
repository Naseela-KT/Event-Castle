import React from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import AdminState from "../../redux/rootstate/AdminState";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "../../layout/admin/Layout";

const AdminApp: React.FC = () => {
  const isAdminSignedIn = useSelector(
    (state: AdminState) => state.admin.isAdminSignedIn
  );

  return (
    <>
      <ToastContainer />
      {isAdminSignedIn ? (
        <Layout>
          <Outlet />
        </Layout>
      ) : (
        <div className="mainContent flex-1 ml-50">
          <Outlet />
        </div>
      )}
    </>
  );
};

export default AdminApp;
