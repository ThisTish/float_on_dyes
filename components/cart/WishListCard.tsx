import { CartItem } from "@/types"
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card"
import Image from "next/image"
import Link from "next/link"
import AddToCart from "../product/AddToCart"
import AddToWishList from "../product/AddToWishList"

const WishListCard = ({ item }: { item: CartItem }) => {

	return (
		<Card className="w-32 max-w-40 border border-darkBlue flex flex-col items-center">
				<Link href={`/products/${item.slug}`}>
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
		</Link>
				<CardFooter className="grid">
					<AddToCart item={item} size='wishList' />
					<AddToWishList item={item} size="wishList" />
				</CardFooter>
			</Card>
	)
}

export default WishListCard