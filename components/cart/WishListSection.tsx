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
		<Card className="space-y-5 p-10 overflow-x-auto lg:col-span-3 mt-5">
			<CardHeader>
				<CardTitle>
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

							<div className="flex flex-col-reverse gap-3 items-start sm:flex-row sm:justify-between sm:items-center ">
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
						<div className="flex gap-5 flex-wrap">
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
