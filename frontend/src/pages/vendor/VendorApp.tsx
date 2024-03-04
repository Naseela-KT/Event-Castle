import VendorNavbar from '../../components/vendor/Navbar'
import { Outlet } from "react-router-dom"
import Layout from '../../components/Layout'

const VendorApp: React.FC = () => {
    const role='vendor'

  return (
    <>
    <Layout role={role}>
    <VendorNavbar/>
    <Outlet/>
    </Layout>
    </>
  )
}

export default VendorApp
