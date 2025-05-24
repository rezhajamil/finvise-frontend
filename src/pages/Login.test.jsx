import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Login from "./Login";
import { BrowserRouter } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import API from "../api/axios";
import { vi } from "vitest";

// Mock useAuthStore
vi.mock("../store/useAuthStore");

describe("Login Page", () => {
	let mockLogin;

	beforeEach(() => {
		mockLogin = vi.fn();
		useAuthStore.mockReturnValue({ login: mockLogin });
	});

	test("renders login form", () => {
		render(
			<BrowserRouter>
				<Login />
			</BrowserRouter>
		);
		expect(
			screen.getByPlaceholderText("Write your email address")
		).toBeInTheDocument();
	});

	test("login success calls API and navigate", async () => {
		API.post.mockResolvedValue({ data: { access_token: "dummy_token" } });

		render(
			<BrowserRouter>
				<Login />
			</BrowserRouter>
		);

		fireEvent.change(screen.getByPlaceholderText("Write your email address"), {
			target: { value: "test@example.com" },
		});
		fireEvent.change(screen.getByPlaceholderText("Write your password"), {
			target: { value: "password" },
		});
		fireEvent.click(screen.getByText("Sign In to My Account"));

		await waitFor(() => {
			expect(API.post).toHaveBeenCalledWith("/login", {
				email: "test@example.com",
				password: "password",
			});
		});
	});
});
