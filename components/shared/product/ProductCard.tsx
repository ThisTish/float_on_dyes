import { AnimatedDiv } from "@/components/ui/AnimatedDiv"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { formatNumberWithDecimal } from "@/lib/utils"
import { ArrowUpRight, Plus, PlusCircle, PlusSquareIcon, ShoppingBag, ShoppingBasket, ShoppingCart } from "lucide-react"
import Image from "next/image"
import { BiBookmarkHeart, BiDetail, BiHeart, BiHeartCircle, BiHeartSquare, BiPlus, BiPlusCircle } from "react-icons/bi"
import ProductPrice from "./ProductPrice"
import Link from "next/link"
import { Product } from "@/types"
import { FaPlus } from "react-icons/fa"
import { TbPlus } from "react-icons/tb"

const ProductCard = ({ product }: { product: Product }) => {
	return (
		<Card key={product.id} className="relative group w-64 max-w-72 border-2 border-darkBlue">
			<div className="grid md:hidden group-hover:grid gap-1 text-darkGreen absolute top-2 right-1">
			<BiBookmarkHeart className="size-10 p-1" />
			<BiPlusCircle className="size-10 p-1"/>
			{/* <BiHeart /> */}
			{/* <BiHeartCircle /> */}
			{/* <BiHeartSquare /> */}

			</div>

			{/* <Plus /> */}
			{/* <BiPlus /> */}
			<CardContent>
				{/* image */}
				<Image
					src={product.images[0]}
					width={300}
					height={300}
					alt={`${product.name} image`}
					priority
				/>
			</CardContent>

			{/* title */}
			<CardTitle className="h-20">
				<Link href={`/products/${product.slug}`}>
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
			<CardFooter className="">
				{product.tags.map((tag: string) => (
					<Button variant={'chip'} size={'chip'} key={`${product.id}-${tag}`}>{tag}</Button>
				))}
			</CardFooter>

		</Card>
	);
}

export default ProductCard;