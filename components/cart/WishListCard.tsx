import { CartItem } from "@/types"
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card"
import Image from "next/image"
import Link from "next/link"
import AddToCart from "../product/AddToCart"
import AddToWishList from "../product/AddToWishList"

const WishListCard = ({ item }: { item: CartItem }) => {

	return (
		<Link href={`/products/${item.slug}`}>
			<Card className="w-32 max-w-40 border border-darkBlue flex flex-col items-center">
				<CardHeader>
					<Image
						src={item.image}
						alt={item.name}
						width={100}
						height={100}
					/>
				</CardHeader>
				<CardContent>
					<p>{item.name}</p>
				</CardContent>
				<CardFooter className="grid">
					<AddToCart item={item} size='trash' />
					<AddToWishList item={item} size="move" />
				</CardFooter>
			</Card>
		</Link>
	)
}

export default WishListCard