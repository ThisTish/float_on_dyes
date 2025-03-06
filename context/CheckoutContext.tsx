"use client" // Context must be a Client Component

import { createContext, useContext } from "react"
import { Cart, CheckOutUser } from "@/types"

type CheckoutContextType = {
	user: CheckOutUser
	cart: Cart
}

const CheckoutContext = createContext<CheckoutContextType | null>(null)

export const CheckoutProvider = ({
	user,
	cart,
	children,
}: CheckoutContextType & { children: React.ReactNode }) => {
	return (
		<CheckoutContext.Provider value={{ user, cart }}>
			{children}
		</CheckoutContext.Provider>
	)
}

export const useCheckout = () => {
	const context = useContext(CheckoutContext)
	if (!context) throw new Error("useCheckout must be used inside a CheckoutProvider")
	return context
}
