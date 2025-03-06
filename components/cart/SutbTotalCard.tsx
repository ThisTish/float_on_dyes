"use client"
import { formatCurrency } from "@/lib/utils"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { PiSpinnerBallDuotone } from "react-icons/pi"
import { AnimatedDiv } from "../ui/AnimatedDiv"
import { ArrowUpRight } from "lucide-react"
import { Cart } from "@/types"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { useTransition } from "react"
import PriceBreakdown from "../shared/PriceBreakdown"

const SubTotalCard = ({ cart }: { cart: Cart }) => {
	const router = useRouter()
	const toast = useToast()
	const [pending, startTransition] = useTransition()


	return (
		<Card className="p-10">
			<CardHeader>
				<CardTitle className="px-0">
					<h2 className="h3-bold">Cart Totals</h2>
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-5 place-self-end w-full">
				{!cart || cart.items.length === 0 ? (
					<div>
						<h3>
							Your shopping cart is empty
						</h3>
					</div>
				) : (
					<>
						<PriceBreakdown cart={cart} />
						<Button
							className="w-full"
							variant="cta"
							disabled={pending}
							onClick={() => startTransition(() => router.push('/shipping-address'))}>
							Checkout
							{pending
								? <PiSpinnerBallDuotone className="animate-spin" />
								: <AnimatedDiv variant={'cta'} animation={'rotate'}>
									<ArrowUpRight />
								</AnimatedDiv>
							}
						</Button>
					</>
				)}
			</CardContent>
		</Card>
	)
}

export default SubTotalCard