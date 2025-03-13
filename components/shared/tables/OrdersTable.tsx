import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { formatId, formatDateTime, formatCurrency } from "@/lib/utils"
import { Order } from "@/types"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import DeleteDialog from "../dialogs/DeleteDialog"
import { deleteOrder } from "@/lib/actions/order.actions"

const OrdersTable = ({ orders, role }: { orders: Order[], role: 'admin' | 'user' }) => {


	return (
		<div className="overflow-x-auto">
			<Table>
				<TableHeader>
					<TableRow className="text-muted hover:bg-transparent">
						<TableHead>Id</TableHead>
						<TableHead>Date</TableHead>
						<TableHead>Total</TableHead>
						<TableHead>Paid</TableHead>
						<TableHead>Delivered</TableHead>
						<TableHead>Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{orders.map((order) => (
						<TableRow key={order.id}>
							<TableCell>{formatId(order.id)}</TableCell>
							<TableCell>{formatDateTime(order.createdAt).dateOnly}</TableCell>
							<TableCell>{formatCurrency(order.totalPrice)}</TableCell>
							<TableCell>
								{order.isPaid && order.paidAt ? formatDateTime(order.paidAt).dateOnly : (
									<Badge variant={'destructive'}>Not paid</Badge>
								)}
							</TableCell>
							<TableCell>
								{order.isDelivered && order.deliveredAt ? formatDateTime(order.deliveredAt).dateOnly : (
									<Badge variant={'destructive'} >Not Delivered</Badge>

								)}
							</TableCell>
							<TableCell className="flex flex-col md:flex-row gap-1">
								<Link href={`/order/${order.id}`} className="border text-xs">
									<span className="px-2">Details</span>
								</Link>
								{role === 'admin' ? (
									<DeleteDialog id={order.id} action={deleteOrder} />
								) : null}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>

		</div>
	)
}

export default OrdersTable