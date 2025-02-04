import { AnimatedDiv } from "@/components/ui/AnimatedDiv"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { formatNumberWithDecimal } from "@/lib/utils"
import { ArrowUpRight } from "lucide-react"
import Image from "next/image"
import { BiDetail } from "react-icons/bi"
import ProductPrice from "./ProductPrice"
import Link from "next/link"

const ProductCard = ({ product }: { product: any }) => {
	return (
		<Card key={product.id}>
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

			<CardHeader>
				{/* title */}
				<CardTitle>
					<Link href={`/products/${product.slug}`}>
					<span className="text-lg font-bold">{product.name} </span>
					<span className="text-lg font-light">- {product.dyeType}</span>
					</Link>
				</CardTitle>
			</CardHeader>

			<CardContent className="flex justify-between items-baseline">
				<ProductPrice value={Number(product.price)} />
				<Button variant={'cta'}>
					See Details
					<AnimatedDiv variant={'cta'} animation={'scale'}>
						<BiDetail />
						{/* <ArrowUpRight /> */}
					</AnimatedDiv>
				</Button>
			</CardContent>
			{/* tags */}
			<CardFooter className="flex flex-wrap gap-1">
				{product.tags.map((tag: string) => (
					<Button variant={'chip'} size={'sm'}key={`${product.id}-${tag}`}>{tag}</Button>
				))}
			</CardFooter>

		</Card>
	);
}

export default ProductCard;