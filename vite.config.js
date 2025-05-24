import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss()],
	esbuild: {
		drop: ["console", "debugger"],
	},
	test: {
		environment: "jsdom",
		globals: true,
		setupFiles: "./setupTests.js",
	},
});
