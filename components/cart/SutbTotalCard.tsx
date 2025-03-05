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
				<CardTitle>
					<h2 className="text-xl space-x-2">Cart Totals</h2>
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-5 place-self-end w-full">
				<PriceBreakdown
					itemsPrice={Number(cart?.itemsPrice ?? 0)}
					taxPrice={Number(cart?.taxPrice ?? 0)}
					shippingPrice={Number(cart?.shippingPrice ?? 0)}
					totalPrice={Number(cart?.totalPrice ?? 0)}
					qty={cart.items.reduce((a, c) => a + c.qty, 0)}
				/>
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
			</CardContent>
		</Card>
	)
}

export default SubTotalCard