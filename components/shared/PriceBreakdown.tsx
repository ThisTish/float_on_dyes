"use client"
import { useCheckout } from "@/context/CheckoutContext"
import { formatCurrency } from "@/lib/utils"
import { Cart } from "@/types"

const PriceBreakdown = ({ cart, className }: { cart?: Cart, className?: string }) => {
	if (!cart) cart = useCheckout().cart as unknown as Cart
	const { items, itemsPrice, taxPrice, shippingPrice, totalPrice } = cart


	return (
		<>
			{items.length === 0 ? <p>Your shopping cart is empty</p> : (
				<>
					<div className="flex justify-between">
						<p>
							<span>Items </span>
							<span>({items.length})</span>
						</p>
						<span>{formatCurrency(itemsPrice.toString())}</span>
					</div>
					<div className="flex justify-between">
						<span>Tax</span>
						<span>{formatCurrency(taxPrice.toString())}</span>
					</div>
					<div className="flex justify-between">
						<span>Shipping</span>
						<span>{formatCurrency(shippingPrice.toString())}</span>
					</div>
					<div className="flex justify-between font-semibold text-lg">
						<span>Total</span>
						<span>{formatCurrency(totalPrice.toString())}</span>
					</div>
				</>
			)}
		</>

	)
}

export default PriceBreakdown