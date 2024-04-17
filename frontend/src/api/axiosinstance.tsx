import axios from 'axios';



export const axiosInstanceAdmin = axios.create({
    baseURL:'http://localhost:3000/api/admin'
})
export const axiosInstanceVendor = axios.create({
    baseURL:'http://localhost:3000/api/vendor'
})


export const axiosInstance = axios.create({
    baseURL:'http://localhost:3000/api/user'
})

export const axiosInstanceChat = axios.create({
    baseURL:'http://localhost:3000/api/conversation'
})


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



axiosInstanceVendor.interceptors.request.use((config) =>{
    const token = localStorage.getItem('vendorToken'); 
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
},
(error) => {
    return Promise.reject(error);
}
);



axiosInstanceVendor.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        if (error.response.status === 401 && error.response.data.message === 'Invalid token') {
            try {
                const refreshToken = localStorage.getItem('vendorRefresh');
                const response = await axiosInstanceVendor.post('/refresh-token', { refreshToken });
                const newToken = response.data.token;
                localStorage.setItem('vendorToken', newToken);

              
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
