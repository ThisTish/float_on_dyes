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
import { BsFillCartCheckFill } from "react-icons/bs"
import { PiSpinnerBallDuotone } from "react-icons/pi"
import { useToast } from "@/hooks/use-toast"

const PlaceOrderForm = () => {
	const { cart, user } = useCheckout()
	const router = useRouter()
	const { toast } = useToast()

	useEffect(() => {
		if (!user.address) {
			router.push('/shipping-address');
		}
	}, [user.address, router]);

	const PlaceOrderButton = () => {
		const { pending } = useFormStatus()
		return (
			<Button variant={'cta'} type={'submit'} disabled={pending} >
				{pending ? 'Placing Order' : 'Place Order'}
				{pending ? (
					<PiSpinnerBallDuotone className="animate-spin" />
				) : (

					<AnimatedDiv variant={'cta'} animation={'ping'}><BsFillCartCheckFill /></AnimatedDiv>
				)}
			</Button>
		)
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		const res = await createOrder()

		if(!res.success){
			toast({
				title: 'Error',
				description: res.message || 'Something went wrong',
				variant: 'destructive'
			})
		}

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