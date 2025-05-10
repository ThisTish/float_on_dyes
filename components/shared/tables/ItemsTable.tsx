"use client"

import { useCheckout } from "@/context/CheckoutContext"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"
import ProductPrice from "@/components/product/ProductPrice"
import { PiDotsThreeOutlineVertical, PiTrashDuotone } from "react-icons/pi"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import AddToCart from "@/components/product/AddToCart"
import AddToWishList from "@/components/product/AddToWishList"
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
							<Link href={`/products/${item.slug}`} className="flex w-fit flex-col items-center gap-3 py-3 sm:flex-row md:text-lg">
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
							{item.customOrderDetails ? (
								<span className="text-balance text-sm font-normal opacity-70">
									{item.customOrderDetails.dyeType} - {item.customOrderDetails.colors.map((color) => color).join(', ')} {item.customOrderDetails.rimOptions ? '- ' + item.customOrderDetails.rimOptions : null} {item.customOrderDetails.stampOptions ? '- ' + item.customOrderDetails.stampOptions : null}
								</span>

							) : null
							}
						</TableCell>

						{/* item price */}
						<TableCell className="text-center">
							<ProductPrice value={Number(item.price)} className="font-normal" />
						</TableCell>

						{/* item options */}
						{showOptions ? (
							<TableCell className="flex justify-end">
								<DropdownMenu>
									<DropdownMenuTrigger className="py-10 sm:hidden">
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
								<div className="hidden max-w-40 flex-col items-center gap-3 pt-5 sm:flex">
									<AddToWishList item={item} size="cart" />
									<AddToCart item={item} size="cart" />
								</div>
							</TableCell>
						) : (
							<TableCell >
								<AddToCart size="place-order" item={item} />
							</TableCell>
						)}
					</TableRow>
				))}
			</TableBody>
		</Table>
	)
}

export default ItemsTable