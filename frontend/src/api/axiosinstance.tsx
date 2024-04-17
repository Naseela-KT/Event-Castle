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
