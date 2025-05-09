// src/components/multi-select.tsx

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import {
	CheckIcon,
	XCircle,
	XIcon,
	ArrowDownRight,
	X,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover"
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
} from "@/components/ui/command"
import { useState } from "react"
import { FormControl, FormItem, FormLabel } from "./form"
import { ControllerRenderProps } from "react-hook-form"


const multiSelectVariants = cva(
	"m-1 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300",
	{
		variants: {
			variant: {
				default:
					"border-foreground/10 text-foreground bg-card hover:bg-card/80",
				secondary:
					"border-foreground/10 bg-secondary text-secondary-foreground hover:bg-secondary/80",
				destructive:
					"border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
				inverted: "inverted",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	}
)

interface MultiSelectProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
	VariantProps<typeof multiSelectVariants> {
	options: {
		label: string
		value: string
	}[]
	field: ControllerRenderProps<any, any>
	onValueChange: (value: string[]) => void
	label: string
	placeholder?: string
	maxCount?: number
	className?: string
	defaultValue?: string[]
	/**
	 * The modality of the popover. When set to true, interaction with outside elements
	 * will be disabled and only popover content will be visible to screen readers.
	 * Optional, defaults to false.
	 */
	modalPopover?: boolean
	/**
	 * If true, renders the multi-select component as a child of another component.
	 * Optional, defaults to false.
	 */
	asChild?: boolean
}

export const MultiSelect = React.forwardRef<
	HTMLButtonElement,
	MultiSelectProps
>(
	(
		{
			field,
			options,
			label,
			onValueChange,
			variant,
			defaultValue = [],
			placeholder = "Select options",
			maxCount = 10,
			modalPopover = false,
			asChild = false,
			className,
			...props
		},
		ref
	) => {
		const [selectedValues, setSelectedValues] = useState<string[]>(defaultValue)
		const [open, setOpen] = useState(false)


		const handleInputKeyDown = (
			event: React.KeyboardEvent<HTMLInputElement>
		) => {
			if (event.key === "Enter") {
				setOpen(true)
			} else if (event.key === "Backspace" && !event.currentTarget.value) {
				const newSelectedValues = [...selectedValues]
				newSelectedValues.pop()
				setSelectedValues(newSelectedValues)
				onValueChange(newSelectedValues)
			}
		}

		const toggleOption = (option: string) => {
			const newSelectedValues = selectedValues.includes(option)
				? selectedValues.filter((value) => value !== option)
				: [...selectedValues, option]
			setSelectedValues(newSelectedValues)
			onValueChange(newSelectedValues)
		}

		const handleClear = () => {
			setSelectedValues([])
			onValueChange([])
		}

		const handleTogglePopover = () => {
			setOpen((prev) => !prev)
		}

		const clearExtraOptions = () => {
			const newSelectedValues = selectedValues.slice(0, maxCount)
			setSelectedValues(newSelectedValues)
			onValueChange(newSelectedValues)
		}

		//> todo for every selection over 3, add .50 to the price and show in input button
		return (
			<FormItem className="grid">
				<FormLabel className="mb-1" htmlFor="colors">{label}</FormLabel>
				<Popover
					open={open}
					onOpenChange={setOpen}
					modal={modalPopover}
				>
					<PopoverTrigger asChild>
						<FormControl>
							<button
								type="button"
								role="select"
								className='group inline-flex h-auto min-h-14 w-full items-center justify-between border bg-input px-3 py-1 text-base text-muted shadow-sm placeholder:text-muted'
								{...field}
								value={undefined}
								onChange={undefined}
								onClick={() => setOpen(!open)}
								ref={ref}
								{...props}
							>
								{selectedValues.length > 0 ? (
									<div className="flex w-full items-center justify-between">
										<div className="flex flex-wrap items-center">
											{selectedValues.slice(0, maxCount).map((value) => {
												const option = options.find((o) => o.value === value)
												return (
													<Badge
														key={value}
														className={cn(
															multiSelectVariants({ variant })
														)}
													>

														{option?.label}
														<XCircle
															className="ml-2 h-4 w-4 cursor-pointer"
															onClick={(event) => {
																event.stopPropagation()
																toggleOption(value)
															}}
														/>
													</Badge>
												)
											})}
											{selectedValues.length > maxCount && (
												<Badge
													className={cn(
														"bg-transparent text-foreground border-foreground/1 hover:bg-transparent",
														multiSelectVariants({ variant })
													)}
												>
													{`+ ${selectedValues.length - maxCount} more`}
													<XCircle
														className="ml-2 h-4 w-4 cursor-pointer"
														onClick={(event) => {
															event.stopPropagation()
															clearExtraOptions()
														}}
													/>
												</Badge>
											)}
										</div>
										<div className="flex items-center justify-between">
											<X
												className="mx-2 h-4 cursor-pointer text-muted-foreground hover:scale-125 hover:text-black"
												onClick={(event) => {
													event.stopPropagation()
													handleClear()
												}}
											/>
											<ArrowDownRight size={18} className={`ml-auto text-muted duration-300 group-hover:rotate-45 group-hover:text-black`} />

										</div>
									</div>
								) : (
									<div className="mx-auto flex w-full items-center justify-between">
										<span className="text-muted-foreground">
											{placeholder}
										</span>
										<ArrowDownRight size={18} className={`ml-auto text-muted duration-300 group-hover:rotate-45 group-hover:text-black`} />

									</div>
								)}
							</button>
						</FormControl>
					</PopoverTrigger>
					<PopoverContent
						className="w-auto p-0"
						align="start"
						onEscapeKeyDown={() => setOpen(false)}
					>
						<Command>
							<CommandInput
								placeholder="Search..."
								onKeyDown={handleInputKeyDown}
								id="colors"
							/>
							<CommandList>
								<CommandEmpty>No results found.</CommandEmpty>
								<CommandGroup id="colors">
									{options.map((option) => {
										const isSelected = selectedValues.includes(option.value)
										return (
											<CommandItem
												key={option.value}
												onSelect={() => toggleOption(option.value)}
												className="group cursor-pointer"
											>
												<span>{option.label}</span>
												<div
													className={cn(
														"ml-auto size-3 rounded-full bg-accent group-hover:bg-primary-foreground",
														isSelected
															? "opacity-100"
															: "opacity-0"
													)}
												/>
											</CommandItem>
										)
									})}
								</CommandGroup>
								<CommandSeparator />
								<CommandGroup>
									<div className="flex items-center justify-between">
										{selectedValues.length > 0 && (
											<>
												<CommandItem
													onSelect={handleClear}
													className="flex-1 cursor-pointer justify-center"
												>
													Clear
												</CommandItem>
											</>
										)}
										<CommandItem
											onSelect={() => setOpen(false)}
											className="max-w-full flex-1 cursor-pointer justify-center"
										>
											Close
										</CommandItem>
									</div>
								</CommandGroup>
							</CommandList>
						</Command>
					</PopoverContent>
				</Popover>
			</FormItem>
		)
	}
)

MultiSelect.displayName = "MultiSelect"