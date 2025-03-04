import { formatCurrency } from "@/lib/utils"
import { Card, CardContent } from "../ui/card"

type Prices = {
	itemsPrice: number,
	taxPrice: number,
	shippingPrice: number,
	totalPrice: number,
	className?: string
}

const PriceBreakdown = ({ itemsPrice, taxPrice, shippingPrice, totalPrice, className }: Prices) => {
	return (
		<Card className={className}>
			<CardContent>
				<div className="flex justify-between">
					<span>Items</span>
					<span>{formatCurrency(itemsPrice)}</span>
				</div>
				<div className="flex justify-between">
					<span>Tax</span>
					<span>{formatCurrency(taxPrice)}</span>
				</div>
				<div className="flex justify-between">
					<span>Shipping</span>
					<span>{formatCurrency(shippingPrice)}</span>
				</div>
				<div className="flex justify-between font-semibold text-lg">
					<span>Total</span>
					<span>{formatCurrency(totalPrice)}</span>
				</div>
			</CardContent>
		</Card>

	)
}

export default PriceBreakdown