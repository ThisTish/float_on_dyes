import { Metadata } from "next"
import PlaceOrderForm from "@/components/order/PlaceOrderForm"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import PriceBreakdown from "@/components/shared/PriceBreakdown"
import Heading from "@/components/ui/Heading"
import AddressCard from "@/components/order/AddressCard"
import PaymentCard from "@/components/order/PaymentCard"
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
				<Card className="p-5 md:col-span-2 overflow-x-auto">
					<CardHeader>
						<CardTitle className="text-xl font-semibold">
							<h2 >Order Items</h2>
						</CardTitle>
					</CardHeader>

					<CardContent >
						<ItemsTable showOptions={false} />
					</CardContent>
				</Card>

				{/* price breakdown */}
				<Card className="p-5 md:col-span-1 md:col-start-1 h-fit">
					<CardHeader>
						<CardTitle className="text-xl font-semibold px-0">
							<h2>Order Total</h2>
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-5">
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