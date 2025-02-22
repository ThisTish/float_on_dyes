import AddToCart from "@/components/product/AddToCart"
import AddToWishList from "@/components/product/AddToWishList"
import ProductDetailsImages from "@/components/product/ProductDetailsImages"
import ProductPrice from "@/components/product/ProductPrice"
import { AnimatedDiv } from "@/components/ui/AnimatedDiv"
import BackButton from "@/components/ui/BackButton"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { getProductBySlug } from "@/lib/actions/product.actions"
import { notFound } from "next/navigation"
import { BiBookmarkHeart, BiPlus } from "react-icons/bi"
// todo Breadcrumb
// todo Related Products
// todo tags search

const ProductDetailsPage = async (props: { params: Promise<{ slug: string }> }) => {

	const { slug } = await props.params

	const product = await getProductBySlug(slug)

	if (!product) notFound()

	return (
		<div className="space-y-10">
			<header className="relative w-full h-28 mt-28 bg-[url('/images/cellHeader.jpg')] dark:bg-[url('/images/cellHeader-dark.jpg')] bg-cover bg-center bg-no-repeat md:h-32 lg:h-40">
				<h1 className="text-white backdrop-blur-sm size-fit absolute left-5 top-5">
					<span className="text-4xl font-bold md:text-5xl lg:text-6xl">{product.name} </span>
					<span className="text-2xl font-light md:text-3xl lg:text-4xl">{product.dyeType}</span>
				</h1>
				{/* Breadcrumb */}
			</header>

			<section className="grid grid-cols-1 gap-10 md:gap-5 md:grid-cols-2">
				{/* images */}
				<div className="w-full">
					<ProductDetailsImages images={product.images} name={product.name} />
				</div>

				{/* details */}
				<Card className="space-y-5 p-10 text-darkGreen">
					<CardHeader>
						<CardTitle >
							<h2>
								<span className="text-2xl font-extrabold tracking-tight ">{product.name} </span>
								<span className="text-xl font-bold ">{product.brand} </span>
								<span className=" font-light block">{product.plastic}</span>
								<p className="text-sm font-extralight">{product.weight}g</p>

							</h2>
						</CardTitle>

						{/* dye type and price */}
						<CardDescription>
							<div className="flex flex-wrap gap-3 -mt-2 justify-between items-center">
								<span className="text-lg font-semibold">{product.dyeType}</span>
								<ProductPrice className="text-2xl" value={Number(product.price)} />
							</div>
						</CardDescription>
					</CardHeader>

					<CardContent>
						{/* description */}
						<p className="text-pretty leading-snug">{product.description}</p>

						{/* flight numbers */}
						<div className="grid grid-cols-4 py-5 mx-auto max-w-60 text-center text-sm sm:text-base ">
							<div className="aspect-square max-w-24 bg-brightBlue text-white content-evenly">
								<h4 >Speed</h4>
								<span className="font-bold tracking-widest">{product.speed}</span>
							</div>
							<div className="aspect-square max-w-24 bg-darkGreen text-white content-evenly ">
								<h4 >Glide</h4>
								<span className="font-bold tracking-widest">{product.glide}</span>
							</div>
							<div className="aspect-square max-w-24 bg-darkBlue text-white content-evenly ">
								<h4 >Turn</h4>
								<span className="font-bold tracking-widest">{product.turn}</span>
							</div>
							<div className="aspect-square max-w-24 bg-lightGreen text-white content-evenly ">
								<h4 >Fade</h4>
								<span className="font-bold tracking-widest">{product.fade}</span>
							</div>
						</div>
					</CardContent>

					{/* cart buttons */}
					<CardFooter className="flex flex-col-reverse sm:flex-row justify-center items-center w-full gap-3">
						<AddToWishList item={{
							productId: product.id,
							name: product.name,
							slug: product.slug,
							image: product.images[0],
							isAvailable: product.isAvailable
						}} size={'button'} />

						<AddToCart item={{
							productId: product.id,
							name: product.name,
							slug: product.slug,
							price: product.price,
							image: product.images[0],
							qty: 1
						}}
						size={'button'} 
						/>
					</CardFooter>
				</Card>
			</section>

			{/* tags */}
			<div className="flex justify-end space-x-2">
				{product.tags.map((tag: string) => (
					<Button variant={'chip'} size={'chip'} key={`${product.id}-${tag}`}>{tag}</Button>
				))}
			</div>

			{/* nav buttons */}
			<BackButton size="sm" />

			{/* Related Products Section */}
		</div>
	)
}

export default ProductDetailsPage

// >previous and next buttons?
