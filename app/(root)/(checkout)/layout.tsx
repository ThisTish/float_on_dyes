import "@/app/globals.css"
import { auth } from "@/auth"
import CheckoutSteps from "@/components/cart/CheckoutSteps"
import { getCart } from "@/lib/actions/cart.actions"
import { getUserById } from "@/lib/actions/users.actions"
import React from "react"
import { CheckoutProvider } from "@/context/CheckoutContext"
import { redirect } from "next/navigation"
import { ShippingAddress } from "@/types"
import { DEFAULT_PAYMENT_METHOD } from "@/lib/constants"


export default async function CheckoutLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	const cart = await getCart() || {
		items: [],
		itemsPrice: '',
		totalPrice: '',
		shippingPrice: '',
		taxPrice: '',
		sessionCartId: '',
		userId: null
	}


	const session = await auth()
	const userId = session?.user.id
	if (!userId) throw new Error('No user id')

	const fetchedUser = await getUserById(userId)
	if (!fetchedUser) redirect('/sign-in')

	const user = {
		paymentMethod: { type: fetchedUser.paymentMethod ?? DEFAULT_PAYMENT_METHOD },
		email: fetchedUser.email,
		address: fetchedUser.address as ShippingAddress,
		isSubscribed: fetchedUser.isSubscribed,
		name: fetchedUser.name
	}


	return (
		<CheckoutProvider user={user} cart={cart ?? {}}>
			<div>
				<CheckoutSteps />
				{children}
			</div>
		</CheckoutProvider>
	)
}
