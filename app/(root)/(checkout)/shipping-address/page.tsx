import { Metadata } from "next"
import ShippingAddressForm from "@/components/cart/ShippingAddressForm"
import BackButton from "@/components/ui/BackButton"

export const metadata: Metadata = {
	title: 'Shipping Address'
}
const ShippingAddressPage = async () => {

	return (

		<div>
			<ShippingAddressForm  />
			<BackButton 
				size="default"
				/>
		</div>
	)
}

export default ShippingAddressPage