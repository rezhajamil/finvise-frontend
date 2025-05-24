import "@testing-library/jest-dom";
import { vi } from "vitest";

// Mock window.matchMedia
if (!window.matchMedia) {
	window.matchMedia = vi.fn().mockImplementation(() => ({
		matches: false,
		media: "",
		onchange: null,
		addListener: vi.fn(),
		removeListener: vi.fn(),
		addEventListener: vi.fn(),
		removeEventListener: vi.fn(),
		dispatchEvent: vi.fn(),
	}));
}

// Mock window.localStorage
Object.defineProperty(window, "localStorage", {
	value: {
		getItem: vi.fn(),
		setItem: vi.fn(),
		removeItem: vi.fn(),
		clear: vi.fn(),
	},
	writable: true,
});

// Mock useNavigate React Router v6
vi.mock("react-router-dom", async () => {
	const actual = await vi.importActual("react-router-dom");
	return {
		...actual,
		useNavigate: vi.fn(),
	};
});

// Mock axios global
import axios from "axios";
vi.mock("axios", () => {
	const mockAxiosInstance = {
		interceptors: {
			request: { use: vi.fn(), eject: vi.fn() },
			response: { use: vi.fn(), eject: vi.fn() },
		},
		get: vi.fn(),
		post: vi.fn(),
		put: vi.fn(),
		delete: vi.fn(),
	};

	return {
		default: {
			create: vi.fn(() => mockAxiosInstance),
			...mockAxiosInstance,
		},
	};
});
