import { CartItem } from "@/types"
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card"
import Image from "next/image"
import Link from "next/link"
import AddToCart from "../product/AddToCart"
import AddToWishList from "../product/AddToWishList"
import ProductPrice from "../product/ProductPrice"

const WishListCard = ({ item }: { item: CartItem }) => {

	return (
		<Card className="w-32 max-w-40 border transition border-darkBlue flex flex-col items-center">
				<Link href={`/products/${item.slug}`}>
				<CardHeader className="p-0">
					<Image
						src={item.image}
						alt={item.name}
						width={150}
						height={100}
					/>
				</CardHeader>
				<CardContent className="p-1">
					<span className="text-lg font-semibold">{item.name}</span>
					<ProductPrice value={Number(item.price)} className="font-extralight" size={'sm'} />
				</CardContent>
		</Link>
				<CardFooter className="grid w-full">
					<AddToCart item={item} size='wishList' />
					<AddToWishList item={item} size="wishList" />
				</CardFooter>
			</Card>
	)
}

export default WishListCard