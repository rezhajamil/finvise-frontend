import { Link } from "react-router-dom";
import ImageNotFound from "../assets/image-not-found.png";
import { useState } from "react";
import { formatPrice } from "../utils/format";

const ProductCard = ({ product }) => {
	const [imgError, setImgError] = useState(false);

	return (
		<Link
			to={`/products/${product.id}`}
			key={product.id}
			className="product-card"
		>
			<div className="bg-white flex flex-col gap-[24px] overflow-hidden p-5 rounded-[20px] ring-1 ring-[#E5E5E5] h-64 hover:ring-2 hover:ring-[#FFC736] transition-all duration-300 w-full">
				<div className="w-full h-[90px] flex shrink-0 items-center justify-center overflow-hidden">
					<img
						src={imgError ? ImageNotFound : product.image}
						className="w-full h-full object-contain"
						alt={product.name}
						onError={() => setImgError(true)}
					/>
				</div>
				<div className="flex flex-col gap-[10px] justify-between h-full">
					<div className="flex flex-col gap-1">
						<p className="font-semibold leading-[22px]">{product.name}</p>
						<p className="font-semibold text-[#0D5CD7] leading-[22px]">
							{formatPrice(product.price)}
						</p>
					</div>
					<p className="text-[#616369] text-xs line-clamp-2">
						{product.description}
					</p>
				</div>
			</div>
		</Link>
	);
};

export default ProductCard;
