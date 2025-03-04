import axios from 'axios';
import env from '../utils/env';
import storageService from './storageService';
import handleError from './ErrorHandlerService';

const api = axios.create({
    baseURL: env.API_URL,
});

// Request Interceptor
api.interceptors.request.use(
    async (config) => {
        const token = await storageService.getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor
api.interceptors.response.use(
    (response) => response,
    (error) => {
        const errorMessage = handleError(error);
        return Promise.reject(errorMessage);
    }
);

export default api;