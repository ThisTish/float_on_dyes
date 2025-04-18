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
			<Heading first="Your" second="Orders" className="mb-10"/>

			{orders.data.length === 0 ? (
				<div className="mx-auto flex max-w-md flex-col items-center justify-between gap-8 bg-card shadow-sm backdrop-blur-md">
					<p className="py-3 pt-5 text-center text-lg">You have not placed any orders yet</p>
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
					<div className="mx-auto self-start pb-10 sm:w-2/3">
						<p className="text-center">or search for something</p>
						<SearchButton />
					</div>
				</div>
			) :
				<OrdersTable orders={orders.data as Order[]} role={'user'} />
			}
			{orders.totalPages > 1 ? (
				<Pagination page={Number(page) || '1'} totalPages={orders.totalPages} urlParamName="page" />
			) : null}

		</div>
	)
}

export default UserOrdersPage