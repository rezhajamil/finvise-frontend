import { render, screen, waitFor } from "@testing-library/react";
import ProductDetail from "./ProductDetail";
import { BrowserRouter } from "react-router-dom";
import API from "../api/axios";
import { vi } from "vitest";

vi.mock("../api/axios");

vi.mock("react-router-dom", async () => {
	const actual = await vi.importActual("react-router-dom");
	return {
		...actual,
		useParams: () => ({ id: "1" }),
	};
});

describe("ProductDetail", () => {
	test("fetches and displays product detail", async () => {
		API.get.mockResolvedValue({ data: { name: "Product A", price: 1000000 } });

		render(
			<BrowserRouter>
				<ProductDetail />
			</BrowserRouter>
		);

		await waitFor(() => {
			expect(screen.getByText("Product A")).toBeInTheDocument();
			expect(screen.getByText("Rp 1.000.000")).toBeInTheDocument();
		});
	});

	test("shows error on API failure", async () => {
		API.get.mockRejectedValue(new Error("API Error"));

		render(
			<BrowserRouter>
				<ProductDetail />
			</BrowserRouter>
		);

		await waitFor(() => {
			expect(screen.getByText("Product not found.")).toBeInTheDocument();
		});
	});
});
