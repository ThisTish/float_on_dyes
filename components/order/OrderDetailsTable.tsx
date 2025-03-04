import { formatCurrency, formatDateTime, formatId } from "@/lib/utils"
import { Order } from "@/types"
import { Card, CardContent } from "../ui/card"
import { Badge } from "../ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import Link from "next/link"
import Image from "next/image"
import { PiTrashDuotone } from "react-icons/pi"

const OrderDetailsTable = ({ order }: { order: Order }) => {


	const { shippingAddress, orderItems, itemsPrice, taxPrice, shippingPrice, totalPrice, paymentMethod, isPaid, isDelivered, id, paidAt, deliveredAt } = order

	return (
		<>
			<h1 className="py-4 text-2xl">Order {formatId(order.id)}</h1>
			<div className="grid md:grid-cols-3 md:gap-5">
				<div className="col-span-2 space-y-3 overflow-x-auto">
					<Card>
						<CardContent className="p-5 gap-5">
							<h2>Payment Method</h2>
							<p>{paymentMethod}</p>
							{isPaid ? (
								<Badge variant={'secondary'}>
									Paid at {formatDateTime(paidAt!).dateTime}
								</Badge>
							) : (
								<Badge variant={'destructive'}>
									Not paid
								</Badge>
							)}
						</CardContent>
					</Card>
					<Card>
						<CardContent className="p-5 gap-5">
							<h2>Shipping Address</h2>
							<p>{shippingAddress.fullName}</p>
							<p>{shippingAddress.streetAddress}</p>
							<p>{shippingAddress.city}, {shippingAddress.zipCode} {shippingAddress.country}</p>
							{isDelivered ? (
								<Badge variant={'secondary'}>
									Paid at {formatDateTime(deliveredAt!).dateTime}
								</Badge>
							) : (
								<Badge variant={'destructive'}>
									Not delivered
								</Badge>
							)}
						</CardContent>
					</Card>
					<Card>
						<CardContent className="p-3 gap-3">
							<h2 className="text-xl pb-4">Order Items</h2>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Item</TableHead>
										<TableHead>Price</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{orderItems.map((item) => (
										<TableRow key={item.slug}>
											<TableCell >
												<Link className="flex" href={`/products/${item.slug}`}>
													<Image src={item.image} alt={item.name} width={50} height={50} />
													<span>{item.name}</span>
												</Link>
											</TableCell>

											<TableCell >
												<span>{item.price}</span>
											</TableCell>
											{/* 
											<TableCell >
												<PiTrashDuotone />
											</TableCell> */}
										</TableRow>
									))}
								</TableBody>
							</Table>
						</CardContent>
					</Card>
					<Card>
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
							<div className="flex justify-between">
								<span>Total</span>
								<span>{formatCurrency(totalPrice)}</span>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</>

	)
}

export default OrderDetailsTable