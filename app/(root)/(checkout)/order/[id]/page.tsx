import { auth } from "@/auth"
import AddressCard from "@/components/order/AddressCard"
import PaymentCard from "@/components/order/PaymentCard"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { getOrderById } from "@/lib/actions/order.actions"
import { formatCurrency, formatDateTime, formatId } from "@/lib/utils"
import { ShippingAddress } from "@/types"
import { Metadata } from "next"
import Image from "next/image"
import { notFound, redirect } from "next/navigation"

export const metadata: Metadata = {
	title: "Order Details"
}

const OrderPage = async (props: { params: Promise<{ id: string }> }) => {
	const session = await auth()
	const { id } = await props.params

	const order = await getOrderById(id)
	if (order.userId !== session?.user.id && session?.user.role !== 'admin') return redirect('/unauthorized')

	return (
		<div>
			<h1 className="text-darkBlue text-center mb-10">
				<span className="text-4xl font-bold md:text-5xl lg:text-6xl">Order</span>
				<span className="text-2xl font-light md:text-3xl lg:text-4xl">{formatId(order.id)}</span>
			</h1>

			<div className="grid md:grid-cols-3 md:gap-5">
				<div className="md:col-span-1 space-y-5">
					{/* shipping address */}
					<AddressCard address={order.shippingAddress as ShippingAddress} isDelivered={order.isDelivered} deliveredAt={order.deliveredAt as Date} />

					{/* payment method */}
					<PaymentCard payment={order.paymentMethod} isPaid={order.isPaid} paidAt={order.paidAt as Date} />
				</div>

				{/* order items */}
				<div className="mt-5 md:mt-0 md:col-span-2 overflow-x-auto space-y-5">
					<Card className="p-5">
						<CardHeader>
							<CardTitle className="text-xl font-semibold">
								<h2 >Order Items</h2>
								<span className="text-muted text-base font-medium">Placed: {formatDateTime(order.createdAt).dateTime}</span>
							</CardTitle>
						</CardHeader>

						<CardContent>
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
											<TableCell className="flex flex-col py-3 md:flex-row md:items-center gap-3">
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

						{/* order totals */}
						<CardFooter className="grid grid-cols-1 gap-1 md:px-10 text-sm md:text-base pb-5 border-t w-1/2 ml-auto mr-5">
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
		</div>
	)
}

export default OrderPage