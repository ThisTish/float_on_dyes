"use client"
import { Label } from "./label"
import { Input } from "./input"
import { useState, useRef } from "react"
import { Button } from "./button"
import SearchIcon from "./searchIcon"


// todo make look like cart icon, 
// todo on hover bg-darkBlue onClick/isActive, 
// todo move to the right & rounded-none, 
// todo onHover-search shouldn't show yet, 
// todo change size for mobile view
// todo add className? or fix the margin(weird in mobile view empty cart)

const SearchButton = () => {
	const [isActive, setIsActive] = useState(false)
	const [searchValue, setSearchValue] = useState("")
	const inputRef = useRef<HTMLInputElement>(null)

	const handleBlur = () => {
		setTimeout(() => {
			if (
				document.activeElement !== inputRef.current &&
				searchValue.trim() === ""
			) {
				setIsActive(false)
			}
		}, 150) // Short delay to allow focus shifts
	}

	return (
		<div
			className={`relative ml-2.5 bg-transparent size-10 rounded-full flex duration-500  ${isActive ? "w-64 rounded-none bg-white border-darkBlue border" : "group-hover:w-64"
				}`}
		>
			<Label className="sr-only" htmlFor="search">Search</Label>

			<Input
				ref={inputRef}
				type="search"
				id="search"
				name="search"
				placeholder="Search"
				value={searchValue}
				onChange={(e) => setSearchValue(e.target.value)}
				onFocus={() => setIsActive(true)}
				onBlur={handleBlur}
				className={`p-3 text-lg w-full text-primary bg-transparent ${isActive ? "focus-visible:ring-0": ""}`}
			/>

			<button
				onFocus={() => setIsActive(true)}
				onBlur={handleBlur}
				type="submit"
				className={` grid absolute -top-1 size-10 transition-all  items-center justify-center border border-primary p-1 hover:bg-darkBlue hover:text-white hover:border-white
				${isActive ? "left-[15rem] duration-500 bg-darkBlue text-white border-none" : 'bg-transparent duration-500 left-0 rounded-full'}`}
			>
				<SearchIcon />
			</button>
		</div>
	)
}

export default SearchButton
