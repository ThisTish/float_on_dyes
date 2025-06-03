import ProductCard from "@/components/product/ProductCard"
import ProductCardSkeleton from "@/components/skeletons/ProductCardSkeleton"
import SearchButton from "@/components/ui/SearchButton"
import { getAllProducts } from "@/lib/actions/product.actions"
import { Product } from "@/types"
import { notFound } from "next/navigation"
import { Suspense, useState } from "react"

const ShopPage = async (props: { params: Promise<{ search: string }> }) => {

	const { search } = await props.params

	const allProducts = await getAllProducts()
	if (!allProducts) notFound()

	const filteredProducts = allProducts.filter((product) =>
		product.brand === search ||
		product.category === search ||
		product.dyeType === search ||
		product.name === search ||
		product.plastic === search ||
		product.discType.includes(search) ||
		product.tags.includes(search)
	)


	return (
		<main className="flex flex-col flex-wrap items-center justify-center gap-5 p-4 md:flex-row md:gap-5">
			<Suspense fallback={(
				<>
					{Array.from({ length: 12 }).map((_, i) => (
						<ProductCardSkeleton key={i} />
					))}
				</>
			)}>
				{filteredProducts.length <= 0 ? (
					<div className="flex flex-col items-center justify-between gap-5">

						<h2 className="text-3xl font-extrabold tracking-widest" >
							Couldn't find any disc with that info
						</h2>
						<h3 className="text-xl tracking-tight">Try searching for something else...</h3>
						<div className="mr-7">
						<SearchButton />
						</div>
					</div>
				):(
					(search ? filteredProducts : allProducts).map((product) => (
						<ProductCard key={product.id} product={product} />
					))

				)}

			</Suspense>
		</main>
	)
}

export default ShopPage