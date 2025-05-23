import { Link } from "react-router-dom";

const ButtonLink = ({ children, className, ...props }) => {
	return (
		<Link
			className={`p-[12px_24px] bg-white rounded-full text-center font-semibold border border-[#E5E5E5] ${className}`}
			{...props}
		>
			{children}
		</Link>
	);
};

export default ButtonLink;
