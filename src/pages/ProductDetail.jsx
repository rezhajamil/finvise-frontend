import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";

export default function ProductDetail() {
	const { id } = useParams();
	const [product, setProduct] = useState(null);
	const [error, setError] = useState("");

	useEffect(() => {
		API.get(`/products/${id}`)
			.then((res) => setProduct(res.data))
			.catch((err) => {
				console.log(err);
				setError("Product not found or unauthorized.");
			});
	}, [id]);

	if (error) return <p style={{ color: "red" }}>{error}</p>;
	if (!product) return <p>Loading product...</p>;

	return (
		<div style={{ padding: "1rem" }}>
			<h2>{product.name}</h2>
			<img src={product.image} alt={product.name} style={{ width: "300px" }} />
			<p>
				<strong>Price:</strong> ${product.price}
			</p>
			<p>{product.description}</p>
		</div>
	);
}
