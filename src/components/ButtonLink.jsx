import { Link } from "react-router-dom";

const ButtonLink = ({ children, className, ...props }) => {
	return (
		<Link
			className={`p-[12px_24px] bg-white hover:bg-gray-100 transition-all duration-300 rounded-full text-center font-semibold border border-[#E5E5E5] ${className}`}
			{...props}
		>
			{children}
		</Link>
	);
};

export default ButtonLink;
