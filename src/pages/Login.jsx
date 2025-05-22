import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthstore";

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const login = useAuthStore((state) => state.login);
	const navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			const res = await API.post("/login", { email, password });
			login(res.data.access_token);
			navigate("/products");
		} catch (err) {
			console.log(err);
			setError("Login failed. Please check your credentials.");
		}
	};

	return (
		<div>
			<h2>Login</h2>
			<form onSubmit={handleLogin}>
				<input
					type="email"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
				<input
					type="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
				<button type="submit">Login</button>
			</form>
			{error && <p style={{ color: "red" }}>{error}</p>}
		</div>
	);
}
