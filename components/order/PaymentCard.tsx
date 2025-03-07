"use client"

import Link from "next/link"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { useCheckout } from "@/context/CheckoutContext"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Badge } from "../ui/badge"
import { formatDateTime } from "@/lib/utils"
import PaymentMethodLabels from "../shared/PaymentMethodLabels"

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
		<Card className="p-5">
			<CardHeader>
				<CardTitle className="text-xl font-semibold px-0">
					<h2>Payment Method</h2>
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-5">
				<p className="flex justify-between pb-5">
					<PaymentMethodLabels method={shippingPayment || 'PayPal'} />
				</p>

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