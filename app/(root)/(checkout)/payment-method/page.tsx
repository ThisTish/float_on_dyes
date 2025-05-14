import PaymentMethodForm from "@/components/cart/PaymentMethodForm"
import BackButton from "@/components/ui/BackButton"
import { Metadata } from "next"

export const metadata: Metadata = {
	title: "Payment Method",
}

const PaymentMethodPage = async () => {

	return (
		<div>
			<PaymentMethodForm />
			<BackButton 
				size="default"
				/>
		</div>
	)
}

export default PaymentMethodPage