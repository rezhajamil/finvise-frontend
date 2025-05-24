import { render, screen } from "@testing-library/react";
import Navbar from "./Navbar";
import { BrowserRouter } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import { vi } from "vitest";

vi.mock("../store/useAuthStore");

describe("Navbar", () => {
	test("shows user name when logged in", () => {
		useAuthStore.mockReturnValue({
			token: "token",
			user: { name: "Rezha" },
			logout: vi.fn(),
		});

		render(
			<BrowserRouter>
				<Navbar />
			</BrowserRouter>
		);

		expect(screen.getByText("Hi, Rezha")).toBeInTheDocument();
	});

	test("shows login button when no user", () => {
		useAuthStore.mockReturnValue({
			user: null,
			logout: vi.fn(),
		});

		render(
			<BrowserRouter>
				<Navbar />
			</BrowserRouter>
		);

		expect(screen.getByText("Sign In")).toBeInTheDocument();
	});
});
