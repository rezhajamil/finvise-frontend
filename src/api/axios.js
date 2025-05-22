import axios from "axios";
import useAuthStore from "../store/useAuthStore";

const API = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL,
});

API.interceptors.request.use((config) => {
	const token = localStorage.getItem("token");
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

API.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response && error.response.status === 401) {
			const auth = useAuthStore.getState();
			auth.logout();
			window.location.href = "/login";
		}
		return Promise.reject(error);
	}
);

export default API;
