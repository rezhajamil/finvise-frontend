import { create } from "zustand";
import API from "../api/axios";

const useAuthStore = create((set) => ({
	token: localStorage.getItem("token") || null,
	user: null,

	login: (token) => {
		localStorage.setItem("token", token);
		set({ token });
	},

	logout: () => {
		localStorage.removeItem("token");
		set({ token: null, user: null });
	},

	setUser: (user) => set({ user }),

	fetchUser: async () => {
		try {
			const res = await API.get("/me");
			set({ user: res.data });
		} catch (err) {
			console.warn("Session expired or invalid token");
			localStorage.removeItem("token");
			set({ token: null, user: null });
		}
	},
}));

export default useAuthStore;
