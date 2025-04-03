"use client"

import { useToast } from "@/hooks/use-toast"
import { shippingAddressDefaultValues } from "@/lib/constants"
import { STATES } from "@/lib/constants/places"
import { shippingAddressSchema } from "@/lib/validators"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useTransition } from "react"
import { useCheckout } from "@/context/CheckoutContext"
import { ControllerRenderProps, useForm, SubmitHandler } from "react-hook-form"
import { z } from "zod"
import { updateUserAddress } from "@/lib/actions/users.actions"
import { cn } from "@/lib/utils"
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { AnimatedDiv } from "../ui/AnimatedDiv"
import { ArrowDownRight, ArrowUpRight, Check } from "lucide-react"
import { PiSpinnerBallDuotone } from "react-icons/pi"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command"
import ComboBox from "./ComboBox"

const ShippingAddressForm = () => {
	const router = useRouter()
	const { toast } = useToast()
	const [pending, startTransition] = useTransition()

	const { user } = useCheckout()
	if (!user) router.push('/sign-in')

	const form = useForm<z.infer<typeof shippingAddressSchema>>({
		resolver: zodResolver(shippingAddressSchema),
		defaultValues: user.address || shippingAddressDefaultValues
	})


	const onSubmit: SubmitHandler<z.infer<typeof shippingAddressSchema>> = async (values) => {
		startTransition(async () => {
			const res = await updateUserAddress(values)
			if (!res.success) {
				toast({
					variant: 'destructive',
					description: res.message
				})
				return
			}
			router.push('/payment-method')
		})
	}


	return (
		<>
			<Card className="mx-auto max-w-md p-5">
				<CardHeader>
					<CardTitle className="px-0 text-2xl">
						Shipping Address
					</CardTitle>
					<CardDescription className="-mt-2 text-pretty px-0">
						{user.address
							? 'Verify your shipping address' :
							'Please enter your shipping address'
						}

					</CardDescription>
				</CardHeader>

				<Form {...form}>
					<form
						method='post'
						className="mb-5 space-y-5"
						onSubmit={form.handleSubmit(onSubmit)}
					>
						{/* name */}
						<div>
							<FormField
								control={form.control}
								name="fullName"
								render={({ field }: { field: ControllerRenderProps<z.infer<typeof shippingAddressSchema>> }) => (
									<FormItem>
										<FormLabel>Full Name</FormLabel>
										<FormControl>
											<Input {...field} className="w-full border" autoComplete="given-name" />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							>
							</FormField>
						</div>

						{/* street address */}
						<div>
							<FormField
								control={form.control}
								name="streetAddress"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Street Address</FormLabel>
										<FormControl>
											<Input {...field} className="w-full border" autoComplete="address-line1" placeholder="House number and street name" />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							>
							</FormField>
						</div>
						{/* street address 2 */}
						<div>
							<FormField
								control={form.control}
								name="streetAddress2"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Address Line 2</FormLabel>
										<FormControl>
											<Input {...field} className="w-full border" autoComplete="address-line2" placeholder="Apt, suite, unit, etc" />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							>
							</FormField>
						</div>

						{/* city */}
						<div>
							<FormField
								control={form.control}
								name="city"
								render={({ field }) => (
									<FormItem>
										<FormLabel>City</FormLabel>
										<FormControl>
											<Input {...field} className="w-full border" autoComplete="address-level1" />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							>
							</FormField>
						</div>

						{/* state */}
						<FormField
							control={form.control}
							name='state'
							render={({ field }) => (

								<ComboBox field={field} label="State" list={STATES} placeholder="Select State" />)} />
						{/* <FormField
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
						</FormField> */}

						{/* zip code */}
						<div>
							<FormField
								control={form.control}
								name="zipCode"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Zip Code</FormLabel>
										<FormControl>
											<Input {...field} className="w-full border" autoComplete="postal-code" />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							>
							</FormField>
						</div>


						<Button variant={'cta'} disabled={pending} className="w-full">
							{pending ? (
								<>
									<span className="animate-pulse">Saving</span>
									<PiSpinnerBallDuotone className="animate-spin" />
								</>
							) : (
								<>
									<span>Continue</span>
									<AnimatedDiv variant={'cta'} animation={'rotate'}>
										<ArrowUpRight />
									</AnimatedDiv>
								</>
							)
							}
						</Button>
					</form>
				</Form>

			</Card>
		</>
	)
}

export default ShippingAddressForm