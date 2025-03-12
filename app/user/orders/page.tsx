import Pagination from "@/components/shared/lists/Pagination"
import { AnimatedDiv } from "@/components/ui/AnimatedDiv"
import { Button } from "@/components/ui/button"
import Heading from "@/components/ui/Heading"
import SearchButton from "@/components/ui/SearchButton"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { getUserOrders } from "@/lib/actions/order.actions"
import { formatCurrency, formatDateTime, formatId } from "@/lib/utils"
import { ArrowUpRight } from "lucide-react"
import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
	title: 'Orders',
}

const UserOrdersPage = async (props: {
	searchParams: Promise<{
		page: string
	}>
}) => {

	const { page } = await props.searchParams
	const orders = await getUserOrders({ page: Number(page) || 1 })

	return (
		<div className="space-y-3">
			<Heading first="Your" second="Orders" />

			{orders.data.length === 0 ? (
				<div className="flex flex-col gap-8 justify-between items-center max-w-md mx-auto backdrop-blur-md bg-card shadow-sm">
					<p className="text-center text-lg pt-5 py-3">You have not placed any orders yet</p>
					<Button
						variant={"cta"}
						asChild
					>
						<Link href="/shop">
							Go to Shop
							<AnimatedDiv variant={'cta'} animation={'rotate'}>
								<ArrowUpRight />
							</AnimatedDiv>
						</Link>
					</Button>
					<div className="self-start sm:w-2/3 mx-auto pb-10">
						<p className="text-center">or search for something</p>
						<SearchButton />
					</div>
				</div>
			) :

				<div className="overflow-x-auto">
					<Table>
						<TableHeader>
							<TableRow className="text-muted">
								<TableHead>Id</TableHead>
								<TableHead>Date</TableHead>
								<TableHead>Total</TableHead>
								<TableHead>Paid</TableHead>
								<TableHead>Delivered</TableHead>
								<TableHead>Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{orders.data.map((order) => (
								<TableRow key={order.id}>
									<TableCell>{formatId(order.id)}</TableCell>
									<TableCell>{formatDateTime(order.createdAt).dateTime}</TableCell>
									<TableCell>{formatCurrency(order.totalPrice)}</TableCell>
									<TableCell>
										{order.isPaid && order.paidAt ? formatDateTime(order.paidAt).dateOnly : 'Not Paid'}
									</TableCell>
									<TableCell>
										{order.isDelivered && order.deliveredAt ? formatDateTime(order.deliveredAt).dateOnly : 'Not Delivered'}
									</TableCell>
									<TableCell>
										<Link href={`/order/${order.id}`}>
											<span className="px-2">Details</span>
										</Link>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
					{orders.totalPages > 1 ? (
						<Pagination page={Number(page) || '1'} totalPages={orders.totalPages} urlParamName="page" />
					) : null}
				</div>
			}

		</div>
	)
}

export default UserOrdersPage