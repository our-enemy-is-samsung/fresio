import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const API_URL = "https://3d72-183-97-56-188.ngrok-free.app/";

export const CustomAxios = axios.create({
    baseURL: `${API_URL}`,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

// Request Interceptor
CustomAxios.interceptors.request.use(
    async (config) => {
        try {
            const token = await AsyncStorage.getItem("access_token");
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        } catch (error) {
            console.error("Error accessing AsyncStorage:", error);
            return config;
        }
    },
    (error) => {
        return Promise.reject(error);
    }
);
