import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";
import Navbar from "../parts/Navbar";
import ImageNotFound from "../assets/image-not-found.png";
import useProductStore from "../store/useProductStore";
import ProductCard from "../components/ProductCard";
import { formatPrice } from "../utils/format";

export default function ProductDetail() {
	const { id } = useParams();
	const [product, setProduct] = useState(null);
	const [error, setError] = useState("");
	const [imgError, setImgError] = useState(false);
	const { products, fetchProducts } = useProductStore();
	const recommendationCount = 6;

	useEffect(() => {
		API.get(`/products/${id}`)
			.then((res) => setProduct(res.data))
			.catch((err) => {
				setError("Product not found.");
			});
	}, [id]);

	useEffect(() => {
		if (Object.keys(products).length === 0) {
			fetchProducts({ limit: recommendationCount });
		}
	}, [products, fetchProducts]);

	useEffect(() => {
		if (product) {
			const relatedProducts = products[product.category];
			if (relatedProducts) {
				const filteredProducts = relatedProducts.filter(
					(p) => p.id !== product.id
				);
				setProduct((prevProduct) => ({
					...prevProduct,
					relatedProducts: filteredProducts,
				}));
			}
		}
	}, [product, products]);

	if (error) return <p style={{ color: "red" }}>{error}</p>;
	if (!product) return <p>Loading product...</p>;

	return (
		<>
			<div className="flex flex-col gap-y-6">
				<header className="pt-[30px] -mb-64 sm:-mb-[310px] h-[480px] bg-[#EFF3FA]  px-4">
					<Navbar />
				</header>
				<div className="lg:block flex flex-col px-4 ">
					<div
						id="title"
						className="container max-w-[1130px] mx-auto flex items-center justify-center"
					>
						<div className="flex flex-col gap-5">
							<h1 className="font-bold md:text-4xl text-2xl sm:text-3xl leading-9 text-center">
								{product.name}
							</h1>
							<div className="image-card ">
								<div className="bg-white w-3/4 md:w-[470px] md:h-[350px] mx-auto sm:p-4 p-2 flex shrink-0 border border-[#E5E5E5] justify-center items-center rounded-[30px] overflow-hidden">
									<img
										src={imgError ? ImageNotFound : product.image}
										className="w-full h-full object-contain"
										alt={product.name}
										onError={() => setImgError(true)}
									/>
								</div>
							</div>
						</div>
					</div>
					<div
						id="details-info"
						className="container max-w-[1130px] mx-auto w-full flex-col-reverse sm:flex-row px-2 sm:px-0 flex justify-between gap-5 mt-4 md:mt-8"
					>
						<div className="max-w-[650px] w-full flex flex-col gap-[30px]">
							<div id="about" className="flex flex-col gap-[10px]">
								<h3 className="font-semibold">About Product</h3>
								<p className="leading-[32px]">{product.description}</p>
							</div>
						</div>
						<div className="w-[302px] flex flex-col shrink-0 gap-5 h-fit mx-auto sm:mx-0">
							<div className="w-full bg-white hover:bg-[#0D5CD7] transition-all group border border-[#E5E5E5] flex flex-col gap-8 p-4 md:p-8 rounded-3xl">
								<div className="flex flex-col gap-1 ">
									<p className="font-semibold group-hover:text-white transition-all">
										Brand New
									</p>
									<p className="font-bold text-2xl md:text-3xl text-[#0D5CD7] transition-all group-hover:text-white ">
										{formatPrice(product.price)}
									</p>
								</div>
							</div>
						</div>
					</div>
					{Object.keys(products).length > 0 && (
						<div
							id="recommedations"
							className="container max-w-[1130px] mx-auto flex flex-col gap-[30px] pb-[100px] mt-[70px]"
						>
							<div className="flex items-center justify-between">
								<h2 className="font-bold text-2xl leading-[34px]">
									Other Products <br />
									You Might Need
								</h2>
							</div>
							<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-[30px]">
								{Object.values(products)
									.flat()
									.filter((p) => p.id !== product.id)
									.sort(() => Math.random() - 0.5)
									.slice(0, recommendationCount)
									.map((product) => (
										<ProductCard key={product.id} product={product} />
									))}
							</div>
						</div>
					)}
				</div>
			</div>
		</>
	);
}
