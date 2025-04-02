import { STATES } from "@/lib/constants/places"
import { cn } from "@/lib/utils"
import { Popover, PopoverTrigger, PopoverContent } from "@radix-ui/react-popover"
import { CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "cmdk"
import { ArrowDownRight, Command, Check } from "lucide-react"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "../ui/form"
import { ChangeEvent, forwardRef } from "react"


type ComboBoxProps = {
	form: any,
	user: { address: { state: string } },
	label: string,
	list: { value: string, label: string }[],
	onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const ComboBox = forwardRef<HTMLInputElement, ComboBoxProps>(({ form, user, label, list, onChange }, ref) => {
	return (
		<FormField
			control={form.control}
			name="state"
			render={({ field }) => (
				<FormItem className="grid">
					<FormLabel>State</FormLabel>
					<Popover>

						<PopoverTrigger asChild>
							<FormControl>
								<button
									role="combobox"
									className="group inline-flex h-9 w-full justify-between border bg-input px-3 py-1 text-base text-black shadow-sm"
								>
									{field.value
										? STATES.find(
											(state) => state.value === field.value
										)?.label
										: ""
									}
									<ArrowDownRight size={18} className={`ml-auto text-muted duration-300 group-hover:rotate-45 group-hover:text-primary`} />
								</button>
							</FormControl>
						</PopoverTrigger>

						<PopoverContent className="w-[var(--radix-popover-trigger-width)]">
							<Command>
								<CommandInput
									placeholder={user.address ? user.address.state : "Select State"}
									autoComplete="address-level1"
								/>
								<CommandList>
									<CommandEmpty>State Not Found</CommandEmpty>
									<CommandGroup>
										{STATES.map((state) => (
											<CommandItem
												value={state.value}
												key={state.value}
												onSelect={() => {
													form.setValue("state", state.value)
												}}
											>
												{state.label}
												<Check
													className={cn(
														"ml-auto",
														state.value === field.value
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
			)}
		>
		</FormField>

	)
})

export default ComboBox