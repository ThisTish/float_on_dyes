import { APP_NAME } from "@/lib/constants"
import Image from "next/image"
import Link from "next/link"
import { Button } from "../ui/button"
import { LogIn, ShoppingCart } from "lucide-react"

const Header = () => {
	return (
		<header className="w-full fixed top-0 z-50  backdrop-blur-md shadow-md text-darkGreen ">

					<div className="flex-between wrapper">

						<div className="flex-start">
							<Link href="/" className="flex-start">
								<Image
									src='/logo.png'
									alt={`${APP_NAME} logo`}
									width={55}
									height={55}
								/>
								<span className="hidden font-bold text-2xl ml-3 lg:block">Float On Dyes</span>
							</Link>
						</div>

						<nav className="hidden space-x-1 md:block">
							<Button variant={'ghost'} asChild>
								<Link href={'/'}>Home</Link>
							</Button>
							<Button variant={'ghost'} asChild>
								<Link href={'/shop'}>Shop</Link>
							</Button>
							<Button variant={'ghost'} asChild>
								<Link href={'/custom'}>Custom Orders</Link>
							</Button>
							<Button variant={'ghost'} asChild>
								<Link href={'/gallery'}>Gallery</Link>
							</Button>
							<Button variant={'ghost'} asChild>
								<Link href={'/about'}>About Us</Link>
							</Button>
							<Button variant={'ghost'} asChild>
								<Link href={'/contact'}>Contact</Link>
							</Button>
							<Button variant={'ghost'} asChild>
								<Link href={'/cart'}><ShoppingCart /></Link>
							</Button>
							<Button variant={'ghost'} asChild>
								<Link href={'/sign-in'}><LogIn />Login</Link>
							</Button>
						</nav>

					</div>
		</header>
	)
}

export default Header