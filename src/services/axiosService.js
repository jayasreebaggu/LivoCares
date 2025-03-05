import axios from 'react-native-axios';
import env from '../utils/env';
import storageService from './storageService';
import ErrorHandlerService from './ErrorHandlerService';

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
api.interceptors?.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            return Promise.reject({ status: error.response.status, data: error.response.data });
        } else if (error.request) {
            const errorMessage = ErrorHandlerService.showError("No response received from server");
            return Promise.reject(errorMessage);
        } else {
            const errorMessage = ErrorHandlerService.showError(error.message);
            return Promise.reject(errorMessage);
        }
    }
);

export default api;