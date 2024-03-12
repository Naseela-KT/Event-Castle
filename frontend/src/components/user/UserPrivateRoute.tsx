import {Navigate,Outlet} from 'react-router-dom'
import { useSelector } from 'react-redux'
import UserRootState from '../../redux/rootstate/UserState';


const UserPrivateRoute = () => {
    const user = useSelector((state : UserRootState) => state.user.userdata);

    return user?.isActive===false ? (
      <Navigate to="/login" replace />
    ) : (
      <Outlet />
    );
}

export default UserPrivateRoute