"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

const ModeToggle = () => {
	const { resolvedTheme, setTheme } = useTheme()
	const [mounted, setMounted] = useState(false)

	const toggleTheme = () => {
		setTheme(resolvedTheme === 'light' ? 'dark' : 'light')
	}

	useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted) return null

	return (
		<label className="relative mt-1 inline-block h-9 w-16 cursor-pointer overflow-hidden">
			<input id="input" type="checkbox" onChange={toggleTheme} checked={resolvedTheme === 'dark'} className="peer sr-only size-0 opacity-0" />
			<div className="peer-checked::bg-black absolute inset-0 z-0 bg-lightBlue transition-all duration-300 ease-linear peer-checked:bg-black"></div>
			{/* sun moon */}
			<div className="absolute bottom-1 left-1 h-7 w-7 rounded-full bg-yellow-300 transition-all duration-300 ease-linear peer-checked:translate-x-7 dark:bg-white"></div>
			{/* moon dots */}
			<div className="absolute left-[43px] top-[6px] size-[6px] rounded-full bg-gray-700 opacity-0 peer-checked:opacity-100"></div>
			<div className="absolute left-[35px] top-[15px] size-[10px] rounded-full bg-gray-600 opacity-0 peer-checked:opacity-100"></div>
			<div className="absolute left-[50px] top-[25px] size-[3px] rounded-full bg-gray-700 opacity-0 peer-checked:opacity-100"></div>

			<div className="absolute inset-0 transition-all duration-300 ease-linear peer-checked:rotate-180">
				{/* <div className="relative"> */}
				{/* light rays */}
				<div className="absolute -left-[2.1px] -top-[2.5px] h-10 w-10 rounded-full bg-white opacity-10"></div>
				<div className="absolute -left-[4.5px] -top-[4.5px] h-12 w-12 rounded-full bg-white opacity-10"></div>
				<div className="absolute -left-[6.5px] -top-[6.5px] h-14 w-14 rounded-full bg-white opacity-10"></div>
				{/* </div> */}
			</div>
			{/* clouds */}
			<div className="absolute left-2 top-2 opacity-100 transition-all duration-300 ease-linear peer-checked:opacity-0">
				<svg id="cloud-1" className="cloud-dark fill-blue absolute left-11 top-1 size-10 animate-cloud-move rounded-full fill-blue-200 delay-100" viewBox="0 0 100 100">
					<circle cx="50" cy="50" r="50"></circle>
				</svg>
				<svg id="cloud-2" className="cloud-dark fill-blue absolute left-9 top-3 size-5 animate-cloud-move rounded-full fill-blue-200 delay-100" viewBox="0 0 100 100">
					<circle cx="50" cy="50" r="50"></circle>
				</svg>
				<svg id="cloud-3" className="cloud-dark fill-blue absolute left-4 top-5 size-10 animate-cloud-move rounded-full fill-blue-200 delay-100" viewBox="0 0 100 100">
					<circle cx="50" cy="50" r="50"></circle>
				</svg>
				<svg id="cloud-4" className="cloud-light fill-blue absolute left-12 top-2 size-10 animate-cloud-move rounded-full fill-blue-50" viewBox="0 0 100 100">
					<circle cx="50" cy="50" r="50"></circle>
				</svg>
				<svg id="cloud-5" className="cloud-light fill-blue absolute left-10 top-4 size-5 animate-cloud-move rounded-full fill-blue-50" viewBox="0 0 100 100">
					<circle cx="50" cy="50" r="50"></circle>
				</svg>
				<svg id="cloud-6" className="cloud-light fill-blue absolute left-5 top-6 size-10 animate-cloud-move rounded-full fill-blue-50" viewBox="0 0 100 100">
					<circle cx="50" cy="50" r="50"></circle>
				</svg>
				
			</div>
			{/* stars */}
			<div className="relative opacity-0 transition-all duration-300 ease-linear peer-checked:opacity-100">
				<svg id="star-1" className="star absolute -top-1 left-5 size-4 animate-star-twinkle fill-white" viewBox="0 0 20 20">
					<path
						d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z"
					></path>
				</svg>
				<svg id="star-2" className="star absolute left-1 top-4 size-1 animate-star-twinkle fill-white" viewBox="0 0 20 20">
					<path
						d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z"
					></path>
				</svg>
				<svg id="star-3" className="star absolute left-3 top-5 size-3 animate-star-twinkle fill-white" viewBox="0 0 20 20">
					<path
						d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z"
					></path>
				</svg>
				<svg id="star-4" className="star absolute left-1 top-0 size-5 animate-star-twinkle fill-white" viewBox="0 0 20 20">
					<path
						d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z"
					></path>
				</svg>
				
			</div>
		</label>
	)
}

export default ModeToggle