// AdminApp.tsx

import { Outlet } from "react-router-dom";
import AdminNavbar from '../../components/admin/Navbar';
import Layout from "../../components/Layout";
import Sidebar from "../../components/admin/Sidebar";
import { useSelector } from 'react-redux';
import AdminState  from '../../redux/rootstate/AdminState';
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const AdminApp: React.FC = () => {
  const role = 'admin';
  const isAdminSignedIn = useSelector((state: AdminState) => state.admin.isAdminSignedIn);

  return (
    <>
      <Layout role={role}>
        <ToastContainer/>
        {/* AdminNavbar and Sidebar will be fixed inside the Layout */}
        <AdminNavbar />
        {isAdminSignedIn && <Sidebar />}
        <div style={{ marginLeft: isAdminSignedIn ? '250px' : '35%', transition: 'margin 0.3s',marginTop:'10%' }}>
          <Outlet />
        </div>
      </Layout>
    </>
  );
};

export default AdminApp;
