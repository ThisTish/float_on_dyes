import { cn } from "@/lib/utils"
import { Check, ArrowDownRight } from "lucide-react"
import { ControllerRenderProps } from "react-hook-form"
import { FormItem, FormLabel, FormControl, FormMessage } from "../ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command"
import { useState } from "react"

type ComboBoxProps = {
	field: ControllerRenderProps<any, any>,
	label: string,
	list: { value: string, label: string }[],
	placeholder?: string
}

const ComboBox = ({ field, label, list, placeholder }: ComboBoxProps) => {
	const [open, setOpen] = useState(false)

	return (
		<FormItem className="grid">
			<FormLabel>{label}</FormLabel>
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<FormControl>
						<button
							type="button"
							role="combobox"
							className="group inline-flex h-9 w-full justify-between border bg-input px-3 py-1 text-base text-black shadow-sm"
							{...field}
							value={undefined}
							onChange={undefined}
							onClick={() => setOpen(!open)}
						>
							{field.value
								? list.find(
									(item) => item.value === field.value
								)?.label
								: placeholder || `Select ${label}`}
							<ArrowDownRight size={18} className={`ml-auto text-muted duration-300 group-hover:rotate-45 group-hover:text-primary`} />
						</button>
					</FormControl>
				</PopoverTrigger>

				<PopoverContent className="w-[var(--radix-popover-trigger-width)]">
					<Command>
						<CommandInput
							placeholder={placeholder || `Search ${label}...`}
						/>
						<CommandList>
							<CommandEmpty>{label} Not Found</CommandEmpty>
							<CommandGroup>
								{list.map((item) => (
									<CommandItem
										value={item.value}
										key={item.value}
										onSelect={() => {
											field.onChange(item.value)
											setOpen(false) // Close the popover when an item is selected
										}}
									>
										{item.label}
										<Check
											className={cn(
												"ml-auto",
												item.value === field.value
													? "opacity-100"
													: "opacity-0"
											)}
										/>
									</CommandItem>
								))}
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
			<FormMessage />
		</FormItem>
	)
}

export default ComboBox