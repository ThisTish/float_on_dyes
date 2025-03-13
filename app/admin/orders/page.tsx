import Pagination from "@/components/shared/lists/Pagination"
import OrdersTable from "@/components/shared/tables/OrdersTable"
import Heading from "@/components/ui/Heading"
import { getAllOrders } from "@/lib/actions/order.actions"
import { Order } from "@/types"
import { Metadata } from "next"

export const metadata: Metadata = {
	title: 'Admin Orders'
}

//  todo  test that user cannot access page again. 

const AdminOrdersPage = async (props: { searchParams: Promise<{ page: string }> }) => {
	const { page = 1 } = await props.searchParams

	const orders = await getAllOrders({ page: Number(page) })

	return (
		<div className="space-y-5">
			<Heading first="All " second="Orders" />

			<OrdersTable orders={orders.data as Order[]} totalPages={orders.totalPages} />

			{orders.totalPages > 1 ? (
				<Pagination page={Number(page) || '1'} totalPages={orders.totalPages} urlParamName="page" />
			) : null}
		</div>
	)
}

export default AdminOrdersPage