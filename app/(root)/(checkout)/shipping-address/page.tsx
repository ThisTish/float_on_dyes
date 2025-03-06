import { Metadata } from "next"
import ShippingAddressForm from "@/components/cart/ShippingAddressForm"

export const metadata: Metadata = {
	title: 'Shipping Address'
}
const ShippingAddressPage = async () => {

	return (

		<div>
			<ShippingAddressForm  />
		</div>
	)
}

export default ShippingAddressPage