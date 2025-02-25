"use client"
import { formatCurrency } from "@/lib/utils";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { PiSpinnerBallDuotone } from "react-icons/pi";
import { AnimatedDiv } from "../ui/AnimatedDiv";
import { ArrowUpRight } from "lucide-react";
import { Cart } from "@/types";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useTransition } from "react";

const SubTotalCard = ({ cart }: { cart: Cart }) => {
	const router = useRouter()
	const toast = useToast()
	const [pending, startTransition] = useTransition()


	return (
		<Card>
			<CardContent className="p-10 space-y-5 place-self-end">
				<p className="text-xl space-x-2">
					<span>Subtotal</span>
					<span>({cart?.items.reduce((a, c) => a + c.qty, 0)}):</span>
					<span className="font-bold">{formatCurrency(cart?.totalPrice ?? 0)} </span>
				</p>
				<Button
					className="w-full "
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
	);
}

export default SubTotalCard;