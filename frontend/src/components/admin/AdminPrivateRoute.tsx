import {Navigate,Outlet} from 'react-router-dom'
import { useSelector } from 'react-redux'
import AdminRootState from '../../redux/rootstate/AdminState';


const AdminPrivateRoute = () => {
    const admin = useSelector((state : AdminRootState) => state.admin.isAdminSignedIn);
  return (
    admin ? <Outlet/> :<Navigate to='/admin' replace/>
  )
}

export default AdminPrivateRoute