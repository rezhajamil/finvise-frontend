import { useState } from "react";
import API from "../api/axios";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import logo from "../assets/finvise-logo.png";
import IconEmail from "../assets/icons/sms.svg";
import IconPassword from "../assets/icons/lock.svg";
import IconUser from "../assets/icons/profile-circle.svg";
import Button from "../components/Button";
import ButtonLink from "../components/ButtonLink";
import InputText from "../components/InputText";
import InputPassword from "../components/InputPassword";
import Navbar from "../parts/Navbar";
export default function Register() {
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [passwordVisible, setPasswordVisible] = useState(false);
	const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
	const [error, setError] = useState("");
	const [emailError, setEmailError] = useState("");
	const [nameError, setNameError] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const login = useAuthStore((state) => state.login);
	const navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();
		setError("");
		setNameError("");
		setEmailError("");
		setPasswordError("");
		if (!name || !email || !password || !confirmPassword) {
			setError(
				"Please enter your name, email, password, and confirm password."
			);
			return;
		}
		try {
			const res = await API.post("/register", {
				name,
				email,
				password,
				password_confirmation: confirmPassword,
			});
			login(res.data.access_token);
			navigate("/");
		} catch (err) {
			if (err.response?.data) {
				const errors = err.response.data;

				// Set error untuk setiap field
				if (errors.name) setNameError(errors.name[0]);
				if (errors.email) setEmailError(errors.email[0]);
				if (errors.password) setPasswordError(errors.password[0]);
			} else {
				setError("Sign up failed. Please try again.");
			}
		}
	};

	return (
		<>
			<div
				id="signup"
				className="bg-[#EFF3FA] min-h-screen pt-[30px] pb-[50px] flex flex-col"
			>
				<Navbar />
				<div className="container max-w-[1130px] mx-auto flex flex-1 items-center justify-center py-5 px-2">
					<form
						onSubmit={handleLogin}
						className="md:max-w-md w-full bg-white p-[30px_20px] sm:p-[50px_30px] flex flex-col gap-5 rounded-3xl border border-[#E5E5E5]"
					>
						<div className="flex justify-center">
							<img src={logo} alt="logo" className="w-40" />
						</div>
						<h1 className="font-bold sm:text-2xl text-lg leading-[34px]">
							Sign Up
						</h1>
						{error && <p className="text-red-500 text-sm px-2">{error}</p>}
						<div className="flex flex-col gap-2">
							<InputText
								type="text"
								placeholder="Write your name"
								value={name}
								onChange={(e) => setName(e.target.value)}
								icon={IconUser}
							/>
							{nameError && (
								<p className="text-red-500 text-sm px-2">{nameError}</p>
							)}
						</div>
						<div className="flex flex-col gap-2">
							<InputText
								type="email"
								placeholder="Write your email address"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								icon={IconEmail}
							/>
							{emailError && (
								<p className="text-red-500 text-sm px-2">{emailError}</p>
							)}
						</div>
						<div className="flex flex-col gap-2">
							<InputPassword
								placeholder="Write your password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								icon={IconPassword}
								passwordVisible={passwordVisible}
								setPasswordVisible={setPasswordVisible}
							/>

							{passwordError && (
								<p className="text-red-500 text-sm px-2">{passwordError}</p>
							)}
						</div>
						<InputPassword
							placeholder="Confirm your password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							icon={IconPassword}
							passwordVisible={confirmPasswordVisible}
							setPasswordVisible={setConfirmPasswordVisible}
						/>
						<div className="flex flex-col gap-3">
							<Button>Create New Account</Button>
							<ButtonLink to="/login">Sign In</ButtonLink>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}
