import PaymentMethodForm from "@/components/cart/PaymentMethodForm"
import { Metadata } from "next"

export const metadata: Metadata = {
	title: "Payment Method",
}

const PaymentMethodPage = async () => {

	return (
		<div>
			<PaymentMethodForm />
		</div>
	)
}

export default PaymentMethodPage