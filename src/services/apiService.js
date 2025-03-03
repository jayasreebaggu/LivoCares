
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const BASE_URL = 'http://192.168.1.185:8089'; // Update with your actual API URL

// // Function to handle API responses and error codes
// const handleApiResponse = async (response) => {
//   try {
//     const data = await response.json();
//     console.log("API Response:", data);

//     if (!response.ok || !data.success) {
//       return handleApiError(data);
//     }
//     return data;
//   } catch (error) {
//     console.error('Error parsing response:', error);
//     return {
//       success: false,
//       failure_code: 'PARSE_ERROR',
//       error_message: 'Failed to parse server response.',
//     };
//   }
// };

// // Function to handle API errors based on failure_code
// const handleApiError = (data) => {
//   switch (data.failure_code) {
//     case "PARTNER_ACCOUNT_DOESNOT_EXIST":
//       return { success: false, error_message: "Partner account does not exist." };
//     case "INVALID_OTP":
//       return { success: false, error_message: "The OTP entered is incorrect." };
//     case "OTP_EXPIRED":
//       return { success: false, error_message: "The OTP has expired. Please request a new one." };
//     default:
//       return { success: false, error_message: data.error_message || "An unknown error occurred." };
//   }
// };

// // Function to make API calls
// const makeApiRequest = async (url, method, body = null) => {
//   try {
//     const response = await fetch(`${BASE_URL}${url}`, {
//       method,
//       headers: { 'Content-Type': 'application/json' },
//       body: body ? JSON.stringify(body) : null,
//     });

//     return await handleApiResponse(response);
//   } catch (error) {
//     console.error('API request error:', error);
//     return {
//       success: false,
//       error_message: 'Failed to connect to server. Please check your internet.',
//     };
//   }
// };

// // API calls
// export const sendOtp = async (phoneNumber) => {
//   return makeApiRequest('/users/sendotp', 'POST', { phoneNumber });
// };

// export const login = async (phoneNumber, otp) => {
//   return makeApiRequest('/users/login', 'POST', { phoneNumber, otp });
// };

// export const signup = async (userData) => {
//   return makeApiRequest('/users/signup', 'POST', userData);
// };

// export const getBusinessUnits = async () => {
//   const url = '/account/units?pn=1&ps=20&search=&sortBy=name&sortOrder=asc&unitType=DOCTOR';
//   return makeApiRequest(url, 'GET');
// };






import axios from 'axios';

const API_BASE_URL = 'http://192.168.1.185:8089/users';

export const sendOtp = async (phoneNumber) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/sendotp`, { phoneNumber });
        return response.data;
    } catch (error) {
        console.error('Error sending OTP:', error);
        throw error;
    }
};

export const login = async (phoneNumber, otp) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/login`, { phoneNumber, otp });
        return response.data;
    } catch (error) {
        return error.response ? error.response.data : { success: false };
    }
};

export const signup = async (userData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/signup`, userData);
        return response.data;
    } catch (error) {
        console.error('Signup error:', error);
        throw error;
    }
};
