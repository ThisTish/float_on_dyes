"use client"
import { Search } from "lucide-react"
import { Label } from "./label"
import { Input } from "./input"
import { useState, useRef } from "react"
import { Button } from "./button"

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
			className={`relative ml-2.5 bg-primary-foreground size-10 shadow-md rounded-full flex items-center duration-500 ${isActive ? "w-64 rounded-none" : "group hover:w-64 hover:rounded-none"
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
				className="p-3 mt-[1px] text-lg w-full text-primary bg-transparent"
			/>

			<Button
				variant="secondary"
				size="icon"
				onFocus={() => setIsActive(true)}
				onBlur={handleBlur}
				type="submit"
				className={`absolute top-0 size-10 content-center bg-darkBlue text-white transition-all
				${isActive ? "left-64 duration-700" :  'duration-500 left-0 rounded-full group-hover:left-64 group-hover:rounded-none' }`}
			>
				<Search />
			</Button>
		</div>
	)
}

export default SearchButton
