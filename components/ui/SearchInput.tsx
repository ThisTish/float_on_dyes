"use client"
import { ArrowDownRightSquareIcon, ArrowRightCircle, ArrowUpAZ, ArrowUpRight, Search, Send } from "lucide-react"
import { Form } from "./form"
import { Input } from "./input"
import { Button } from "./button"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Label } from "./label"

const SearchInput = () => {
	const [isActive, setIsActive] = useState(false)

	return (
		<search className="flex justify-center">
			<Label
				className="sr-only"
				htmlFor="search"
			>
				Search
			</Label>
			<div className="relative w-72">
				<Input
					type="search"
					id="search"
					name="search"
					placeholder="Search"
					onChange={() => setIsActive(true)}
				/>
				<Button
					type="submit"
					className={cn(`absolute end-0 top-0 transition duration-200`, isActive ? "focus-within:rotate-45 focus-within:rounded-full focus-within:size-8 focus-within:mt-[2px] focus-within:mr-1" : null)}
					size={"icon"}
					variant={'secondary'}
				>
					{!isActive ? (
						<Search size={24} />
					) : (
						<ArrowUpRight size={24} />
					)}
				</Button>
			</div>

		</search>
	)
}

export default SearchInput