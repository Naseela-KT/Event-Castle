import VendorNavbar from '../../components/vendor/Navbar'
import { Outlet } from "react-router-dom"
import Layout from '../../components/Layout'
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const VendorApp: React.FC = () => {
    const role='vendor'

  return (
    <>
    <Layout role={role}>
      <ToastContainer/>
    <VendorNavbar/>
    <Outlet/>
    </Layout>
    </>
  )
}

export default VendorApp
