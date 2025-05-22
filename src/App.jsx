import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import useAuthStore from "./store/useAuthStore";
import { useEffect } from "react";
function App() {
	const { token, logout, fetchUser } = useAuthStore();

	useEffect(() => {
		if (token) {
			fetchUser();
		}
	}, [token]);

	return (
		<Router>
			{token && (
				<div style={{ textAlign: "right", padding: "1rem" }}>
					<button onClick={logout}>Logout</button>
				</div>
			)}
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route
					path="/products"
					element={
						<RequireAuth>
							<Products />
						</RequireAuth>
					}
				/>
				<Route
					path="/products/:id"
					element={
						<RequireAuth>
							<ProductDetail />
						</RequireAuth>
					}
				/>
				<Route path="*" element={<Navigate to="/products" />} />
			</Routes>
		</Router>
	);
}

function RequireAuth({ children }) {
	const { token } = useAuthStore();
	return token ? children : <Navigate to="/login" />;
}

export default App;
