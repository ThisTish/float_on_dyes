import { auth } from "@/auth"
import CheckoutSteps from "@/components/cart/CheckoutSteps"
import PlaceOrderForm from "@/components/cart/PlaceOrderForm"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { getCart } from "@/lib/actions/cart.actions"
import { getUserById } from "@/lib/actions/users.actions"
import { formatCurrency } from "@/lib/utils"
import { ShippingAddress } from "@/types"
import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"
import { PiTrashDuotone } from "react-icons/pi"

// todo add remove from order/move to wishlist-line90

export const metadata: Metadata = {
	title: "Place Order"
}

const PlaceOrderPage = async () => {

	const cart = await getCart()
	const session = await auth()
	const userId = session?.user.id
	if (!userId) throw new Error('User not found')

	const user = await getUserById(userId)

	if (!cart || cart.items.length === 0) redirect('/cart')
	if (!user.address) redirect('/shipping-address')
	if (!user.paymentMethod) redirect('/payment-method')

	const userAddress = user.address as ShippingAddress



	return (
		<div className="mt-40">
			<CheckoutSteps current={3} />
			<h1 className="py-4 text-2xl">Place Order</h1>
			<div className="grid md:grid-cols-3 md:gap-5">
				<div className="md:col-span-2 overflow-x-auto space-y-3">
					<Card>
						<CardContent className="p-3 gap-3">
							<h2 className="text-xl pb-4">Shipping Address</h2>
							<p>{userAddress.fullName}</p>
							<p>{userAddress.streetAddress}</p>
							<p>{userAddress.city}, {userAddress.zipCode}</p>
							<p>{userAddress.country}</p>
							<Link href='/shipping-address'>
								<Button variant={'outline'}>Edit</Button>
							</Link>
						</CardContent>
					</Card>
					<Card>
						<CardContent className="p-3 gap-3">
							<h2 className="text-xl pb-4">Payment Method</h2>
							<p>{user.paymentMethod}</p>
							<Link href='/payment-method'>
								<Button variant={'outline'}>Edit</Button>
							</Link>
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
									{cart.items.map((item) => (
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

											<TableCell >
												<PiTrashDuotone />
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</CardContent>
					</Card>
				</div>
			</div>

			<Card>
				<CardContent>
					<div className="flex justify-between">
						<span>Items</span>
						<span>{formatCurrency(cart.itemsPrice)}</span>
					</div>
					<div className="flex justify-between">
						<span>Tax</span>
						<span>{formatCurrency(cart.taxPrice)}</span>
					</div>
					<div className="flex justify-between">
						<span>Shipping</span>
						<span>{formatCurrency(cart.shippingPrice)}</span>
					</div>
					<div className="flex justify-between">
						<span>Total</span>
						<span>{formatCurrency(cart.totalPrice)}</span>
					</div>
				</CardContent>
			</Card>

			<PlaceOrderForm />

		</div>
	)
}

export default PlaceOrderPage