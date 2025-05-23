const InputText = ({
	type,
	placeholder,
	value,
	onChange,
	icon,
	iconPosition = "left",
	iconOnClick,
	className,
}) => {
	return (
		<div
			className={`flex items-center gap-[10px] rounded-full border bg-white border-[#E5E5E5] p-[12px_20px] focus-within:ring-2 focus-within:ring-[#FFC736] transition-all duration-300 ${className}`}
		>
			{icon && iconPosition === "left" && (
				<button
					type="button"
					className="cursor-pointer flex shrink-0"
					onClick={iconOnClick}
				>
					<img src={icon} alt="icon" className="w-5 sm:w-6" />
				</button>
			)}
			<input
				type={type}
				id=""
				name=""
				value={value}
				onChange={onChange}
				className="appearance-none outline-none w-full placeholder:text-[#616369] placeholder:font-normal font-semibold text-black"
				placeholder={placeholder}
			/>
			{icon && iconPosition === "right" && (
				<button
					type="button"
					className="cursor-pointer flex shrink-0"
					onClick={iconOnClick}
				>
					<img src={icon} alt="icon" className="w-5 sm:w-6" />
				</button>
			)}
		</div>
	);
};

export default InputText;
