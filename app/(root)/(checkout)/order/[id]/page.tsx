import AddressCard from "@/components/cart/AddressCard"
import PaymentCard from "@/components/cart/PaymentCard"
import Heading from "@/components/shared/Heading"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { getOrderById } from "@/lib/actions/order.actions"
import { formatCurrency, formatId } from "@/lib/utils"
import { ShippingAddress } from "@/types"
import { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"

export const metadata: Metadata = {
	title: "Order Details"
}

const OrderPage = async (props: { params: Promise<{ id: string }> }) => {
	const { id } = await props.params

	const order = await getOrderById(id)
	if (!order) notFound()

	return (
		<div>
			<Heading className="flex flex-col-reverse mb-10" first={`${formatId(order.id)}`} second="Order:" />
			<div className="grid md:grid-cols-3 md:gap-5">
				<div className="md:col-span-1 space-y-5">
					{/* shipping address */}
					<AddressCard address={order.shippingAddress as ShippingAddress} isDelivered={order.isDelivered} deliveredAt={order.deliveredAt as Date} />

					{/* payment method */}
					<PaymentCard payment={order.paymentMethod} isPaid={order.isPaid} paidAt={order.paidAt as Date} />
				</div>
				<div className="md:col-span-2 overflow-x-auto space-y-5">
					{/* order items */}
					<Card>
						<CardContent className="p-5 space-y-5">
							<h2 className="text-xl pb-4">Order Items</h2>
							<Table className="text-lg">
								<TableHeader>
									<TableRow>
										<TableHead>Item</TableHead>
										<TableHead>Price</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{order.orderItems.map((item) => (
										<TableRow key={item.slug}>
											<TableCell className="flex items-center gap-3">
												<Image
													src={item.image}
													alt={item.name}
													width={100}
													height={100} />
												<span>{item.name}</span>
											</TableCell>

											<TableCell>
												<span>{formatCurrency(item.price)}</span>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</CardContent>
						<CardFooter className="grid grid-cols-1 gap-1 px-10 text-base pb-5 border-t w-1/2 ml-auto mr-5">
							<div className="flex justify-between">
								<span>Items ({order.orderItems.length})</span>
								<span>{formatCurrency(order.itemsPrice)}</span>
							</div>
							<div className="flex justify-between text-sm font-light">
								<span>Tax</span>
								<span>{formatCurrency(order.taxPrice)}</span>
							</div>
							<div className="flex justify-between text-sm font-light">
								<span>Shipping</span>
								<span>{formatCurrency(order.shippingPrice)}</span>
							</div>
							<div className="flex justify-between text-lg font-semibold">
								<span>Total</span>
								<span>{formatCurrency(order.totalPrice)}</span>
							</div>
						</CardFooter>
					</Card>
				</div>
			</div>
			{/* <OrderDetailsTable order={{...order, shippingAddress: order.shippingAddress as ShippingAddress}} /> */}
		</div>
	)
}

export default OrderPage