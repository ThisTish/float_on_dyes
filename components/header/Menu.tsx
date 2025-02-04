"use client"
import { useState } from "react"
import PAGE_LINKS from "@/lib/constants/page-links"
import Links from "../shared/lists/Links"
import Hamburger from "./Hamburger"
import { Button } from "../ui/button"
import { AnimatedDiv } from "../ui/AnimatedDiv"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet"
import ModeToggle from "./ModeToggle"

const Menu = () => {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<>
			<nav className="hidden md:block text-sm space-x-1">
				{PAGE_LINKS.map((link) => (
					<Button variant={'link'} key={link.name} asChild className="font-extrabold">
						<AnimatedDiv variant={'link'}>
							<Links {...link} />
						</AnimatedDiv>
					</Button>
				))}
			</nav>

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
								<Links key={link.name} {...link} className="transition duration-300 hover:bg-darkBlue p-2 hover:text-white hover:font-semibold"   />
						))}
					</SheetContent>
				</Sheet>
			</nav>
		</>
	)
}

export default Menu