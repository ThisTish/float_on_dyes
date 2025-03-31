import ProductCardSkeleton from "@/components/skeletons/ProductCardSkeleton"

const ShopPage = () => {
	return (
		<main className="flex flex-col flex-wrap items-center justify-center gap-5 p-4 md:flex-row md:gap-5">
			<ProductCardSkeleton />
			<ProductCardSkeleton />
			<ProductCardSkeleton />
			<ProductCardSkeleton />
			<ProductCardSkeleton />
			<ProductCardSkeleton />
		</main>
	)
}

export default ShopPage