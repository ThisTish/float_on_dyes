import RevenueChart from "@/components/admin/RevenueChart"
import SummaryCard from "@/components/admin/SummaryCard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Heading from "@/components/ui/Heading"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { getOrderSummary } from "@/lib/actions/order.actions"
import { formatCurrency, formatDateTime, formatNumber } from "@/lib/utils"
import { BadgeDollarSign, Barcode, CreditCard, Users } from "lucide-react"
import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
	title: "Dashboard"
}

const DashboardPage = async () => {
	const summary = await getOrderSummary()

	const summaryList = [
		{
			title: "Total Revenue",
			icon: <BadgeDollarSign />,
			value: formatCurrency(summary.totalSales._sum.totalPrice?.toString() || 0)
		},
		{
			title: "Sales",
			icon: <CreditCard />,
			value: formatNumber(summary.ordersCount)
		},
		{
			title: "Customers",
			icon: <Users />,
			value: formatNumber(summary.usersCount)
		},
		{
			title: "Products",
			icon: <Barcode />,
			value: formatNumber(summary.productsCount)
		}
	]

	return (
		<div className="space-y-3">
			<Heading first="Admin" second="Dashboard" />
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
			
		{summaryList.map((item) => (
			<SummaryCard
				key={item.title}
				title={item.title}
				icon={item.icon}
				value={item.value}
				/>
		))}

			</div>
			<div className="grid gap-5 md:grid-cols-2 lg:grid-cols-7">
				
				{/* revenue chart */}
				<Card className="col-span-4 overflow-x-auto p-5">
					<CardHeader>
						<CardTitle>
							Revenue
						</CardTitle>
					</CardHeader>
					<CardContent>
						<RevenueChart data={{ salesData: summary.salesData }} />
					</CardContent>
				</Card>

				{/* sales chart */}
				<Card className="col-span-3 overflow-x-auto p-5">
					<CardHeader>
						<CardTitle>
							Recent Sales
						</CardTitle>
					</CardHeader>
					<CardContent>
						<Table>
							<TableHeader>
									<TableHead>BUYER</TableHead>
									<TableHead>DATE</TableHead>
									<TableHead>TOTAL</TableHead>
									<TableHead className="text-end">ACTIONS</TableHead>
							</TableHeader>
							<TableBody>
								{summary.latestOrders.map((order) => (
									<TableRow key={order.id}>
										<TableCell>{order.user.name ?? "Deleted User"}</TableCell>
										<TableCell>{formatDateTime(order.createdAt).dateNumber}</TableCell>
										<TableCell>{formatCurrency(order.totalPrice)}</TableCell>
										<TableCell className="text-end">
											<Link href={`/order/${order.id}`}>Details</Link>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</CardContent>
				</Card>
			</div>
		</div>
	)
}

export default DashboardPage