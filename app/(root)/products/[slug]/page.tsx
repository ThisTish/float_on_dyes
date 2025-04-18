import Banner from "@/components/header/Banner"
import AddToCart from "@/components/product/AddToCart"
import AddToWishList from "@/components/product/AddToWishList"
import ProductDetailsImages from "@/components/product/ProductDetailsImages"
import ProductPrice from "@/components/product/ProductPrice"
import BackButton from "@/components/ui/BackButton"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { getCart } from "@/lib/actions/cart.actions"
import { getProductBySlug } from "@/lib/actions/product.actions"
import { notFound } from "next/navigation"
// todo Breadcrumb
// todo Related Products
// todo tags search
// todo when more products available, change qty to product.stock


const ProductDetailsPage = async (props: { params: Promise<{ slug: string }> }) => {

	const { slug } = await props.params

	const product = await getProductBySlug(slug)
	if (!product) notFound()

	const cart = await getCart()


	return (
		<div className="space-y-10">
			<Banner url={'/images/cellHeader.jpg'} darkUrl={'/images/cellHeader-dark.jpg'} title={product.name} subtitle={product.dyeType} />

			<section className="grid grid-cols-1 gap-5 md:grid-cols-2">

				{/* images */}
				<div className="w-full">
					<ProductDetailsImages images={product.images} name={product.name} />
				</div>

				{/* details */}
				<Card className="p-10">
					<CardHeader >
						<CardTitle >
							<span className="text-xl font-extrabold md:text-2xl">{product.name} </span>
							<span className="text-lg font-bold md:text-xl">{product.brand} </span>
							<div className="flex-between font-semibold md:text-lg">
								<div>

								<span className="text-xs font-extralight md:text-sm">Dye Type: </span>
								<span>{product.dyeType}</span>
								</div>
								<ProductPrice className="text-xl md:text-2xl" value={Number(product.price)} />
							</div>
							<div>
							<span className="text-xs font-extralight md:text-sm">Plastic: </span>
							<span className="text-sm font-light md:text-base">{product.plastic}</span>
							</div>
							<p className="text-xs font-extralight md:text-sm">{product.weight}g</p>
						</CardTitle>
					</CardHeader>

					<CardContent className="space-y-3">
						{/* description */}
						<p className="text-pretty leading-snug">{product.description}</p>

						{/* flight numbers */}
						<div className="mx-auto grid max-w-60 grid-cols-4 gap-1 py-5 text-center text-sm sm:text-base">
							<div className="aspect-square max-w-24 content-evenly bg-brightBlue text-white">
								<h4 >Speed</h4>
								<span className="font-bold tracking-widest">{product.speed}</span>
							</div>
							<div className="aspect-square max-w-24 content-evenly bg-darkGreen text-white">
								<h4 >Glide</h4>
								<span className="font-bold tracking-widest">{product.glide}</span>
							</div>
							<div className="aspect-square max-w-24 content-evenly bg-darkBlue text-white">
								<h4 >Turn</h4>
								<span className="font-bold tracking-widest">{product.turn}</span>
							</div>
							<div className="aspect-square max-w-24 content-evenly bg-lightGreen text-white">
								<h4 >Fade</h4>
								<span className="font-bold tracking-widest">{product.fade}</span>
							</div>
						</div>
					</CardContent>

					{/* cart buttons */}
					<CardFooter className="mt-3 flex w-full flex-col items-center justify-center gap-3 lg:flex-row">
						<AddToWishList item={{
							productId: product.id,
							name: product.name,
							slug: product.slug,
							price: product.price,
							image: product.images[0],
							qty: 1,
							isAvailable: product.isAvailable
						}} size={'button'} />

						<AddToCart item={{
							productId: product.id,
							name: product.name,
							slug: product.slug,
							price: product.price,
							image: product.images[0],
							qty: 1,
							isAvailable: product.isAvailable
						}}
							cart={cart}
							size={'button'}
						/>
					</CardFooter>
				</Card>
			{/* tags */}
			<div className="flex flex-wrap justify-end space-x-2 md:col-start-2">
				{product.tags.map((tag: string) => (
					<Button variant={'chip'} size={'chip'} key={`${product.id}-${tag}`}>{tag}</Button>
				))}
			</div>
			</section>


			{/* nav buttons */}
			<BackButton size="sm" />

			{/* Related Products Section */}
		</div>
	)
}

export default ProductDetailsPage

// >previous and next buttons?
