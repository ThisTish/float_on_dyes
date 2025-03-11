"use client"

import { ADMIN_PAGE_LINK } from "@/lib/constants/page-links"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React from "react"




const AdminMainNav = ({className, ...props}: React.HtmlHTMLAttributes<HTMLElement>) => {
	const pathname = usePathname()

	return (
		<nav className={cn('flex items-center space-x-3 lg:space-x-6', className)} {...props}>
			{ADMIN_PAGE_LINK.map((link, i)=>(
				<Link key={i} href={link.href} className={cn(`text-sm font-bold tracking-wide transition text-darkGreen hover:text-darkGreen hover:font-semibold`, pathname.includes(link.href) ? '' : ' font-extralight tracking-normal')}>
					{link.name}
				</Link>
			))}
		</nav>
	)
}

export default AdminMainNav