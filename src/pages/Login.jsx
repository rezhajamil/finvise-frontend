import { useEffect, useState } from "react";
import API from "../api/axios";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import logo from "../assets/finvise-logo.png";
import IconEmail from "../assets/icons/sms.svg";
import IconPassword from "../assets/icons/lock.svg";
import Button from "../components/Button";
import ButtonLink from "../components/ButtonLink";
import InputText from "../components/InputText";
import InputPassword from "../components/InputPassword";
export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordVisible, setPasswordVisible] = useState(false);
	const [error, setError] = useState("");

	const login = useAuthStore((state) => state.login);
	const navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();
		if (!email || !password) {
			setError("Please enter your email and password.");
			return;
		}
		try {
			const res = await API.post("/login", { email, password });
			console.log(res);
			login(res.data.access_token);
			navigate("/");
		} catch (err) {
			console.log(err);
			setError("Login failed. Please check your credentials.");
		}
	};

	return (
		<>
			<div
				id="signin"
				className="bg-[#EFF3FA] min-h-screen pt-[30px] pb-[50px] flex flex-col"
			>
				<div className="container max-w-[1130px] mx-auto flex flex-1 items-center justify-center py-5 px-2">
					<form
						onSubmit={handleLogin}
						className="md:max-w-md w-full bg-white p-[30px_20px] sm:p-[50px_30px] flex flex-col gap-5 rounded-3xl border border-[#E5E5E5]"
					>
						<div className="flex justify-center">
							<img src={logo} alt="logo" className="w-40" />
						</div>
						<h1 className="font-bold sm:text-2xl text-lg leading-[34px]">
							Sign In
						</h1>
						{error && <p className="text-red-500">{error}</p>}
						<InputText
							type="email"
							placeholder="Write your email address"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							icon={IconEmail}
						/>
						{/* <div className="flex flex-col gap-[10px]">
							
						</div> */}
						<InputPassword
							placeholder="Write your password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							icon={IconPassword}
							passwordVisible={passwordVisible}
							setPasswordVisible={setPasswordVisible}
						/>
						<div className="flex flex-col gap-3">
							<Button>Sign In to My Account</Button>
							<ButtonLink to="/register">Sign Up</ButtonLink>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}
