"use client"

import { createOrder } from "@/lib/actions/order.actions"
import { useRouter } from "next/navigation"
import { useFormStatus } from "react-dom"
import { Button } from "../ui/button"
import React from "react"

const PlaceOrderForm = () => {
	const router = useRouter()

	const PlaceOrderButton = () =>{
		const { pending } = useFormStatus()
		return (
			<Button variant={'cta'} type={'submit'} disabled={pending}>
				{pending ? 'Placing Order ...' : 'Place Order'}
			</Button>
		)
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		const res = await createOrder()
		if(res.redirectTo){
			router.push(res.redirectTo)
		}
	}

	return (
		<form onSubmit={handleSubmit} className="w-full">
			<PlaceOrderButton />
		</form>

	)
}

export default PlaceOrderForm