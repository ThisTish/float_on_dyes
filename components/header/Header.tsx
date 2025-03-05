import { APP_NAME } from "@/lib/constants"
import Image from "next/image"
import Link from "next/link"
import Menu from "./Menu"
import MainNav from "../user/MainNav"


const Header = ({ layout }: { layout: string }) => {

	return (
		<header className="w-full fixed top-0 z-50 backdrop-blur-md shadow-md ">
			<div className="flex-between wrapper">
				{/* logo & name */}
				<div className="flex-start">
					<Link href="/" className="flex-start ">
						<Image
							src={'/images/logo.svg'}
							alt={`${APP_NAME} logo`}
							width={55}
							height={55}
						/>
						{layout === 'main'
							? <h1 className="text-2xl font-bold ">{APP_NAME}</h1> : null}
					</Link>
					{layout === 'user'
						? <MainNav className="mx-6" />
						: null
					}
				</div>
				<div className="flex">
					<div className="hidden md:block mr-3">

					</div>
					<Menu />
				</div>

			</div>
		</header >
	)
}

export default Header