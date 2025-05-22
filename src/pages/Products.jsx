import { useEffect } from "react";
import useProductStore from "../store/useProductStore";

export default function Products() {
	const { products, loading, error, fetchProducts } = useProductStore();

	const params = {
		price_min: "",
		price_max: "",
		sort_by: "price",
		sort_order: "asc",
		search: "",
	};

	const key = new URLSearchParams(params).toString();
	const productList = products[key] || [];

	useEffect(() => {
		fetchProducts(params);
	}, [key]);

	return (
		<div>
			<h2>Product List</h2>
			{loading && <p>Loading...</p>}
			{error && <p style={{ color: "red" }}>{error}</p>}

			{productList.map((p) => (
				<div key={p.id}>
					{p.name} - ${p.price}
				</div>
			))}
		</div>
	);
}
