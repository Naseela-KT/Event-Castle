import {Navigate,Outlet} from 'react-router-dom'
import { useSelector } from 'react-redux'
import VendorRootState from '../../redux/rootstate/VendorState';


const VendorPrivateRoute = () => {
    const vendor = useSelector((state : VendorRootState) => state.vendor.isVendorSignedIn);
  return (
    vendor ? <Outlet/> :<Navigate to='/vendor/login' replace/>
  )
}

export default VendorPrivateRoute