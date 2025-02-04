import { APP_NAME } from "@/lib/constants"
import Image from "next/image"
import Link from "next/link"
import ModeToggle from "./ModeToggle"
import Menu from "./Menu"


const Header = () => {

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
					</Link>
				</div>

				{/* light/dark mode */}
				<div className="flex">
				<Menu />
				<div className="hidden md:block">

					<ModeToggle />
				</div>
				</div>
				{/* page links */}

			</div>
		</header>
	)
}

export default Header