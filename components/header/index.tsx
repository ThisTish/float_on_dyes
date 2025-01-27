import { APP_NAME } from "@/lib/constants"
import Image from "next/image"
import Link from "next/link"
import { Button } from "../ui/button"
import { LogIn, ShoppingCart } from "lucide-react"
import PAGE_LINKS from "@/lib/constants/page-links"
import Links from "../shared/lists/Links"
import { AnimatedDiv } from "../ui/AnimatedDiv"
import Hamburger from "./Hamburger"

const Header = () => {
	return (
		<header className="w-full fixed top-0 z-50  backdrop-blur-md shadow-md text-darkBlue ">

			<div className="flex-between wrapper">

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

				<nav className="hidden space-x-1 md:block">
					{PAGE_LINKS.map((link) => (
						<Button variant={'link'} size={'sm'} key={link.name} asChild>
							<AnimatedDiv variant={'link'}>
							<Links {...link} />
							</AnimatedDiv>
						</Button>
					))}
					
				</nav>
					<div className="md:hidden">
						<Hamburger />
					</div>

			</div>
		</header>
	)
}

export default Header