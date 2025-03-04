import { sendOtp, login, signup } from './apiService';
import { storeToken } from './storageService';
import { handleError } from './ErrorHandlerService';

export const authenticateUser  = async (phoneNumber, otp) => {
    try {
        const response = await login(phoneNumber, otp);
        await storeToken(response.data.token);
        return response.data;
    } catch (error) {
        throw new Error(handleError(error));
    }
};

export const registerUser  = async (userData) => {
    try {
        const response = await signup(userData);
        return response.data;
    } catch (error) {
        throw new Error(handleError(error));
    }
};