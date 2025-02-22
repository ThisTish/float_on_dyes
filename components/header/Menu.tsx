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
import SearchButton from "../ui/SearchButton"
import Tooltip from "../ui/Tooltip"
// todo search button icon-> '/shop' & auto focus or style search button different....

const Menu = () => {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<>
			{/* md: and up */}
			<nav className="hidden md:flex md:flex-col items-center text-sm space-x-1">
				<div>
					{PAGE_LINKS.map((link) => (
						<Button variant={'link'} key={link.name} asChild className="font-extrabold">
							<AnimatedDiv variant={'link'}>
								<Links {...link} />
							</AnimatedDiv>
						</Button>

					))}

				</div>
				<div className="w-full flex items-center justify-between">
					{/* light/dark mode */}
					<SearchButton/>

					<div className="flex gap-3 items-center">
					<Link href='/cart' className="p-2 -mr-2 border-transparent border transition-all duration-300 ease-in hover:ring-inset hover:border-darkGreen hover:ring-[3px] hover:ring-white rounded-full hover:bg-darkGreen hover:text-white hover:scale-90 active:translate-x-1 active:translate-y-1">
						<Tooltip label="Cart" className="mb-3">
							<ShoppingCart />
						</Tooltip>
					</Link>
					<UserButton />
					<Tooltip label="Light/Dark">
						<ModeToggle />
					</Tooltip>
					</div>
				</div>
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
							link.name === 'Cart' ? (
								null
							) : (
								<Links key={link.name} {...link} className="transition duration-300 hover:bg-darkBlue p-2 hover:text-white hover:font-semibold" />
							)
						))}
						<div className="flex gap-2">
							<UserButton />
							<Link href={'/cart'} className="p-2 rounded-full hover:bg-darkGreen hover:text-primary-foreground">
								<ShoppingCart />
							</Link>
							{/* style different, so it's like other icons */}
						</div>
						<div className="-ml-3 w-full">

							<SearchButton />
						</div>
					</SheetContent>
				</Sheet>
			</nav>
		</>
	)
}

export default Menu