import { Metadata } from "next"
import PlaceOrderForm from "@/components/order/PlaceOrderForm"
import { Card, CardContent } from "@/components/ui/card"
import PriceBreakdown from "@/components/shared/PriceBreakdown"
import Heading from "@/components/shared/Heading"
import AddressCard from "@/components/cart/AddressCard"
import PaymentCard from "@/components/cart/PaymentCard"
import ItemsTable from "@/components/shared/ItemsTable"

export const metadata: Metadata = {
	title: "Place Order"
}

const PlaceOrderPage = async () => {

	return (
		<div className="mt-40">
			<Heading first="Place " second="Order" />
			<div className="grid md:grid-cols-3 md:gap-5">
				<div className="md:col-span-2 overflow-x-auto space-y-5">
					{/* order items make reusable component */}
					<Card>
						<CardContent className="p-5 space-y-5">
							<h2 className="text-xl pb-4">Order Items</h2>
							<ItemsTable showOptions={false} />
						</CardContent>
					</Card>
					<Card >
						<CardContent className="p-5 space-y-5">
							<PriceBreakdown />
							<PlaceOrderForm />
						</CardContent>
					</Card>
				</div>

				<div className="md:col-span-1 space-y-5">
					{/* shipping address */}
					<AddressCard />

					{/* payment method */}
					<PaymentCard />
				</div>
			</div>
		</div>
	)
}

export default PlaceOrderPage