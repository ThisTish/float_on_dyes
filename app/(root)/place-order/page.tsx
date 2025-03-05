import { auth } from "@/auth"
import { getCart } from "@/lib/actions/cart.actions"
import { getUserById } from "@/lib/actions/users.actions"
import { formatCurrency } from "@/lib/utils"
import { ShippingAddress } from "@/types"
import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"
import CheckoutSteps from "@/components/cart/CheckoutSteps"
import PlaceOrderForm from "@/components/order/PlaceOrderForm"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PiTrashDuotone } from "react-icons/pi"
import PriceBreakdown from "@/components/shared/PriceBreakdown"
import Heading from "@/components/shared/Heading"

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
			<Heading first="Place " second="Order" />
			<div className="grid md:grid-cols-3 md:gap-5">
				<div className="md:col-span-2 overflow-x-auto space-y-3">
					{/* shipping address */}
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
					{/* payment method */}
					<Card>
						<CardContent className="p-3 gap-3">
							<h2 className="text-xl pb-4">Payment Method</h2>
							<p>{user.paymentMethod}</p>
							<Link href='/payment-method'>
								<Button variant={'outline'}>Edit</Button>
							</Link>
						</CardContent>
					</Card>
					{/* order items make reusable component */}
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

			<div>
				<PriceBreakdown className="mt-5"
					itemsPrice={Number(cart.itemsPrice)}
					taxPrice={Number(cart.taxPrice)}
					shippingPrice={Number(cart.shippingPrice)}
					totalPrice={Number(cart.totalPrice)}
					qty={cart.items.reduce((a, c) => a + c.qty, 0)}
				/>
				<PlaceOrderForm />

			</div>

		</div>
	)
}

export default PlaceOrderPage