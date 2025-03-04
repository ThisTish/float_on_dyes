import { getOrderById } from "@/lib/actions/order.actions"
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
			{order.orderItems.map((item) => (
				<span key={id}>{item.name}</span>
			))}
		<p>{order.totalPrice.toString()}</p>
		</div>
	)
}

export default OrderPage