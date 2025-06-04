"use client"

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { Label } from "../ui/label"

type FilterSelectProps = {
	group: string
	placeholder: string
	list: {
		value: string
		label: string
	}[]
}

export function FilterSelect({group, placeholder, list}: FilterSelectProps) {
	return (
		<div className="grid gap-1">

		<Label>{group}</Label>
		<Select>
			<SelectTrigger className="w-64">
				<SelectValue placeholder={placeholder} />
			</SelectTrigger>
			<SelectContent>
					{list.map((item) => (
						<SelectItem value={item.value}>{item.label}</SelectItem>
						
					))}
			</SelectContent>
		</Select>
					</div>
	)
}
