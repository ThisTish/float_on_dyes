import { auth } from "@/auth"
import { getCart } from "@/lib/actions/cart.actions"
import { redirect } from "next/navigation"
import { Metadata } from "next"
import { ShippingAddress } from "@/types"
import { getUserById } from "@/lib/actions/users.actions"
import ShippingAddressForm from "@/components/cart/ShippingAddressForm"
import CheckoutSteps from "@/components/cart/CheckoutSteps"

export const metadata: Metadata ={
	title: 'Shipping Address'
}
const ShippingAddressPage = async () => {
	const cart = await getCart()
	if(!cart || cart.items.length === 0) redirect('/cart')

	const session = await auth()
	const userId = session?.user.id
	if(!userId) throw new Error ('No user id')

	const user = await getUserById(userId)


	return (

		<div className="mt-40">
		<CheckoutSteps current={1} />
		<ShippingAddressForm address={user.address as ShippingAddress} />
		</div>
	)
}

export default ShippingAddressPage