"use client"

import { ArrowUpRight } from "lucide-react"
import SearchButton from "../ui/SearchButton"
import { AnimatedDiv } from "../ui/AnimatedDiv"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import Link from "next/link"
import WishListCard from "./WishListCard"
import { WishList } from "@/types"

const WishListSection
	= ({ wishList }: { wishList: WishList }) => {

		return (
			<Card className="mt-5 space-y-5 overflow-x-auto p-10 lg:col-span-3 lg:mt-0">
				<CardHeader>
					<CardTitle className="px-0">
						<h2 className="h3-bold">
							WishList ({wishList.items.length})
						</h2>
					</CardTitle>
				</CardHeader>

				<CardContent>
					{!wishList || wishList.items.length === 0
						? (
							<div className="space-y-5 text-center">
								<h2 className="h3-bold">There's nothing in your wish list yet.</h2>
								<span>Search for something special or head to the shop.</span>

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
							<div className="flex flex-wrap gap-5">
								{wishList.items.map((item) => (
									<WishListCard key={item.productId} item={item} />
								))}
							</div>
						)}
				</CardContent>
			</Card>
		)
	}

export default WishListSection
