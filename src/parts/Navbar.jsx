import logo from "../assets/finvise-logo.png";
import { Link, useLocation } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import ButtonLink from "../components/ButtonLink";
const Navbar = () => {
	const { token, logout, user } = useAuthStore();
	const location = useLocation();
	const isAuthPage =
		location.pathname === "/login" || location.pathname === "/register";
	return (
		<nav className="container max-w-[1130px] mx-auto flex flex-col gap-y-6 sm:flex-row sm:items-center sm:justify-between bg-[#0D5CD7] p-5 rounded-3xl">
			<div className="flex gap-x-6 flex-col sm:flex-row gap-y-2 justify-between sm:justify-start">
				<Link to="/" className="flex shrink-0">
					<img src={logo} alt="logo" className="w-40" />
				</Link>
				<ul className="flex items-center gap-[30px]">
					<li className="hover:font-bold hover:text-[#FFC736] transition-all duration-300 text-white">
						<Link to="/products">Products</Link>
					</li>
				</ul>
			</div>
			{!token ? (
				isAuthPage ? null : (
					<div className="flex items-center gap-3">
						<ButtonLink to="/login">Sign In</ButtonLink>
						<ButtonLink to="/register">Sign Up</ButtonLink>
					</div>
				)
			) : (
				<>
					<div className="flex  gap-x-6 items-center">
						<span className="text-white font-semibold">Hi, {user?.name}</span>
						<button
							onClick={logout}
							className="sm:p-[12px_20px] p-[8px_12px] bg-white rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 cursor-pointer"
						>
							Logout
						</button>
					</div>
				</>
			)}
		</nav>
	);
};

export default Navbar;
