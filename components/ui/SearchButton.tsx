"use client"
import { Label } from "./label"
import { Input } from "./input"
import { useState, useRef } from "react"
import { Button } from "./button"
import SearchIcon from "./searchIcon"
import Tooltip from "./Tooltip"


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
			className={`relative ml-2.5 bg-transparent size-10 rounded-full flex duration-500 ${isActive ? "w-48 md:w-64 rounded-none bg-white border-darkBlue border" : ""
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
				className={`p-3 text-lg w-full text-black bg-transparent ${isActive ? "focus-visible:ring-0" : ""}`}
			/>

			<button
				onFocus={() => setIsActive(true)}
				onBlur={handleBlur}
				type="submit"
				className={`grid absolute -top-1 size-10 transition-all items-center justify-center ease-in hover:bg-darkBlue hover:text-white ${isActive ? "left-[11rem] md:left-[15rem] duration-300 bg-darkBlue text-white" : 'bg-transparent duration-300 left-0 rounded-full'}`}
			>
				<Tooltip label="Search" position="bottom" className="mt-3">
					<SearchIcon />
				</Tooltip>
			</button>
		</div>
	)
}

export default SearchButton
