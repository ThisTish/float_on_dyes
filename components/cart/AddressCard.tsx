"use client"

import Link from "next/link"
import { Button } from "../ui/button"
import { Card, CardContent } from "../ui/card"
import { useCheckout } from "@/context/CheckoutContext"
import { Order, ShippingAddress } from "@/types"
import { useEffect, useState } from "react"
import { Badge } from "../ui/badge"
import { formatDateTime } from "@/lib/utils"

const AddressCard = ({ address, isDelivered, deliveredAt }: { address?: ShippingAddress, isDelivered?: boolean, deliveredAt?: Date }) => {
	const [shippingAddress, setShippingAddress] = useState({ ...address } as ShippingAddress)
	const { user } = useCheckout()

	useEffect(() => {
		if (!address) {
			setShippingAddress(user.address)
		}
	}, [])

	return (
		<Card>
			<CardContent className="p-3 gap-3">
				<h2 className="text-xl pb-4">Shipping Address</h2>
				{!shippingAddress ? (
					<p>No shipping address</p>
				) : (
					<>
						<p>{shippingAddress.fullName}</p>
						<p>{shippingAddress.streetAddress}</p>
						<p>{shippingAddress.city}, {shippingAddress.zipCode}</p>
						<p>{shippingAddress.country}</p>
					</>
				)}
				{!address ? (
					<Link href='/shipping-address'>
						<Button variant={'outline'}>Edit</Button>
					</Link>
				): address && isDelivered ? (
					<Badge variant={'outline'}>
					Delivered {formatDateTime(deliveredAt!).dateTime}
				</Badge>
			) : (
				<Badge variant={'destructive'}>
					Not delivered
				</Badge>
				)}
			</CardContent>
		</Card>
	)
}

export default AddressCard