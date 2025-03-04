
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@user_token';

const storageService = {
    saveToken: async (token) => {
        try {
            await AsyncStorage.setItem(STORAGE_KEY, token);
        } catch (error) {
            console.error('Error saving token:', error);
        }
    },
    getToken: async () => {
        try {
            return await AsyncStorage.getItem(STORAGE_KEY);
        } catch (error) {
            console.error('Error retrieving token:', error);
        }
    },
    clearToken: async () => {
        try {
            await AsyncStorage.removeItem(STORAGE_KEY);
        } catch (error) {
            console.error('Error clearing token:', error);
        }
    },
};

export default storageService;
