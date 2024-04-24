import {Navigate, Outlet} from 'react-router-dom'
import { useSelector } from 'react-redux'
import VendorRootState from '../../redux/rootstate/VendorState';
import { VENDOR } from '../../config/constants/constants';


const VendorPrivateRoute = () => {
    const vendor = useSelector((state : VendorRootState) => state.vendor.isVendorSignedIn);
  return (
    vendor ? <Outlet/>:<Navigate to={VENDOR.LOGIN} replace/>
  )
}

export default VendorPrivateRoute