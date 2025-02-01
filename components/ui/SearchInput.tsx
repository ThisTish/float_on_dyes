"use client"
import { Search, Send } from "lucide-react"
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
				<div className="relative">
					<Input
						type="search"
						id="search"
						name="search"
						placeholder="Search"
						onChange={() => setIsActive(true)}
					/>
					<Button
						type="submit"
						className={cn(`absolute end-0 top-0 transition duration-200`, isActive ? "focus-within:rotate-45 focus-within:rounded-full" : null) }
						size={"icon"}
						variant={'secondary'}
					>
						{!isActive ? (
							<Search size={24} />
						): (
							<Send size={24}/>
						)}
					</Button>
				</div>

		</search>
	)
}

export default SearchInput