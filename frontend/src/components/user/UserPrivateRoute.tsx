import {Navigate,Outlet} from 'react-router-dom'
import { useSelector } from 'react-redux'
import UserRootState from '../../redux/rootstate/UserState';


const UserPrivateRoute = () => {
    const user = useSelector((state : UserRootState) => state.user.isUserSignedIn);
  return (
    user ? <Outlet/> :<Navigate to='/login' replace/>
  )
}

export default UserPrivateRoute