// ! not using atm

import { ArrowDownRight } from "lucide-react"
import Image from "next/image"
import { ControllerRenderProps } from "react-hook-form"

type SelectInputProps = {
	field: ControllerRenderProps<any, any>,
	label: string,
	list: {},
	placeholder?: string
}

const SelectInput = ({ field, label, list, placeholder }: SelectInputProps) => {

	return (
		<div
			className="group relative w-64 overflow-hidden"
		>
			<ArrowDownRight className="absolute right-2 top-2 transition duration-300 group-hover:rotate-45" />
			<select
				className="flex h-9 w-full appearance-none bg-input px-3 py-1 text-base text-black shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"

			>
				<option className="flex items-center justify-between">
					Disc Brand plastic weight price
				</option>
				<option>React</option>
				<option>Vue</option>
				<option>Angular</option>
				<option>Svelte</option>
			</select>
		</div>

	)
}

export default SelectInput