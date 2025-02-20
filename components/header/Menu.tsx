"use client"
import { useState } from "react"
import PAGE_LINKS from "@/lib/constants/page-links"
import Links from "../shared/lists/Links"
import Hamburger from "./Hamburger"
import { Button } from "../ui/button"
import { AnimatedDiv } from "../ui/AnimatedDiv"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet"
import ModeToggle from "./ModeToggle"
import UserButton from "../auth/UserButton"
import Link from "next/link"
import ShoppingCart from "../ui/shoppingcart"

const Menu = () => {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<>
			{/* md: and up */}
			<nav className="hidden md:flex items-center text-sm space-x-1">
				{PAGE_LINKS.map((link) => (
					link.name === 'Cart' ? (
						<Link href={link.href} className="p-2 rounded-full hover:bg-darkGreen hover:text-primary-foreground">
							<ShoppingCart />
						</Link>
						
					) : (
						<Button variant={'link'} key={link.name} asChild className="font-extrabold">
							<AnimatedDiv variant={'link'}>
								<Links {...link} />
							</AnimatedDiv>
						</Button>
					)
				))}
				<UserButton />
			</nav>

			{/* mobile */}
			<nav className="md:hidden">
				<Sheet onOpenChange={(prev) => setIsOpen(prev)}>
					<SheetTrigger>
						<Hamburger isOpen={isOpen} />
					</SheetTrigger>
					<SheetContent className="flex flex-col justify-between pt-28">
						<SheetHeader>
							<SheetTitle>
								Menu
							</SheetTitle>
							<ModeToggle />

						</SheetHeader>
						{PAGE_LINKS.map((link) => (
							<Links key={link.name} {...link} className="transition duration-300 hover:bg-darkBlue p-2 hover:text-white hover:font-semibold" />
						))}
						<UserButton />
					</SheetContent>
				</Sheet>
			</nav>
		</>
	)
}

export default Menu