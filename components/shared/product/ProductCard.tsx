import { AnimatedDiv } from "@/components/ui/AnimatedDiv"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpRight } from "lucide-react"
import Image from "next/image"
import { BiDetail } from "react-icons/bi"

const ProductCard = ({ product }: { product: any }) => {
	return (
		<Card key={product.id}>
			<CardContent>
				<Image
					src={product.images[0]}
					width={300}
					height={300}
					alt={`${product.name} image`}
					priority
				/>
			</CardContent>
			<CardHeader>
				<CardTitle>
					<span>{product.name}</span>
					<span>-{product.dyeType}</span>
				</CardTitle>
			</CardHeader>
			<div>
				<span>{product.price}</span>
				<Button variant={'cta'}>
					See Details
					<AnimatedDiv variant={'cta'} animation={'scale'}>
						<BiDetail />
						{/* <ArrowUpRight /> */}
					</AnimatedDiv>
				</Button>
			</div>
			<CardFooter>
				{product.tags.map((tag: string) => (
					<Button variant={'outline'} key={`${product.id}-${tag}`}>{tag}</Button>
				))}
			</CardFooter>

		</Card>
	);
}

export default ProductCard;