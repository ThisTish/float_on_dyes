// import ProductCardSkeleton from "@/components/skeletons/ProductCardSkeleton"
// import { notFound } from "next/navigation"

// const ShopPage = async (props: { params: Promise<{ search: string }> }) => {

// 	const { search } = await props.params

// 	const product = await getProductsByKeyword(search)
// 	if (!product) notFound()


// 	return (
// 		<main className="flex flex-col flex-wrap items-center justify-center gap-5 p-4 md:flex-row md:gap-5">
// 			<ProductCardSkeleton />
// 			<ProductCardSkeleton />
// 			<ProductCardSkeleton />
// 			<ProductCardSkeleton />
// 			<ProductCardSkeleton />
// 			<ProductCardSkeleton />
// 		</main>
// 	)
// }

// export default ShopPage