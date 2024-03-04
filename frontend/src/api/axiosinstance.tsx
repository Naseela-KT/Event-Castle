import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL:'http://localhost:3000/api/user'
})
export const axiosInstanceAdmin = axios.create({
    baseURL:'http://localhost:3000/api/admin'
})
export const axiosInstanceVendor = axios.create({
    baseURL:'http://localhost:3000/api/vendor'
})