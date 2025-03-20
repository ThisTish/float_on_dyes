"use client"

import { Cart } from "@/types"
import Link from "next/link"
import SearchButton from "../ui/SearchButton"
import { Button } from "../ui/button"
import { AnimatedDiv } from "../ui/AnimatedDiv"
import { ArrowUpRight } from "lucide-react"
import ItemsTable from "../shared/tables/ItemsTable"

const CartItemsSection = ({ cart }: { cart?: Cart }) => {
	return (
		<>
			{/* if empty */}
			{!cart || cart.items.length === 0
				? (
					<div className="space-y-5 text-center">
						<h2 className="h3-bold">Your shopping cart is empty</h2>
						<span>Head to the shop or search for something special.</span>

						<div className="flex flex-col-reverse items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
							<SearchButton />
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

						</div>
					</div>
				) : (
					// displaying cart items
					<ItemsTable cart={cart} showOptions={true} />
				)
			}
		</>
	)
}

export default CartItemsSection