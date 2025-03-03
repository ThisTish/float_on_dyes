import { auth } from "@/auth"
import CheckoutSteps from "@/components/cart/CheckoutSteps"
import PaymentMethodForm from "@/components/cart/PaymentMethodForm"
import { getUserById } from "@/lib/actions/users.actions"
import { Metadata } from "next"

export const metadata: Metadata = {
	title: "Payment Method",
}


const PaymentMethodPage = async () => {
	const session = await auth()
	const userId = session?.user?.id

	if (!userId) throw new Error("User not found")
	const user = await getUserById(userId)


	return (
		<div className="mt-40">
			<CheckoutSteps current={2} />

			<PaymentMethodForm preferredPaymentMethod={user.paymentMethod} />
		</div>
	)
}

export default PaymentMethodPage