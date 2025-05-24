import { create } from "zustand";
import API from "../api/axios";

const useProductStore = create((set, get) => ({
	products: {},
	pagination: {},
	loading: false,
	error: null,

	fetchProducts: async (params = {}) => {
		const key = new URLSearchParams(params).toString();
		const cached = get().products[key];
		if (cached) return;

		set({ loading: true, error: null });

		try {
			const res = await API.get("/products", { params });
			set((state) => ({
				products: {
					...state.products,
					[key]: res.data,
				},
			}));

			console.log(get().products);
		} catch (err) {
			set({ error: "Failed to fetch products" });
		} finally {
			set({ loading: false });
		}
	},

	clearCache: () => set({ products: {}, pagination: {} }),
}));

export default useProductStore;
