import { Navigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

const GuestOnlyRoute = ({ children }) => {
	const token = useAuthStore((state) => state.token);
	return token ? <Navigate to="/" /> : children;
};

export default GuestOnlyRoute;
