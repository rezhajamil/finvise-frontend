import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useProductStore from "../store/useProductStore";
import Navbar from "../parts/Navbar";
import IconSearch from "../assets/icons/search.svg";
import InputText from "../components/InputText";
import ProductCard from "../components/ProductCard";
import IconPrice from "../assets/icons/dollar-circle.svg";
import IconChevronDown from "../assets/icons/chevron-down.svg";
import IconChevronUp from "../assets/icons/chevron-up.svg";
import Collapsible from "../components/Collapsible";

export default function Products() {
	const { products, loading, error, fetchProducts } = useProductStore();
	const [searchParams, setSearchParams] = useSearchParams();
	const [sortBy, setSortBy] = useState(searchParams.get("sort_by") || "name");
	const [sortOrder, setSortOrder] = useState(
		searchParams.get("sort_order") || "asc"
	);
	const [search, setSearch] = useState(searchParams.get("search") || "");
	const [priceMin, setPriceMin] = useState(searchParams.get("price_min") || "");
	const [priceMax, setPriceMax] = useState(searchParams.get("price_max") || "");
	const [isPriceRangeOpen, setIsPriceRangeOpen] = useState(true);
	const [isSortByOpen, setIsSortByOpen] = useState(true);

	const params = {
		price_min: priceMin,
		price_max: priceMax,
		sort_by: sortBy,
		sort_order: sortOrder,
		search: search,
	};

	const key = new URLSearchParams(params).toString();
	const productList = products[key] || [];

	const handleSortChange = (value) => {
		let newSortBy = "name";
		let newSortOrder = "asc";

		switch (value) {
			case "name_asc":
				newSortBy = "name";
				newSortOrder = "asc";
				break;
			case "name_desc":
				newSortBy = "name";
				newSortOrder = "desc";
				break;
			case "price_asc":
				newSortBy = "price";
				newSortOrder = "asc";
				break;
			case "price_desc":
				newSortBy = "price";
				newSortOrder = "desc";
				break;
			default:
				break;
		}

		setSortBy(newSortBy);
		setSortOrder(newSortOrder);

		// Update URL params
		setSearchParams((prev) => {
			prev.set("sort_by", newSortBy);
			prev.set("sort_order", newSortOrder);
			return prev;
		});
	};

	useEffect(() => {
		fetchProducts(params);
		console.log({ key });
	}, [key]);

	return (
		<>
			<div className="bg-[#EFF3FA] flex flex-col gap-y-6 px-4">
				<header className="pt-[30px] ">
					<Navbar />
				</header>
				<div className="lg:block flex flex-col">
					<div
						id="title"
						className="container max-w-[1130px] mx-auto flex items-center justify-end	"
					>
						<InputText
							className={"w-full sm:w-1/2"}
							iconOnClick={() => fetchProducts(params)}
							iconPosition="right"
							type="text"
							placeholder="Search product by name"
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							icon={IconSearch}
						/>
					</div>
					<div
						id="catalog"
						className="container max-w-[1130px] mx-auto flex flex-col md:flex-row gap-[30px] mt-6 sm:mt-[50px] pb-[100px] "
					>
						<form
							action=""
							className="flex flex-1 flex-col bg-white py-4 px-4 sm:p-8 gap-5 h-fit border border-[#E5E5E5] rounded-[30px]"
						>
							{/* <h2 className="font-bold text-lg sm:text-2xl leading-[34px]">
								Filters
							</h2> */}
							<Collapsible title={"Filters"}>
								<p className="font-semibold text-sm sm:text-base leading-[22px]">
									Price Range
								</p>
								<InputText
									type="number"
									icon={IconPrice}
									placeholder="Minimum Price"
									value={params.price_min}
									onChange={(e) => setPriceMin(e.target.value)}
								/>
								<InputText
									type="number"
									icon={IconPrice}
									placeholder="Maximum Price"
									value={params.price_max}
									onChange={(e) => setPriceMax(e.target.value)}
								/>
								<hr className="border-[#E5E5E5]" />
								<p className="font-semibold text-sm sm:text-base leading-[22px]">
									Sort By
								</p>
								<label className="flex items-center gap-3">
									<input
										type="radio"
										name="sort"
										value="name_asc"
										checked={sortBy === "name" && sortOrder === "asc"}
										onChange={(e) => handleSortChange(e.target.value)}
										className="w-6 h-6 flex shrink-0 appearance-none checked:border-[3px] checked:border-solid checked:border-white rounded-md checked:bg-[#0D5CD7] ring-1 ring-[#0D5CD7]"
									/>
									<span>Name : A - Z</span>
								</label>
								<label className="flex items-center gap-3">
									<input
										type="radio"
										name="sort"
										value="name_desc"
										checked={sortBy === "name" && sortOrder === "desc"}
										onChange={(e) => handleSortChange(e.target.value)}
										className="w-6 h-6 flex shrink-0 appearance-none checked:border-[3px] checked:border-solid checked:border-white rounded-md checked:bg-[#0D5CD7] ring-1 ring-[#0D5CD7]"
									/>
									<span>Name : Z - A</span>
								</label>
								<label className="flex items-center gap-3">
									<input
										type="radio"
										name="sort"
										value="price_asc"
										checked={sortBy === "price" && sortOrder === "asc"}
										onChange={(e) => handleSortChange(e.target.value)}
										className="w-6 h-6 flex shrink-0 appearance-none checked:border-[3px] checked:border-solid checked:border-white rounded-md checked:bg-[#0D5CD7] ring-1 ring-[#0D5CD7]"
									/>
									<span>Price : Low to High</span>
								</label>
								<label className="flex items-center gap-3">
									<input
										type="radio"
										name="sort"
										value="price_desc"
										checked={sortBy === "price" && sortOrder === "desc"}
										onChange={(e) => handleSortChange(e.target.value)}
										className="w-6 h-6 flex shrink-0 appearance-none checked:border-[3px] checked:border-solid checked:border-white rounded-md checked:bg-[#0D5CD7] ring-1 ring-[#0D5CD7]"
									/>
									<span>Price : High to Low</span>
								</label>
							</Collapsible>
						</form>
						<div className="lg:w-3xl md:w-xl sm:w-lg flex flex-col bg-white py-8 px-4 sm:p-8 gap-[30px] h-fit border border-[#E5E5E5] rounded-[30px]">
							<h2 className="font-bold text-2xl leading-[34px]">Products</h2>
							{loading && (
								<div className="flex items-center justify-center">
									<p className="text-gray-400 font-bold text-xl">Loading....</p>
								</div>
							)}
							{error && (
								<div className="flex items-center justify-center">
									<p className="text-red-400 font-bold text-xl">{error}</p>
								</div>
							)}
							<div className="grid grid-cols-2 lg:grid-cols-3 sm:gap-8 gap-4">
								{productList.length
									? productList.map((product) => (
											<ProductCard key={product.id} product={product} />
									  ))
									: !error &&
									  !loading && (
											<div className="flex items-center justify-center col-span-full">
												<p className="text-gray-400 font-bold text-xl">
													No Product Found
												</p>
											</div>
									  )}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
