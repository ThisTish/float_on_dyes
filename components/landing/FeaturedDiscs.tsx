import { getLatestProducts } from "@/lib/actions/product.actions";
import ProductCard from "../shared/product/ProductCard";
import SearchInput from "../ui/SearchInput";
import { Work_Sans } from "next/font/google";

const FeaturedDiscs = async () => {
	const products = await getLatestProducts()

	return (
		<section className="mt-[40rem] flex flex-col justify-center gap-10">
			<h3 className={`text-center text-3xl font-bold font-work-sans`}>Featured Discs</h3>
			<div className="flex flex-wrap justify-center gap-2 p-2">
				{/* make carousel w/arrows */}
				{products.map((product) => (
					<ProductCard key={product.id} product={product} />
				))}
			</div>
			{/* <SearchInput /> */}
		</section>
	);
}

export default FeaturedDiscs;