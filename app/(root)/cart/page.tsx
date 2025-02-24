import CartTable from "@/components/cart/CartTable"
import { getCart } from "@/lib/actions/cart.actions"
import { Metadata } from "next"

export const metadata: Metadata = {
	title: "Cart Page"
}


const CartPage = async () => {
	const cart = await getCart()

	return (
		<div className="mt-40">
			<h1 className="py-4 h2-bold">
				Shopping Cart
			</h1>
			<CartTable cart={cart} />
		</div>
	)
}

export default CartPage