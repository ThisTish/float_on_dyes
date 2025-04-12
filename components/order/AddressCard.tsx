"use client"

import Link from "next/link"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { useCheckout } from "@/context/CheckoutContext"
import { ShippingAddress } from "@/types"
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
		<Card className="p-5">
			<CardHeader>
				<CardTitle className="px-0 text-xl font-semibold">
					<h2 >Shipping Address</h2>
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-5">
				{!shippingAddress ? (
					<p>No shipping address</p>
				) : (
					<div className="space-y-0 pb-5">
						<p className="pb-1 text-lg">{shippingAddress.fullName}</p>
						<p>{shippingAddress.streetAddress}</p>
						<p>{shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipCode}</p>
						<p>{shippingAddress.country}</p>
					</div>
				)}
				{!address ? (
					<Link href='/shipping-address'>
						<Button variant={'outline'}>Edit</Button>
					</Link>
				) : address && isDelivered ? (
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