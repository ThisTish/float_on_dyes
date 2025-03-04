import OrderDetailsTable from "@/components/order/OrderDetailsTable"
import { getOrderById } from "@/lib/actions/order.actions"
import { ShippingAddress } from "@/types"
import { Metadata } from "next"
import { notFound } from "next/navigation"

export const metadata: Metadata = {
	title: "Order Details"
}

const OrderPage = async (props: {params: Promise<{id: string}>}) => {
	const {id} = await props.params

	const order = await getOrderById(id)
	if(!order) notFound()

	return (
		<div className="mt-40">
			<OrderDetailsTable order={{...order, shippingAddress: order.shippingAddress as ShippingAddress}} />
		</div>
	)
}

export default OrderPage