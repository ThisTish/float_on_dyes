import { auth } from "@/auth"
import CartItemsSection from "@/components/cart/CartItemsSection"
import SubTotalCard from "@/components/cart/SutbTotalCard"
import WishListSection from "@/components/cart/WishListSection"
import Heading from "@/components/shared/Heading"
import BackButton from "@/components/ui/BackButton"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getCart } from "@/lib/actions/cart.actions"
import { getWishList } from "@/lib/actions/wishList.actions"
import { Metadata } from "next"

export const metadata: Metadata = {
	title: "Cart Page"
}


const CartPage = async () => {
	const session = await auth()
	const userId = session?.user.id

	const cart = await getCart(userId)

	const wishList = await getWishList(userId ?? undefined)

	return (
		<div className="grid lg:grid-cols-4 lg:gap-5">
			<div className="mb-5 lg:mb-0 lg:col-span-4">
				<BackButton size={'sm'} />
			</div>

			{/* cart items table */}
			<Card className="space-y-5 p-10 overflow-x-auto lg:col-span-3">
				<CardHeader>
					<CardTitle>
						<h2 className="h3-bold">Shopping Cart</h2>
					</CardTitle>
				</CardHeader>

				<CardContent>
					<CartItemsSection cart={cart} />
				</CardContent>
			</Card>

			{cart ?
				<SubTotalCard cart={cart} />
				: null
			}
			{wishList ? (
				<WishListSection wishList={wishList} />
			) : null}
		</div>
	)
}

export default CartPage