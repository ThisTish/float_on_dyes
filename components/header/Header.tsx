"use client"

import { APP_NAME } from "@/lib/constants"
import Image from "next/image"
import Link from "next/link"
import ModeToggle from "./ModeToggle"
import Menu from "./Menu"
import Tooltip from "../ui/Tooltip"
import { useTheme } from "next-themes"


const Header = () => {
	const theme = useTheme()

	return (
		<header className="w-full fixed top-0 z-50 backdrop-blur-md shadow-md ">
			<div className="flex-between wrapper">
				{/* logo & name */}
				<div className="flex-start">
					<Link href="/" className="flex-start ">
						<Image
						src={theme.theme === 'dark' ? '/images/logo-dark.svg' : '/images/logo.svg'}
						alt={`${APP_NAME} logo`}
							width={55}
							height={55}
						/>
					</Link>
				</div>
				<div className="flex">
					<div className="hidden md:block mr-3">
						{/* light/dark mode */}
						<Tooltip label="Light/Dark">
						<ModeToggle />
					</Tooltip>
				</div>
				{/* page links */}
				<Menu />
			</div>

		</div>
		</header >
	)
}

export default Header