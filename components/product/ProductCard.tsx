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
// todo add tooltips to wishlist and add to cart
// todo add logic to wishlist and add to cart if added- icon changes to checkmark

const ProductCard = async ({ product }: { product: Product }) => {

	const cart = await getCart()

	return (
		<Card key={product.id} className="relative group w-64 max-w-72 border-2 border-darkBlue">
			<div className="grid gap-1 text-darkBlue absolute top-1 right-0 transition md:translate-x-6 duration-300 ease-in md:opacity-0 md:group-hover:opacity-100 md:group-hover:-translate-x-0 z-30">

				<AddToWishList item={{
					productId: product.id,
					name: product.name,
					slug: product.slug,
					image: product.images[0],
				}} size="icon" />

				<AddToCart item={{
					productId: product.id,
					name: product.name,
					slug: product.slug,
					price: product.price,
					image: product.images[0],
					qty: product.stock
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

			<CardDescription className="flex justify-between items-stretch">
				{/* price */}
				<ProductPrice value={Number(product.price)} />
				{/* details button */}
				<Button variant={'cta'} asChild>
					<Link href={`/products/${product.slug}`}>
						See Details
						<AnimatedDiv variant={'cta'} animation={'scale'}>
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
	);
}

export default ProductCard;