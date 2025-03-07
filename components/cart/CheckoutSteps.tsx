"use client"
import { CHECKOUT_PAGE_LINKS } from "@/lib/constants/page-links"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React, { useEffect, useState } from "react"



const CheckoutSteps = () => {
	const [current, setCurrent] = useState(1)

	const pathname = usePathname()
	useEffect(() => {
		if (typeof window !== 'undefined') {

			switch (pathname) {
				case '/payment-method':
					setCurrent(2)
					break
				case '/place-order':
					setCurrent(3)
					break
				case pathname.match(/^\/order\/.+$/)?.input:
					setCurrent(4)
					break
				default:
					setCurrent(1)
			}
		}
	}, [pathname])


	return (
		<div className="flex-between flex-col gap-2 mb-10 md:flex-row">
			{CHECKOUT_PAGE_LINKS.map((step, index) => (
				<React.Fragment key={step.name}>
					<div className={`p-2 w-56 text-center text-sm ${index === current && current === 4 ? 'bg-darkGreen text-white border-none cursor-cursor' : index === current ? 'bg-secondary font-bold text-darkGreen border border-darkGreen' : ''}`}>
						{current === 4 ? (
							<span className={step.name === 'Order Details' ? 'text-white' : 'text-muted'}>{step.name}</span>
						) : step.href ? (
							<Link href={step.href}>
								{step.name}
							</Link>
						) : (
							<span className={current !== 4 ? 'text-muted' : ''}>{step.name}</span>
						)}

					</div>
					{step.name !== 'Order Details' ?
						<hr className="w-16 border-t mx-2 border-lightGreen" />
						: null
					}
				</React.Fragment>
			))}
		</div>
	)
}

export default CheckoutSteps