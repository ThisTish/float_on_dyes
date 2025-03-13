import Pagination from "@/components/shared/lists/Pagination"
import OrdersTable from "@/components/shared/tables/OrdersTable"
import { AnimatedDiv } from "@/components/ui/AnimatedDiv"
import { Button } from "@/components/ui/button"
import Heading from "@/components/ui/Heading"
import SearchButton from "@/components/ui/SearchButton"
import { getUserOrders } from "@/lib/actions/order.actions"
import { Order } from "@/types"
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
		<div className="space-y-5">
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
				<OrdersTable orders={orders.data as Order[]} totalPages={orders.totalPages} />
			}
			{orders.totalPages > 1 ? (
				<Pagination page={Number(page) || '1'} totalPages={orders.totalPages} urlParamName="page" />
			) : null}

		</div>
	)
}

export default UserOrdersPage