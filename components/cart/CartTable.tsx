"use client"

import { useToast } from "@/hooks/use-toast";
import { addItemToCart } from "@/lib/actions/cart.actions";
import { addItemToWishList } from "@/lib/actions/wishList.actions";
import { Cart } from "@/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { BiArrowToRight } from "react-icons/bi";
import { PiSpinnerBallDuotone } from "react-icons/pi";
import SearchButton from "../ui/SearchButton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import Image from "next/image";
import AddToCart from "../product/AddToCart";
import { round2 } from "@/lib/utils";
import AddToWishList from "../product/AddToWishList";

const CartTable = ({ cart }: { cart?: Cart }) => {
	const router = useRouter()
	const toast = useToast()
	const [pending, startTransition] = useTransition()

	return (
		<>
			{!cart || cart.items.length === 0
				? (
					<div>
						Cart is empty
						<Link href={'/shop'}>Go to shop</Link>
						<SearchButton />
					</div>
				) : (
					<div className="grid md:grid-cols-4 md:gap-5">
						<div className="overflow-x-auto md:col-span-2">
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Item</TableHead>
										<TableHead>Price</TableHead>
										<TableHead>Options</TableHead>
									</TableRow>
								</TableHeader>

								<TableBody>
									{cart.items.map((item) => (
										<TableRow key={item.slug}>

											<TableCell>
												<Link href={`/products/${item.slug}`} className="flex flex-col md:flex-row gap-3 items-center w-fit md:text-lg">
													<Image
														src={item.image}
														alt={item.name}
														width={100}
														height={100}
													/>
													<span>
														{item.name}
													</span>
												</Link>
											</TableCell>

											<TableCell>
												{round2(item.price)}
											</TableCell>

											<TableCell className="flex flex-col gap-3  max-w-40">
												<AddToCart item={item} size="trash" />
												<AddToWishList item={item} size="move" />
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</div>
					</div>
				)}
		</>
	);
}

export default CartTable;