import { Outlet } from "react-router-dom"
import '../../../public/css/vendor-unauth.css'
import AdminNavbar from '../../components/admin/Navbar'
import Layout from "../../components/Layout";

const AdminApp: React.FC = () =>{
  const role = 'admin';
  return (
    <>
     <Layout role={role}>
    <AdminNavbar/>
    <Outlet/>
    </Layout>
    </>
  )
}

export default AdminApp
