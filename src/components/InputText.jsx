const InputText = ({ type, placeholder, value, onChange, icon }) => {
	return (
		<div className="flex items-center gap-[10px] rounded-full border border-[#E5E5E5] p-[12px_20px] focus-within:ring-2 focus-within:ring-[#FFC736] transition-all duration-300">
			<div className="flex shrink-0">
				<img src={icon} alt="icon" className="w-5 sm:w-6" />
			</div>
			<input
				type={type}
				id=""
				name=""
				value={value}
				onChange={onChange}
				className="appearance-none outline-none w-full placeholder:text-[#616369] placeholder:font-normal font-semibold text-black"
				placeholder={placeholder}
			/>
		</div>
	);
};

export default InputText;
