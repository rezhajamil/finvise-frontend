import { useState } from "react";
import IconChevronDown from "../assets/icons/chevron-down.svg";
import IconChevronUp from "../assets/icons/chevron-up.svg";

const Collapsible = ({ title, children, defaultOpen = true }) => {
	const [isOpen, setIsOpen] = useState(defaultOpen);

	return (
		<div className="flex flex-col gap-[14px]">
			<button
				type="button"
				onClick={() => setIsOpen(!isOpen)}
				className="flex items-center justify-between w-full md:hidden"
			>
				<p className="font-bold text-lg sm:text-2xl leading-[34px]">{title}</p>
				<img
					src={isOpen ? IconChevronUp : IconChevronDown}
					alt="toggle"
					className="w-5 h-5 transition-transform duration-300"
				/>
			</button>
			<div
				className={`grid transition-all duration-300 ease-in-out ${
					isOpen
						? "grid-rows-[1fr] opacity-100 h-full"
						: "grid-rows-[0fr] opacity-0 h-0 md:grid-rows-[1fr] md:opacity-100 md:h-full"
				}`}
			>
				<div className={`space-y-4 ${isOpen ? "block " : "hidden md:block"}`}>
					{children}
				</div>
			</div>
		</div>
	);
};

export default Collapsible;
