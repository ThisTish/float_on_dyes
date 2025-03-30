"use client"

import { useState } from "react"
import { PAGE_LINKS } from "@/lib/constants/page-links"
import Links from "../shared/lists/Links"
import Hamburger from "./Hamburger"
import { Button } from "../ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet"
import ModeToggle from "./ModeToggle"
import UserButton from "../auth/UserButton"
import Link from "next/link"
import ShoppingCart from "../ui/shoppingcart"
import SearchButton from "../ui/SearchButton"
import Tooltip from "../ui/Tooltip"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"


const Menu = () => {
	const [isOpen, setIsOpen] = useState(false)
	const pathname = usePathname()

	return (
		<div className="flex">

			{/* md: and up */}
			<nav className="hidden items-center space-x-1 text-sm md:flex md:flex-col">
				<div>
					{PAGE_LINKS.map((link) => (
						<Button variant={'link'} key={link.name} asChild className={cn(' font-extrabold rounded-full', pathname === link.href ? 'before:left-0 before:scale-150 before:bg-darkBlue before:absolute before:h-2 before:w-full before:bottom-0' : '')}>
							<Links {...link} />
						</Button>
					))}
				</div>

				<div className="flex w-full items-center justify-between">
					<SearchButton />
					<div className="flex items-center gap-3">
						<Tooltip label="Light/Dark" position="bottom" >
							<ModeToggle />
						</Tooltip>

						<Link href='/cart' className="-mr-2 rounded-full border border-transparent p-2 transition-all duration-300 ease-in hover:scale-90 hover:border-darkBlue hover:bg-darkBlue hover:text-white hover:ring-[3px] hover:ring-inset hover:ring-white active:translate-x-1 active:translate-y-1">
							<Tooltip label="Cart" className="mt-4" position="bottom">
								<ShoppingCart />
							</Tooltip>
						</Link>

						<UserButton />
					</div>
				</div>
			</nav>

			{/* mobile */}
			<nav className="flex gap-3 md:hidden">
				<Link href={'/cart'} className="mt-1 w-fit rounded-full p-2 hover:bg-darkBlue hover:text-primary-foreground">
					<ShoppingCart />
				</Link>

				<UserButton />
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
							<Links key={link.name} {...link} className="p-2 transition duration-300 hover:bg-darkBlue hover:font-semibold hover:text-white" />
						))}

						<div className="-ml-3 w-full">
							<SearchButton />
						</div>
					</SheetContent>
				</Sheet>
			</nav>
		</div>
	)
}

export default Menu