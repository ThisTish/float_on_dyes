import { auth } from "@/auth"
import RevenueChart from "@/components/admin/RevenueChart"
import Header from "@/components/header/Header"
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

const OverviewPage = async () => {
	const session = await auth()
	if(session?.user.role !== 'admin') throw new Error("Unauthorized")

		const summary = await getOrderSummary()
		// console.log(summary)

	return (
		<div className="space-y-3">
		<Heading first="Admin" second="Dashboard" />
		<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
			<Card>
				<CardHeader>
					<CardTitle>
						Total Revenue
						<BadgeDollarSign />
					</CardTitle>
					<CardContent>
						<div>
							{formatCurrency(summary.totalSales._sum.totalPrice?.toString() || 0)}
						</div>
					</CardContent>
				</CardHeader>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>
						Sales
						<CreditCard />
					</CardTitle>
					<CardContent>
						<div>
							{formatNumber(summary.ordersCount)}
						</div>
					</CardContent>
				</CardHeader>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>
						Customers
						<Users />
					</CardTitle>
					<CardContent>
						<div>
							{formatNumber(summary.usersCount)}
						</div>
					</CardContent>
				</CardHeader>
			</Card>
			<Card>
				<CardHeader>
					<CardTitle>
						Products
						<Barcode />
					</CardTitle>
					<CardContent>
						<div>
							{formatNumber(summary.productsCount)}
						</div>
					</CardContent>
				</CardHeader>
			</Card>
			</div>		
			<div className="grid gap-5 md:grid-cols-2 lg:grid-cols-7">
				<Card className="col-span-4">
					<CardHeader>
						<CardTitle>
							Revenue
						</CardTitle>
					</CardHeader>
					<CardContent>
						<RevenueChart data={{salesData: summary.salesData}} />
					</CardContent>
				</Card>	
				<Card className="col-span-3">
					<CardHeader>
						<CardTitle>
							Recent Sales
						</CardTitle>
					</CardHeader>
					<CardContent>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>BUYER</TableHead>
									<TableHead>DATE</TableHead>
									<TableHead>TOTAL</TableHead>
									<TableHead>ACTIONS</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{summary.latestOrders.map((order) =>(
									<TableRow key={order.id}>
										<TableCell>{order.user.name ?? "Deleted User"}</TableCell>
										<TableCell>{formatDateTime(order.createdAt).dateOnly}</TableCell>
										<TableCell>{formatCurrency(order.totalPrice)}</TableCell>
										<TableCell>
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

export default OverviewPage