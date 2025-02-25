import CartTable from "@/components/cart/CartTable"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getCart } from "@/lib/actions/cart.actions"
import { Metadata } from "next"

export const metadata: Metadata = {
	title: "Cart Page"
}


const CartPage = async () => {
	const cart = await getCart()

	return (
		<div className="mt-40 grid lg:grid-cols-4 lg:gap-5">
			<Card className="space-y-5 p-10 overflow-x-auto lg:col-span-3">
				<CardHeader>
					<CardTitle>
						<h1 className="h2-bold">
							Shopping Cart
						</h1>
					</CardTitle>
				</CardHeader>

				<CardContent>
					<CartTable cart={cart} />
				</CardContent>
			</Card>

		</div>
	)
}

export default CartPage