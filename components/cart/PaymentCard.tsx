"use client"

import Link from "next/link"
import { Button } from "../ui/button"
import { Card, CardContent } from "../ui/card"
import { useCheckout } from "@/context/CheckoutContext"
import { useRouter } from "next/navigation"

const PaymentCard = () => {
	const { user } = useCheckout()
	const router = useRouter()

	if (!user.paymentMethod.type) router.push('/payment-method')

	return (
		<Card>
			<CardContent className="p-3 gap-3">
				<h2 className="text-xl pb-4">Payment Method</h2>
				<p>{user.paymentMethod.type}</p>
				<Link href='/payment-method'>
					<Button variant={'outline'}>Edit</Button>
				</Link>
			</CardContent>
		</Card>
	)
}

export default PaymentCard