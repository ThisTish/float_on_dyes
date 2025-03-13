import page from "@/app/(root)/page"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { formatId, formatDateTime, formatCurrency } from "@/lib/utils"
import Pagination from "../lists/Pagination"
import { Order } from "@/types"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

const OrdersTable = ({ orders, totalPages }: { orders: Order[], totalPages: number }) => {
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
									<Badge variant={'destructive'}>Not Delivered</Badge>

								)}
							</TableCell>
							<TableCell>
								<Link href={`/order/${order.id}`} className="border text-xs">
									<span className="px-2">Details</span>
								</Link>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		
		</div>
	)
}

export default OrdersTable