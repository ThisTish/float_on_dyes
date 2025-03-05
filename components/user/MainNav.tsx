"use client"

import { USER_PAGE_LINKS } from "@/lib/constants/page-links"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React from "react"

const links = [
	{
		title: 'Profile',
		href: '/user/profile'
	},
	{
		title: 'Orders',
		href: '/user/orders'
	}
]


const MainNav = ({className, ...props}: React.HtmlHTMLAttributes<HTMLElement>) => {
	const pathname = usePathname()

	return (
		<nav className={cn('flex items-center space-x-3 lg:space-x-6', className)} {...props}>
			{USER_PAGE_LINKS.map((link, i)=>(
				<Link key={i} href={link.href} className={cn(`text-sm font-bold tracking-wide transition text-darkGreen hover:text-darkGreen hover:font-semibold`, pathname.includes(link.href) ? '' : ' font-extralight tracking-normal')}>
					{link.name}
				</Link>
			))}
		</nav>
	)
}

export default MainNav