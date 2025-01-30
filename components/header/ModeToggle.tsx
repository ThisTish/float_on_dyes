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
		<label className="relative inline-block w-16 cursor-pointer h-9 overflow-hidden">
			<input id="input" type="checkbox" onChange={toggleTheme} checked={resolvedTheme === 'dark'} className="sr-only opacity-0 size-0 peer" />
			<div className="absolute z-0 inset-0 bg-blue-500 peer-checked::bg-black transition peer-checked:bg-black"></div>
			{/* sun moon */}
			<div className="absolute left-1 bottom-1 w-7 h-7 bg-yellow-400 dark:bg-white rounded-full transition peer-checked:translate-x-7"></div>
			{/* moon dots */}
			<div className="absolute left-[43px] top-[6px] size-[6px] bg-gray-700 rounded-full opacity-0 peer-checked:opacity-100"></div>
			<div className="absolute left-[35px] top-[15px] size-[10px] bg-gray-600 rounded-full opacity-0 peer-checked:opacity-100"></div>
			<div className="absolute left-[50px] top-[25px] size-[3px] bg-gray-700 rounded-full opacity-0 peer-checked:opacity-100"></div>

			<div className="absolute inset-0  peer-checked:rotate-180">
				{/* <div className="relative"> */}
				{/* light rays */}
				<div className="absolute w-10 h-10 bg-white opacity-10 rounded-full -top-[2.5px] -left-[2.1px] "></div>
				<div className="absolute w-12 h-12 bg-white opacity-10 rounded-full -top-[4.5px] -left-[4.5px]"></div>
				<div className="absolute w-14 h-14 bg-white opacity-10 rounded-full -top-[6.5px] -left-[6.5px]"></div>
				{/* </div> */}
			</div>
			{/* clouds */}
			<div className="absolute top-2 left-2 opacity-100 peer-checked:opacity-0">
				<svg id="cloud-1" className="cloud-dark absolute w-10 h-10 fill-blue rounded-full animate-cloud-move" viewBox="0 0 100 100">
					<circle cx="50" cy="50" r="50"></circle>
				</svg>
				<svg id="cloud-2" className="cloud-dark" viewBox="0 0 100 100">
					<circle cx="50" cy="50" r="50"></circle>
				</svg>
				<svg id="cloud-3" className="cloud-dark" viewBox="0 0 100 100">
					<circle cx="50" cy="50" r="50"></circle>
				</svg>
				<svg id="cloud-4" className="cloud-light" viewBox="0 0 100 100">
					<circle cx="50" cy="50" r="50"></circle>
				</svg>
				<svg id="cloud-5" className="cloud-light" viewBox="0 0 100 100">
					<circle cx="50" cy="50" r="50"></circle>
				</svg>
				<svg id="cloud-6" className="cloud-light" viewBox="0 0 100 100">
					<circle cx="50" cy="50" r="50"></circle>
				</svg>
				{/* <div className="absolute w-10 h-10 bg-gray-300 rounded-full animate-cloud-move"></div>
				<div className="absolute w-5 h-5 bg-gray-400 rounded-full animate-cloud-move left-4 top-2"></div>
				<div className="absolute w-7 h-7 bg-gray-500 rounded-full animate-cloud-move left-8 top-4"></div> */}
			</div>
			{/* stars */}
			<div className="relative opacity-0 peer-checked:opacity-100 transition ">
				<svg id="star-1" className="star absolute fill-white animate-star-twinkle size-4 -top-1 left-5 " viewBox="0 0 20 20">
					<path
						d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z"
					></path>
				</svg>
				<svg id="star-2" className="star absolute fill-white animate-star-twinkle size-1 top-4 left-1" viewBox="0 0 20 20">
					<path
						d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z"
					></path>
				</svg>
				<svg id="star-3" className="star absolute fill-white animate-star-twinkle size-3 top-5 left-3" viewBox="0 0 20 20">
					<path
						d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z"
					></path>
				</svg>
				<svg id="star-4" className="star absolute fill-white animate-star-twinkle size-5 top-0 left-1" viewBox="0 0 20 20">
					<path
						d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z"
					></path>
				</svg>
				
			</div>
		</label>
	)
}

export default ModeToggle