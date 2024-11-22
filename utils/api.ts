import axios from "axios";

const API_URL = "http://localhost:3000";

export const CustomAxios = axios.create({
	baseURL: `${API_URL}/api`,
	timeout: 10000,
})