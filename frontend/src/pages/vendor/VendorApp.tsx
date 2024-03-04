import AllNavbar from '../../components/Navbar'
import { Outlet } from "react-router-dom"
import '../../../public/css/vendor-unauth.css'
import Layout from '../../components/Layout'

const VendorApp: React.FC = () => {
    const role='vendor'

  return (
    <>
    <Layout role={role}>
    <AllNavbar/>
    <Outlet/>
    </Layout>
    </>
  )
}

export default VendorApp
