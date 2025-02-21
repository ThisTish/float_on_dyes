import { getLatestProducts } from "@/lib/actions/product.actions";
import ProductCard from "../product/ProductCard";
import SearchButton from "../ui/SearchButton";

const FeaturedDiscs = async () => {
	const products = await getLatestProducts()

	return (
		<section className="mt-[43rem] flex flex-col justify-center gap-10 mb-32 md:mt-[47rem] lg:mt-[51rem] ">
			<div className="flex flex-wrap justify-center gap-2 p-2">
				{products.map((product) => (
					<ProductCard key={product.id} product={product} />
				))}
			</div>
			<SearchButton />

		</section>
	);
}

export default FeaturedDiscs;