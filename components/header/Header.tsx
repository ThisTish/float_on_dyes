import { APP_NAME } from "@/lib/constants"
import Image from "next/image"
import Link from "next/link"
import Menu from "./Menu"
import MainNav from "../user/UserMainNav"
import ShoppingCart from "../ui/shoppingcart"
import UserButton from "../auth/UserButton"


const Header = ({ layout }: { layout: string }) => {

	return (
		<header className="fixed top-0 z-50 w-full shadow-md backdrop-blur-md">
			<div className="flex-between wrapper">
				{/* logo & name */}
				<div className="flex-start">
					<Link href="/" className="flex-start">
						<Image
							src={'/images/logo.svg'}
							alt={`${APP_NAME} logo`}
							width={55}
							height={55}
						/>
						{layout === 'main'
							? <h1 className="hidden text-2xl font-bold md:inline">{APP_NAME}</h1> : null}
					</Link>
					{layout === 'user'
						? <MainNav className="mx-6" />
						: null
					}
				</div>

				<Menu />

			</div>
		</header >
	)
}

export default Header