// AdminApp.tsx

import { Outlet } from "react-router-dom";
import AdminNavbar from '../../components/admin/Navbar';
import Layout from "../../components/Layout";
import Sidebar from "../../components/admin/Sidebar";
import { useSelector } from 'react-redux';
import AdminState  from '../../redux/rootstate/AdminState';

const AdminApp: React.FC = () => {
  const role = 'admin';
  const isAdminSignedIn = useSelector((state: AdminState) => state.admin.isAdminSignedIn);

  return (
    <>
      <Layout role={role}>
        {/* AdminNavbar and Sidebar will be fixed inside the Layout */}
        <AdminNavbar />
        {isAdminSignedIn && <Sidebar />}
        
        <div style={{ marginLeft: isAdminSignedIn ? '250px' : '0', transition: 'margin 0.3s' }}>
          <Outlet />
        </div>
      </Layout>
    </>
  );
};

export default AdminApp;
