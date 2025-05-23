const Button = ({ children, className, ...props }) => {
	return (
		<button
			className={`p-[12px_24px] bg-[#0D5CD7] hover:bg-blue-600 transition-all duration-300 rounded-full cursor-pointer text-center font-semibold text-white ${className}`}
			{...props}
		>
			{children}
		</button>
	);
};

export default Button;
