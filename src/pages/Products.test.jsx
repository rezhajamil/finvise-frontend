import { render, screen, waitFor } from "@testing-library/react";
import Products from "./Products";
import useProductStore from "../store/useProductStore";
import { vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { formatPrice } from "../utils/format";

vi.mock("../store/useProductStore");

// Konstanta untuk data mock
const DEFAULT_PARAMS = {
	price_min: "",
	price_max: "",
	sort_by: "name",
	sort_order: "asc",
	search: "",
};

const MOCK_PRODUCT = {
	id: 1,
	name: "Product A",
	price: 1000000,
	description: "Test product",
};

// Helper function untuk membuat key params
const createParamsKey = (params) => new URLSearchParams(params).toString();

describe("Products", () => {
	test("shows loading and renders product list", async () => {
		const mockFetchProducts = vi.fn();
		useProductStore.mockReturnValue({
			products: { [createParamsKey(DEFAULT_PARAMS)]: [MOCK_PRODUCT] },
			loading: true,
			error: null,
			fetchProducts: mockFetchProducts,
		});

		render(
			<BrowserRouter>
				<Products />
			</BrowserRouter>
		);

		expect(screen.getByText("Loading....")).toBeInTheDocument();
		await waitFor(() => expect(mockFetchProducts).toHaveBeenCalled());
	});

	test("shows error when API fails", () => {
		useProductStore.mockReturnValue({
			products: {},
			loading: false,
			error: "API Error",
			fetchProducts: vi.fn(),
		});

		render(
			<BrowserRouter>
				<Products />
			</BrowserRouter>
		);

		expect(screen.getByText("API Error")).toBeInTheDocument();
	});

	test("renders product name and price", async () => {
		const mockProducts = {
			[createParamsKey(DEFAULT_PARAMS)]: [MOCK_PRODUCT],
		};

		useProductStore.mockReturnValue({
			products: mockProducts,
			loading: false,
			error: null,
			fetchProducts: vi.fn(),
		});

		render(
			<BrowserRouter>
				<Products />
			</BrowserRouter>
		);

		await waitFor(() => {
			expect(screen.getByText("Product A")).toBeInTheDocument();
			expect(screen.getByText("Rp 1.000.000")).toBeInTheDocument();
		});
	});
});
