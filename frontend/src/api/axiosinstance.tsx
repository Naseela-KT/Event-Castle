import axios from 'axios';
// import { logout } from '../redux/slices/UserSlice';
// import { useDispatch } from 'react-redux';
// import toast from 'react-hot-toast'


export const axiosInstanceAdmin = axios.create({
    baseURL:'http://localhost:3000/api/admin'
})
export const axiosInstanceVendor = axios.create({
    baseURL:'http://localhost:3000/api/vendor'
})


export const axiosInstance = axios.create({
    baseURL:'http://localhost:3000/api/user'
})

//axiosInterceptor
// axiosInstance.interceptors.request.use((config) => {
//     const userToken = localStorage.getItem('userToken');
//     if (userToken !== null) {
//         config.headers.authorization = `Bearer ${userToken}`;
//     }
//     return config;
// })

<<<<<<< Updated upstream
// axiosInstance.interceptors.response.use(
//     (response) => response,
//     (error) => {
//         if (error.response && error.response.data) {
//             console.log(error.response, "errorrrrrrrrr")
//             const errorMessage = error.response.data.error || 'An error occurred';
//             // Show error toast with errorMessage
//             toast.error(errorMessage, { duration: 2000, style: { color: '#fff', background: 'black' } });
//         } else {
//             console.error('Axios error:', error);
//         }
//         return Promise.reject(error);
//     }
// )
=======
export const axiosInstanceMsg = axios.create({
    baseURL:'http://localhost:3000/api/messages'
})


axiosInstanceAdmin.interceptors.request.use((config) =>{
    const token = localStorage.getItem('adminToken'); 
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
},
(error) => {
    return Promise.reject(error);
}
);


axiosInstanceAdmin.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        if (error.response.status === 401 && error.response.data.message === 'Invalid token') {
            try {
                const refreshToken = localStorage.getItem('refreshToken');
                const response = await axiosInstanceAdmin.post('/refresh-token', { refreshToken });
                const newToken = response.data.token;
                localStorage.setItem('adminToken', newToken);
                error.config.headers.Authorization = `Bearer ${newToken}`;
                return axios(error.config);
            } catch (refreshError) {
                console.error('Error refreshing token:', refreshError);
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

>>>>>>> Stashed changes
