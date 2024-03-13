import axios from 'axios';
// import { logout } from '../redux/slices/UserSlice';
// import { useDispatch } from 'react-redux';

export const axiosInstance = axios.create({
    baseURL:'http://localhost:3000/api/user'
})
export const axiosInstanceAdmin = axios.create({
    baseURL:'http://localhost:3000/api/admin'
})
export const axiosInstanceVendor = axios.create({
    baseURL:'http://localhost:3000/api/vendor'
})




// axiosInstance.interceptors.response.use(
//     (response) => {
//       if (response.status === 401 && response.data.message === 'User blocked') {
      
//         dispatch(logout());
//       }
//       return response;
//     },
//     (error) => {
     
//       return Promise.reject(error);
//     }
//   );