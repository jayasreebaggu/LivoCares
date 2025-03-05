import api from './axiosService';
import { ErrorCodes } from '../utils/ErrorCodes';
import { ConstantsService } from '../utils/ConstantsService';
import ErrorHandlerService from './ErrorHandlerService';


// API calls
export const sendOtp = async (phoneNumber) => {
    try {
        const response = await api.post('/auth/send-otp', { phoneNumber },
        );
        console.log('response', response.data);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const login = async (phoneNumber, otp, navigation) => {
    try {
        const response = await api.post('/auth/verify-otp', { phoneNumber, otp });
        return response.data;
    } catch (error) {
        handleError(error, navigation);
    }
};

export const signup = async (data) => {
    try {
        const response = await api.post('/auth/register', data);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

// Error handling function
const handleError = (error, navigation) => {
    const { data } = error || {};
    const failureCode = data?.detail?.error_code;
    const message = data?.detail?.message;
    console.log('data?', data);
    if (failureCode) {
        switch (failureCode) {
            case ErrorCodes.INVALID_PHONE_NUMBER:
                throw ErrorHandlerService.showError(message);
            case ErrorCodes.USER_NOT_FOUND:
                return navigateToSignUpScreen(navigation, data.detail.phoneNumber);
            case ErrorCodes.PHONE_NUMBER_NOT_FOUND:
                throw ErrorHandlerService.showError(message);
            case ErrorCodes.OTP_EXPIRED:
                throw ErrorHandlerService.showError(message);
            case ErrorCodes.INTERNAL_ERROR:
                throw ErrorHandlerService.showError(message);
            case ErrorCodes.DB_ERROR:
                throw ErrorHandlerService.showError(message);
            case ErrorCodes.INVALID_OTP:
                throw ErrorHandlerService.showError(message);
            case ErrorCodes.USER_EXISTS:
                throw ErrorHandlerService.showError(message);
            default:
                break;
        }
    }
};


const navigateToSignUpScreen = (navigation, phoneNumber) => {
    navigation.reset({
        index: 0,
        routes: [{ name: 'HomeTab' }],
      });
    // navigation.navigate("Signup",
    //     { phoneNumber },
    // );
};