"use client"

import { Cart } from "@/types"
import Link from "next/link"
import SearchButton from "../ui/SearchButton"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import Image from "next/image"
import AddToCart from "../product/AddToCart"
import AddToWishList from "../product/AddToWishList"
import { Button } from "../ui/button"
import { AnimatedDiv } from "../ui/AnimatedDiv"
import { ArrowUpRight } from "lucide-react"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "../ui/dropdown-menu"
import { PiDotsThreeOutlineVertical } from "react-icons/pi"
import ProductPrice from "../product/ProductPrice"

const CartTable = ({ cart, showOptions }: { cart?: Cart, showOptions: boolean }) => {
	return (
		<>
			{/* if empty */}
			{!cart || cart.items.length === 0
				? (
					<div className="space-y-5 text-center">
						<h2 className="h3-bold">Your shopping cart is empty</h2>
						<span>Head to the shop or search for something special.</span>

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
					// displaying cart items
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Item</TableHead>
								{/* <TableHead className="text-center">Quantity</TableHead> */}
								<TableHead className="text-center">Price</TableHead>
								{showOptions ? (
									<TableHead className="text-end">Options</TableHead>
								): null}
							</TableRow>
						</TableHeader>

						<TableBody>
							{cart.items.map((item) => (
								<TableRow key={item.slug}>

									{/* item image and name */}
									<TableCell>
										<Link href={`/products/${item.slug}`} className="flex flex-col sm:flex-row gap-3 items-center w-fit md:text-lg">
											<Image
												src={item.image}
												alt={item.name}
												width={150}
												height={150}
											/>
											<span>
												{item.name}
											</span>
										</Link>
									</TableCell>

									{/* qty */}
									{/* <TableCell className="text-center">
											{item.qty}
										</TableCell> */}

									{/* item price */}
									<TableCell className="text-center">
										<ProductPrice value={Number(item.price)} className="font-normal" />
									</TableCell>

									{/* item options */}
									<TableCell className="flex justify-end ">
										<DropdownMenu>
											<DropdownMenuTrigger className="sm:hidden py-10">
												<PiDotsThreeOutlineVertical size={25} />
											</DropdownMenuTrigger>
											<DropdownMenuContent className="bg-secondary dark:bg-primary">
												<DropdownMenuItem>
													<AddToWishList item={item} size="dropdown" />
												</DropdownMenuItem>
												<DropdownMenuItem>
													<AddToCart item={item} size="dropdown" />
												</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
										{showOptions ? (
										<div className="hidden sm:flex flex-col gap-3 pt-5 items-center max-w-40">
											<AddToWishList item={item} size="cart" />
											<AddToCart item={item} size="cart" />
										</div>
										): null}
									</TableCell>

								</TableRow>
							))}
						</TableBody>
					</Table>
				)
			}
		</>
	)
}

export default CartTable