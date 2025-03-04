import { Alert } from 'react-native';

const ErrorHandlerService = {
    showError: (message) => {
        Alert.alert('Error', message);
    },
};

export default ErrorHandlerService;