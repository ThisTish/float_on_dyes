import ProductCard from "@/components/product/ProductCard"
import ProductCardSkeleton from "@/components/skeletons/ProductCardSkeleton"
import { getAllProducts } from "@/lib/actions/product.actions"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { Suspense } from "react"



export const metadata: Metadata = {
	title: 'Disc Shop'
}


const ShopSearchPage = async () => {


	const allProducts = await getAllProducts()
	if (!allProducts) notFound()


	return (
		<section className="mx-auto flex flex-wrap justify-center gap-3">
			<Suspense fallback={(
				<>
					{Array.from({ length: 12 }).map((_, i) => (
						<ProductCardSkeleton key={i} />
					))}
				</>
			)}>
				{allProducts.map((product) => (
					<ProductCard key={product.id} product={product} site={'Shop'} />
				))}

			</Suspense>
		</section>
	)
}

export default ShopSearchPage
