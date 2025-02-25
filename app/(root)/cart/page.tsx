import { auth } from "@/auth"
import CartTable from "@/components/cart/CartTable"
import SubTotalCard from "@/components/cart/SutbTotalCard"
import WishListTable from "@/components/cart/WishListTable"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
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

	const wishList = await getWishList(userId ?? undefined )

	return (
		<div className="mt-40 grid lg:grid-cols-4 lg:gap-5">
			<CartTable cart={cart} />
			{cart ?
				<SubTotalCard cart={cart} />
				: null
			}
			{wishList ? (
				<WishListTable wishList={wishList} />
			): null}
		</div>
	)
}

export default CartPage