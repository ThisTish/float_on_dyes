import { auth } from "@/auth"
import CartTable from "@/components/cart/CartTable"
import SubTotalCard from "@/components/cart/SutbTotalCard"
import WishListSection from "@/components/cart/WishListSection"
import BackButton from "@/components/ui/BackButton"
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
		<div className="relative mt-48 grid lg:grid-cols-4 lg:gap-5">
			<div className="absolute -top-14 left-0 w-40">
				<BackButton size={'sm'} />

			</div>
			<CartTable cart={cart} />
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