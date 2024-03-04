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
        <AdminNavbar />
        <div style={{ display: 'flex' }}>
          {isAdminSignedIn && <Sidebar />}
          <Outlet />
        </div>
      </Layout>
    </>
  );
};

export default AdminApp;
