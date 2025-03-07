"use client"

import { useCheckout } from "@/context/CheckoutContext"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import Link from "next/link"
import ProductPrice from "../product/ProductPrice"
import { PiDotsThreeOutlineVertical, PiTrashDuotone } from "react-icons/pi"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import AddToCart from "../product/AddToCart"
import AddToWishList from "../product/AddToWishList"
import Image from "next/image"
import { Cart } from "@/types"

const ItemsTable = ({ cart, showOptions }: { cart?: Cart, showOptions: boolean }) => {
	if (!cart) {
		cart = useCheckout().cart
	}

	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Item</TableHead>
					<TableHead className="text-center">Price</TableHead>
					{showOptions ? (
						<TableHead className="text-end">Options</TableHead>
					) : null}
				</TableRow>
			</TableHeader>

			<TableBody>
				{cart.items.map((item) => (
					<TableRow key={item.slug}>

						{/* item image and name */}
						<TableCell>
							<Link href={`/products/${item.slug}`} className="flex flex-col py-3 sm:flex-row gap-3 items-center w-fit md:text-lg">
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

						{/* item price */}
						<TableCell className="text-center">
							<ProductPrice value={Number(item.price)} className="font-normal" />
						</TableCell>

						{/* item options */}
						{showOptions ? (
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
								<div className="hidden sm:flex flex-col gap-3 pt-5 items-center max-w-40">
									<AddToWishList item={item} size="cart" />
									<AddToCart item={item} size="cart" />
								</div>
							</TableCell>
						) : (
							<TableCell >
								<PiTrashDuotone />
							</TableCell>
						)}
					</TableRow>
				))}
			</TableBody>
		</Table>
	)
}

export default ItemsTable