import { getLatestProducts } from "@/lib/actions/product.actions"
import ProductCard from "../product/ProductCard"
import Heading from "../ui/Heading"
import { Suspense } from "react"
import ProductCardSkeleton from "../skeletons/ProductCardSkeleton"

const FeaturedDiscs = async () => {
	const products = await getLatestProducts()

	return (
		<section className="mt-96 flex flex-col items-center justify-center gap-10">
			<Heading first="Featured" second="Discs" />
			<div className="flex flex-wrap justify-center gap-2 p-2">
				<Suspense fallback={(
					<>
						{Array.from({ length: 5 }).map((_, i) => (
							<ProductCardSkeleton key={i} />
						))}
					</>
				)}>
					{products.map((product) => (
						<ProductCard key={product.id} product={product} />
					))}
				</Suspense>
			</div>

		</section>
	)
}

export default FeaturedDiscs