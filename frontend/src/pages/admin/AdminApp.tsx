import { Outlet } from "react-router-dom"
import '../../../public/css/vendor-unauth.css'
import AdminNavbar from '../../components/admin/Navbar'
import Layout from "../../components/Layout";
import Sidebar from "../../components/admin/Sidebar";

const AdminApp: React.FC = () =>{
  const role = 'admin';
  return (
    <>
    <Layout role={role}>
      <AdminNavbar />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <Outlet />
      </div>
     
    </Layout>
  </>
  )
}

export default AdminApp
