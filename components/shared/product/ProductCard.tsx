import { AnimatedDiv } from "@/components/ui/AnimatedDiv"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { BiBookmarkHeart, BiDetail, BiPlusCircle } from "react-icons/bi"
import ProductPrice from "./ProductPrice"
import Link from "next/link"
import { Product } from "@/types"
import ProductImage from "./ProductImage"

const ProductCard = ({ product }: { product: Product }) => {
	return (
		<Card key={product.id} className="relative group w-64 max-w-72 border-2 border-darkBlue">
			<div className="grid gap-1 text-darkBlue absolute top-1 right-0 transition translate-x-6 duration-300 ease-in md:opacity-0 group-hover:opacity-100 group-hover:-translate-x-0 z-30">
				{/* todo add tooltips for this..... */}
				{/* if added, heart checkmark */}
				<button  className="size-fit p-1 hover:bg-darkBlue hover:text-white transition duration-500" >
				<BiBookmarkHeart size={25} />
				</button>

				{/* if added, check sign */}
				<button className="size-fit p-1 hover:bg-darkBlue hover:text-white transition duration-500" >
				<BiPlusCircle size={25} />
				</button>
			</div>

			<CardContent >
				{/* image */}
				<ProductImage src={product.images[0]} width={300} height={300} alt={product.name} />
			
			</CardContent>

			{/* title */}
			<CardTitle className="h-20">
				<Link href={`/development/products/${product.slug}`}>
					<span className="text-lg font-bold">{product.name} </span>
					<span className="text-lg font-light">- {product.dyeType}</span>
				</Link>
			</CardTitle>

			<CardDescription className="flex justify-between items-stretch">

				<ProductPrice value={Number(product.price)} />
				<Button variant={'cta'}>
					See Details
					<AnimatedDiv variant={'cta'} animation={'scale'}>
						<BiDetail />
					</AnimatedDiv>
				</Button>
			</CardDescription>
			{/* tags */}
			<CardFooter>
				{product.tags.map((tag: string) => (
					<Button variant={'chip'} size={'chip'} key={`${product.id}-${tag}`}>{tag}</Button>
				))}
			</CardFooter>

		</Card>
	);
}

export default ProductCard;