"use client"

import { useTheme } from "next-themes"

const ModeToggle = () => {
	const {theme, setTheme} = useTheme()

	const toggleTheme = () => {
		setTheme(theme === 'light' ? 'dark' : 'light')
	}



	return (
		<label className="switch relative inline-block w-[60px] h-[34px]">
			<input id="input" type="checkbox" onClick={toggleTheme} className="opacity-0 size-0 group peer"/>
			<div className="slider round absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-[#2196f3] transition duration-400 z-0 overflow-hidden peer-focus:shadow-sm peer-checked:transform peer-checked:bg-white peer-checked:animate-rotate-center peer-checked:duration-400 peer-checked:ease-in-out peer-checked:opacity-1">
				<div className="sun-moon absolute w-[26px] h-[26px] left-1 bottom-1 bg-yellow-400 rounded-full transition duration-400  peer-checked:transform peer-checked:bg-white peer-checked:animate-rotate-center peer-checked:duration-400 peer-checked:ease-in-out peer-checked:opacity-1">
					<svg id="moon-dot-1" className="moon-dot opacity-0 duration-400 fill-gray-400 absolute left-[10px] top-[3px] size-6 z-40 peer-checked:opacity-1" viewBox="0 0 100 100">
						<circle cx="50" cy="50" r="50"></circle>
					</svg>
					<svg id="moon-dot-2" className="moon-dot opacity-0 duration-400 fill-gray-400 absolute left-[2px] top-[10px] size-10 z-40 peer-checked:opacity-1" viewBox="0 0 100 100">
						<circle cx="50" cy="50" r="50"></circle>
					</svg>
					<svg id="moon-dot-3" className="moon-dot opacity-0 duration-400 fill-gray-400 absolute left-4 top-[18px] size-[3px] z-40 peer-checked:opacity-1" viewBox="0 0 100 100">
						<circle cx="50" cy="50" r="50"></circle>
					</svg>
					<svg id="light-ray-1" className="light-ray absolute -left-2 -top-2 size-[43px] -z-10 opacity-10 fill-white" viewBox="0 0 100 100">
						<circle cx="50" cy="50" r="50"></circle>
					</svg>
					<svg id="light-ray-2" className="light-ray absolute -left-1/2 -top-1/2 size-[55px] -z-10 opacity-10 fill-white" viewBox="0 0 100 100">
						<circle cx="50" cy="50" r="50"></circle>
					</svg>
					<svg id="light-ray-3" className="light-ray absolute -left-[18px] -top-[18px] size-[60px] -z-10 opacity-10 fill-white" viewBox="0 0 100 100">
						<circle cx="50" cy="50" r="50"></circle>
					</svg>

					<svg id="cloud-1" className="left-[30px] top-[15px] w-10 cloud-dark absolute fill-[#ccc] animation-cloud-move delay-100" viewBox="0 0 100 100">
						<circle cx="50" cy="50" r="50"></circle>
					</svg>
					<svg id="cloud-2" className="left-[44px] top-[10px] w-5 cloud-dark absolute fill-[#ccc] animation-cloud-move delay-100" viewBox="0 0 100 100">
						<circle cx="50" cy="50" r="50"></circle>
					</svg>
					<svg id="cloud-3" className="left-[18px] top-6 size-[30px] cloud-dark absolute fill-[#ccc] animation-cloud-move delay-100" viewBox="0 0 100 100">
						<circle cx="50" cy="50" r="50"></circle>
					</svg>
					<svg id="cloud-4" className="left-9 top-[18px] w-10 cloud-light absolute fill-[#eee] animation-cloud-move" viewBox="0 0 100 100">
						<circle cx="50" cy="50" r="50"></circle>
					</svg>
					<svg id="cloud-5" className="left-12 top-[14px] w-5 cloud-light absolute fill-[#eee] animation-cloud-move" viewBox="0 0 100 100">
						<circle cx="50" cy="50" r="50"></circle>
					</svg>
					<svg id="cloud-6" className="left-[22px] top-[26px] w-[30px] cloud-light absolute fill-[#eee] animation-cloud-move" viewBox="0 0 100 100">
						<circle cx="50" cy="50" r="50"></circle>
					</svg>
				</div>
				<div className="stars  transform -translate-y-8 opacity-0 duration-400 peer-checked:translate-y-0 peer-checked:opacity-100" >
					<svg id="star-1" className="star fill-white absolute transition duration-400 animation-star-twinkle w-5 top-1 left-[3px] delay-300" viewBox="0 0 20 20">
						<path
							d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z"
						></path>
					</svg>
					<svg id="star-2" className="star fill-white absolute transition duration-400 animation-star-twinkle w-[6px] top-4 left-[3px]" viewBox="0 0 20 20">
						<path
							d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z"
						></path>
					</svg>
					<svg id="star-3" className="star fill-white absolute transition duration-400 animation-star-twinkle w-3 top-5 left-[10px] delay-700 " viewBox="0 0 20 20">
						<path
							d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z"
						></path>
					</svg>
					<svg id="star-4" className="star fill-white absolute transition duration-400 animation-star-twinkle w-[18px] top-0 left-[18px] delay-1000" viewBox="0 0 20 20">
						<path
							d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z"
						></path>
					</svg>
				</div>
			</div>
		</label>

	)
}

export default ModeToggle