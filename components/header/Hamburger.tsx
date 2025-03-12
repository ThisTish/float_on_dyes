"use client"

import { useState } from "react"

const Hamburger = ({ isOpen }: { isOpen: boolean }) => {
	return (
		<div className="hamburger cursor-pointer focus-visible:ring-0" aria-expanded={isOpen}>

			<svg viewBox="0 0 32 32" width={40} className={`h-12 transition-transform duration-700 ease-[cubic-bezier(0.4, 0, 0.2, 1)] ${isOpen ? '-rotate-45' : 'rotate-0'} `}>
				<path className="line fill-none stroke-primary transition-all duration-700 ease-[cubic-bezier(0.4, 0, 0.2, 1)] line-top-bottom" strokeWidth={2} strokeLinecap="square" strokeLinejoin="miter" strokeDasharray={isOpen ? '20 300' : '12 63'} strokeDashoffset={isOpen ? '-32.42' : '0'} d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"></path>
				<path className="line fill-none stroke-primary transition-all duration-700 ease-[cubic-bezier(0.4, 0, 0.2, 1)]" strokeWidth={2} strokeLinecap="square" strokeLinejoin="miter" d="M7 16 27 16"></path>
			</svg>

		</div>
	)
}

export default Hamburger