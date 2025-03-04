import api from './axiosService';
import { ErrorCodes } from '../utils/ErrorCodes';
import { ConstantsService } from '../utils/ConstantsService';
import ErrorHandlerService from './ErrorHandlerService';


// API calls
export const sendOtp = async (phoneNumber) => {
    try {
        const response = await api.post('/auth/send-otp', { phoneNumber },
        );
        console.log(response.data);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const login = async (phoneNumber, otp) => {
    try {
        const response = await api.post('/auth/verify-otp', { phoneNumber, otp });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
        handleError(error);
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
const handleError = (error) => {
    const { data } = error?.response || {};
    const failureCode = data?.failure_code;
    if (failureCode) {
        switch (failureCode) {
            case ErrorCodes.INVALID_PHONENUMBER:
                ErrorHandlerService.showError(ConstantsService.invalidPhoneNumber);
                break;
            case ErrorCodes.USER_ACCOUNT_DOESNOT_EXIST:
                navigateToSignUpScreen();
                break;
            case ErrorCodes.NOT_ACCEPTED_PRIVACY_POLICY:
                ErrorHandlerService.showError(ConstantsService.acceptPrivacyPolicy);
                break;
            case ErrorCodes.NOT_ACCEPTED_TERMS_AND_CONDITIONS:
                ErrorHandlerService.showError(ConstantsService.acceptTermsConditions);
                break;
            case ErrorCodes.PHONE_NUMBER_REQUIRED:
                ErrorHandlerService.showError(ConstantsService.enterPhoneNumber);
                break;
            default:
                break;
        }
    }
    throw { message: "An unexpected error occurred." };
};


const navigateToSignUpScreen = () => {
    navigation.navigate("Signup");
};