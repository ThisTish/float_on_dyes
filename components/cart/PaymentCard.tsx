"use client"

import Link from "next/link"
import { Button } from "../ui/button"
import { Card, CardContent } from "../ui/card"
import { useCheckout } from "@/context/CheckoutContext"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Badge } from "../ui/badge"
import { formatDateTime } from "@/lib/utils"

const PaymentCard = ({ payment, isPaid, paidAt }: { payment?: string, isPaid?: boolean, paidAt?: Date }) => {
	const [shippingPayment, setShippingPayment] = useState(payment)

	useEffect(() => {
		if (!payment) {
			setShippingPayment(user.paymentMethod.type)
		}
	}, [])

	const { user } = useCheckout()
	const router = useRouter()

	if (!user.paymentMethod.type && !payment) router.push('/payment-method')

	return (
		<Card>
			<CardContent className="p-3 gap-3">
				<h2 className="text-xl pb-4">Payment Method</h2>
				<p>{shippingPayment}</p>

				{!payment ? (
					<Link href='/payment-method'>
						<Button variant={'outline'}>Edit</Button>
					</Link>
				) : payment && isPaid ? (
					<Badge variant={'outline'}>
						Paid on {formatDateTime(paidAt!).dateTime}
					</Badge>
				) : (
					<Badge variant={'destructive'}>
						Not Paid
					</Badge>
				)}


			</CardContent>
		</Card>
	)
}

export default PaymentCard