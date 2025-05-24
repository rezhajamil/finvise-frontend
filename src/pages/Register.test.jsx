import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Register from "./Register";
import { BrowserRouter } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import API from "../api/axios";
import { vi } from "vitest";

vi.mock("../store/useAuthStore");
vi.mock("../api/axios");

vi.mock("react-router-dom", async () => {
	const actual = await vi.importActual("react-router-dom");
	return {
		...actual,
		useNavigate: () => vi.fn(),
	};
});

describe("Register Page", () => {
	const mockLogin = vi.fn();
	const mockNavigate = vi.fn();

	beforeEach(() => {
		useAuthStore.mockReturnValue({ login: mockLogin });
	});

	it("renders all input fields and buttons", () => {
		render(
			<BrowserRouter>
				<Register />
			</BrowserRouter>
		);

		expect(screen.getByPlaceholderText(/write your name/i)).toBeInTheDocument();
		expect(
			screen.getByPlaceholderText(/write your email address/i)
		).toBeInTheDocument();
		expect(
			screen.getByPlaceholderText(/^write your password$/i)
		).toBeInTheDocument();
		expect(
			screen.getByPlaceholderText(/confirm your password/i)
		).toBeInTheDocument();
		expect(
			screen.getByRole("button", { name: /create new account/i })
		).toBeInTheDocument();
		const signInLinks = screen.getAllByRole("link", { name: /sign in/i });
		expect(signInLinks[0]).toBeInTheDocument();
	});

	it("shows error when submitting empty form", async () => {
		render(
			<BrowserRouter>
				<Register />
			</BrowserRouter>
		);

		fireEvent.click(
			screen.getByRole("button", { name: /create new account/i })
		);

		expect(
			await screen.findByText(/please enter your name, email, password/i)
		).toBeInTheDocument();
	});

	it("calls API and login, navigate on successful registration", async () => {
		API.post.mockResolvedValueOnce({
			data: { access_token: "fake_token" },
		});

		const { container } = render(
			<BrowserRouter>
				<Register />
			</BrowserRouter>
		);

		// isi form
		fireEvent.change(screen.getByPlaceholderText(/write your name/i), {
			target: { value: "John Doe" },
		});
		fireEvent.change(screen.getByPlaceholderText(/write your email address/i), {
			target: { value: "john@example.com" },
		});
		fireEvent.change(screen.getByPlaceholderText(/^write your password$/i), {
			target: { value: "password123" },
		});
		fireEvent.change(screen.getByPlaceholderText(/confirm your password/i), {
			target: { value: "password123" },
		});

		fireEvent.click(
			screen.getByRole("button", { name: /create new account/i })
		);

		await waitFor(() => {
			expect(API.post).toHaveBeenCalledWith("/register", {
				name: "John Doe",
				email: "john@example.com",
				password: "password123",
				password_confirmation: "password123",
			});
		});
	});
});
