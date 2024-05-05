import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import AdminState from "../../redux/rootstate/AdminState";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "../../layout/admin/Layout";
import Loader from "../../components/common/Loader";

const AdminApp: React.FC = () => {
  const isAdminSignedIn = useSelector(
    (state: AdminState) => state.admin.isAdminSignedIn
  );
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <>
      <ToastContainer />
      {isAdminSignedIn ? (
        <Layout>
        {loading ?<Loader/>:
          <Outlet />}
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
