"use client"

import Link from "next/link"
import { Button } from "../ui/button"
import { Card, CardContent } from "../ui/card"
import { useCheckout } from "@/context/CheckoutContext"

const AddressCard = () => {
	const { user } = useCheckout()
	const userAddress = user.address

	return (
		<Card>
			<CardContent className="p-3 gap-3">
				<h2 className="text-xl pb-4">Shipping Address</h2>
				{!userAddress ? (
					<p>No shipping address</p>
				) : (
					<>
						<p>{userAddress.fullName}</p>
						<p>{userAddress.streetAddress}</p>
						<p>{userAddress.city}, {userAddress.zipCode}</p>
						<p>{userAddress.country}</p>
					</>
				)}
				<Link href='/shipping-address'>
					<Button variant={'outline'}>Edit</Button>
				</Link>
			</CardContent>
		</Card>
	)
}

export default AddressCard