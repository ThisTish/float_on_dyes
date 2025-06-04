import { AnimatedDiv } from "@/components/ui/AnimatedDiv"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card"
import { BiDetail } from "react-icons/bi"
import ProductPrice from "./ProductPrice"
import Link from "next/link"
import { Product } from "@/types"
import ProductImage from "./ProductImage"
import AddToCart from "./AddToCart"
import AddToWishList from "./AddToWishList"
import { getCart } from "@/lib/actions/cart.actions"

// todo make action to search by tags
// todo add logic to wishlist and add to cart if added- icon changes to checkmark
// todo when more products available, change qty to product.stock

const ProductCard = async ({ product, site }: { product: Product, site: string }) => {

	const cart = await getCart()

	return (
		<Card key={product.id} className={`group ${site === 'home' ? 'w-72' : 'w-64'} relative border-2 border-darkBlue`}>
			<div className="absolute right-0 top-1 z-30 grid gap-1 text-darkBlue transition duration-300 ease-in md:translate-x-6 md:opacity-0 md:group-hover:-translate-x-0 md:group-hover:opacity-100">

				<AddToWishList item={{
					productId: product.id,
					name: product.name,
					slug: product.slug,
					price: product.price,
					image: product.images[0],
					qty: 1,
					isAvailable: product.isAvailable
				}} size="icon" />

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
					size={'icon'} />
			</div>

			<CardContent >
				{/* image */}
				<ProductImage src={product.images[0]} width={300} height={300} alt={product.name} />
			</CardContent>

			{/* title */}
			<CardTitle className="h-20">
				<Link href={`/products/${product.slug}`}>
					<span className="text-lg font-bold">{product.name} </span>
					<span className="text-lg font-light">- {product.dyeType}</span>
				</Link>
			</CardTitle>

			<CardDescription className="flex items-stretch justify-between">
				
				{/* price */}
				<ProductPrice value={Number(product.price)} />

				{/* details button */}
				<Button size={'sm'} asChild>
					<Link href={`/products/${product.slug}`}>
						See Details
						<AnimatedDiv size={'sm'} animation={'scale'}>
							<BiDetail />
						</AnimatedDiv>
					</Link>
				</Button>
			</CardDescription>

			{/* tags */}
			<CardFooter className="flex flex-wrap">
				{product.tags.map((tag: string) => (
					<Button variant={'chip'} size={'chip'} key={`${product.id}-${tag}`}>{tag}</Button>
				))}
			</CardFooter>

		</Card>
	)
}

export default ProductCard