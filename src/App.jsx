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
import Register from "./pages/Register";
import { history } from "./utils/redirect";
import GuestOnlyRoute from "./components/GuestOnlyRoute";
function App() {
	const { token, fetchUser } = useAuthStore();

	useEffect(() => {
		if (token) {
			fetchUser();
		}
	}, [token]);

	return (
		<Router history={history}>
			<Routes>
				<Route
					path="/register"
					element={
						<GuestOnlyRoute>
							<Register />
						</GuestOnlyRoute>
					}
				/>
				<Route
					path="/login"
					element={
						<GuestOnlyRoute>
							<Login />
						</GuestOnlyRoute>
					}
				/>
				<Route path="/products" element={<Products />} />
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
