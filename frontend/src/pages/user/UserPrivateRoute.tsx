import {Navigate,Outlet} from 'react-router-dom'
import { useSelector } from 'react-redux'
import UserRootState from '../../redux/rootstate/UserState';
import { USER } from '../../config/constants/constants';


const UserPrivateRoute = () => {
    const user = useSelector((state : UserRootState) => state.user.userdata);

    return user?.isActive===false ? (
      <Navigate to={`${USER.LOGIN}`} replace />
    ) : (
      <Outlet />
    );
}

export default UserPrivateRoute