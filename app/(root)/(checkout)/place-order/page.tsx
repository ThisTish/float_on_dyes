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
		<div>
			<Heading first="Place " second="Order" className="mb-10" />
			<div className="grid grid-rows-4 md:grid-rows-2 md:grid-cols-3 md:gap-5 space-y-5 md:space-y-0">
					{/* items table */}
					<Card className="md:col-span-2 overflow-x-auto space-y-5">
						<CardContent className="p-5 space-y-5">
							<h2 className="text-xl pb-4">Order Items</h2>
							<ItemsTable showOptions={false} />
						</CardContent>
					</Card>

					{/* price breakdown */}
					<Card className="row-start-2 md:col-span-1 md:col-start-1">
						<CardContent className="p-5 space-y-5">
							<PriceBreakdown />
							<PlaceOrderForm />
						</CardContent>
					</Card>

				<div className="row-start-2 md:row-start-1 md:col-span-1 space-y-5">
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