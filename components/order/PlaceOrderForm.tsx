"use client"

import { createOrder } from "@/lib/actions/order.actions"
import { useRouter } from "next/navigation"
import { useFormStatus } from "react-dom"
import { Button } from "../ui/button"
import React, { useEffect } from "react"
import { useCheckout } from "@/context/CheckoutContext"
import Link from "next/link"
import { AnimatedDiv } from "../ui/AnimatedDiv"
import { ArrowUpRight } from "lucide-react"

const PlaceOrderForm = () => {
	const { cart, user } = useCheckout()
	const router = useRouter()
	
	useEffect(() => {
		if (!user.address) {
			router.push('/shipping-address');
		}
	}, [user.address, router]);

	const PlaceOrderButton = () => {
		const { pending } = useFormStatus()
		return (
			<Button variant={'cta'} type={'submit'} disabled={pending} >
				{pending ? 'Placing Order ...' : 'Place Order'}
			</Button>
		)
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		const res = await createOrder()
		if (res.redirectTo) {
			router.push(res.redirectTo)
		}
	}

	return (
	<>
		{!cart || cart.items.length === 0 ? (
			<Button
				variant={"cta"}
				asChild
			>
				<Link href="/shop">
					Go to Shop
					<AnimatedDiv variant={'cta'} animation={'rotate'}>
						<ArrowUpRight />
					</AnimatedDiv>
				</Link>
			</Button>
		) : (
			<form onSubmit={handleSubmit} className="w-full text-end">
				<PlaceOrderButton />
			</form>
		)}
	</>

	)
}

export default PlaceOrderForm