"use client"

import { useState } from "react" 
import { APP_NAME } from "@/lib/constants"
import Image from "next/image"
import Link from "next/link"
import PAGE_LINKS from "@/lib/constants/page-links"
import Links from "../shared/lists/Links"
import Hamburger from "./Hamburger"
import ModeToggle from "./ModeToggle"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Button } from "../ui/button"
import { AnimatedDiv } from "../ui/AnimatedDiv"

const Header = () => {
	const [isOpen, setIsOpen] = useState(false)


	return (
		<header className="w-full fixed top-0 z-50 backdrop-blur-md shadow-md text-darkBlue ">

			<div className="flex-between wrapper">
				{/* logo & name */}
				<div className="flex-start">
					<Link href="/" className="flex-start">
						<Image
							src='/logo.png'
							alt={`${APP_NAME} logo`}
							width={55}
							height={55}
						/>
						<h1 className="hidden font-bold text-2xl text-accent ml-3 lg:block">Float On Dyes</h1>
					</Link>
				</div>

				{/* light/dark mode */}
				<div className="hidden md:block">
				<ModeToggle />

				</div>

				{/* page links */}
				<nav className="hidden space-x-1 md:block">
					{PAGE_LINKS.map((link) => (
						<Button variant={'link'} key={link.name} asChild>
							<AnimatedDiv variant={'link'}>
								<Links {...link} />
							</AnimatedDiv>
						</Button>
					))}

				</nav>
				<nav className="md:hidden">
					<DropdownMenu onOpenChange={(prev) => setIsOpen(prev)}>
						<DropdownMenuTrigger className="cursor-pointer">	
							<Hamburger isOpen={isOpen}/>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuLabel>Menu</DropdownMenuLabel>
							<DropdownMenuSeparator />
							{PAGE_LINKS.map((link) => (
								<DropdownMenuItem key={link.name}>
									<Links {...link} />
								</DropdownMenuItem>
							))}
							<DropdownMenuSeparator />
							<DropdownMenuItem className="flex justify-center">
								<ModeToggle />
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</nav>

			</div>
		</header>
	)
}

export default Header