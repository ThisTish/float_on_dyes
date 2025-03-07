import { ArrowDownRight } from "lucide-react"

const SelectInput = () => {
	return (
		<div
			className="relative group w-64 overflow-hidden"
		>
			<ArrowDownRight className="absolute right-2 top-2 group-hover:rotate-45 duration-300 transition" />
			<select
				className="appearance-none flex text-black h-9 w-full bg-input px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"

			>
				<option>HTML</option>
				<option>React</option>
				<option>Vue</option>
				<option>Angular</option>
				<option>Svelte</option>
			</select>
		</div>

	)
}

export default SelectInput