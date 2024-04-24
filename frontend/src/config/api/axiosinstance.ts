import axios from 'axios';
import {CreateAxiosInstance } from '../../types/axiosTypes'

// Base URLs
const BASE_URL = import.meta.env.VITE_BASE_URL || '';

// Function to create an Axios instance with interceptors
const createAxiosInstance:CreateAxiosInstance=(baseUrl, tokenKey, refreshTokenKey)=>{
    const instance = axios.create({
        baseURL: baseUrl,
    });

    // Request interceptor to add the Authorization header
    instance.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem(tokenKey);
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => Promise.reject(error)
    );

    // Response interceptor to handle token refresh
    instance.interceptors.response.use(
        (response) => response,
        async (error) => {
            if (error.response.status === 401 && error.response.data.message === 'Invalid token') {
                try {
                    const refreshToken = localStorage.getItem(refreshTokenKey);
                    const refreshResponse = await instance.post('/refresh-token', { refreshToken });
                    const newToken = refreshResponse.data.token;
                    localStorage.setItem(tokenKey, newToken);

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

    return instance;
}

// Creating Axios instances with interceptors
export const axiosInstanceAdmin = createAxiosInstance(`${BASE_URL}/admin`, 'adminToken', 'adminRefresh');
export const axiosInstanceVendor = createAxiosInstance(`${BASE_URL}/vendor`, 'vendorToken', 'vendorRefresh');
export const axiosInstance = createAxiosInstance(`${BASE_URL}/user`, 'userToken', 'userRefresh');
export const axiosInstanceChat = createAxiosInstance(`${BASE_URL}/conversation`, 'userToken', 'userRefresh');
export const axiosInstanceMsg = createAxiosInstance(`${BASE_URL}/messages`, 'userToken', 'userRefresh');
