import { Metadata } from "next"
import PlaceOrderForm from "@/components/order/PlaceOrderForm"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import PriceBreakdown from "@/components/shared/PriceBreakdown"
import Heading from "@/components/ui/Heading"
import AddressCard from "@/components/order/AddressCard"
import PaymentCard from "@/components/order/PaymentCard"
import ItemsTable from "@/components/shared/tables/ItemsTable"

export const metadata: Metadata = {
	title: "Place Order"
}

const PlaceOrderPage = async () => {

	return (
		<div>
			<Heading first="Place " second="Order" className="mb-10 justify-center text-darkBlue" />
			<div className="flex flex-col space-y-5 md:grid md:grid-cols-3 md:grid-rows-2 md:gap-5 md:space-y-0">

				{/* items table */}
				<Card className="h-fit overflow-x-auto p-5 md:col-span-2 md:row-span-2">
					<CardHeader>
						<CardTitle className="text-xl font-semibold">
							<h2 >Order Items</h2>
						</CardTitle>
					</CardHeader>

					<CardContent >
						<ItemsTable showOptions={false} />
					</CardContent>
				</Card>
				<div className="space-y-5 md:col-span-1 md:row-start-1">
					{/* shipping address */}
					<AddressCard />

					{/* payment method */}
					<PaymentCard />
					{/* price breakdown */}
					<Card className="h-fit p-5 md:col-span-1 md:col-start-1">
						<CardHeader>
							<CardTitle className="px-0 text-xl font-semibold">
								<h2>Order Total</h2>
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-5">
							<PriceBreakdown />
							<PlaceOrderForm />
						</CardContent>
					</Card>
				</div>
			</div>


		</div>
	)
}

export default PlaceOrderPage