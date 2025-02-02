"use client"
import { ArrowDownRightSquareIcon, ArrowRightCircle, ArrowUpAZ, ArrowUpRight, Search, Send } from "lucide-react"
import { Form } from "./form"
import { Input } from "./input"
import { Button } from "./button"
import { useState } from "react"
import { cn } from "@/lib/utils"

const SearchInput = () => {
	const [isActive, setIsActive] = useState(false)

	return (
		<search>
			<label
				className="sr-only"
				htmlFor="search"
			>Search</label>
				<div className="relative ">
					<Input
						type="search"
						id="search"
						name="search"
						placeholder="Search"
						onChange={() => setIsActive(true)}
					/>
					<Button
						type="submit"
						className={cn(`absolute end-0 top-0 transition duration-200`, isActive ? "focus-within:rotate-45 focus-within:rounded-full focus-within:size-8 focus-within:mt-[2px] focus-within:mr-1" : null) }
						size={"icon"}
						variant={'secondary'}
					>
						{!isActive ? (
							<Search size={24} />
						): (
							<ArrowUpRight size={24}/>
						)}
					</Button>
				</div>

		</search>
	)
}

export default SearchInput