"use client"

import { useToast } from "@/hooks/use-toast"
import { shippingAddressDefaultValues } from "@/lib/constants"
import { COUNTRIES } from "@/lib/constants/places"
import { shippingAddressSchema } from "@/lib/validators"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"
import { useCheckout } from "@/context/CheckoutContext"
import { ControllerRenderProps, useForm, SubmitHandler } from "react-hook-form"
import { z } from "zod"
import { updateUserAddress, validateShippingAddress } from "@/lib/actions/address.actions"
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { AnimatedDiv } from "../ui/AnimatedDiv"
import { ArrowUpRight } from "lucide-react"
import { PiSpinnerBallDuotone } from "react-icons/pi"
import ComboBox from "./ComboBox"
import ValidateAddressDialog from "./ValidateAddressDialog"

const ShippingAddressForm = () => {
	const [isDialogOpen, setIsDialogOpen] = useState(false)
	const [isDisabled, setIsDisabled] = useState(false)
	const [userAddress, setUserAddress] = useState<z.infer<typeof shippingAddressSchema>>()
	const [suggestedAddress, setSuggestedAddress] = useState<z.infer<typeof shippingAddressSchema>>()


	const router = useRouter()
	const { toast } = useToast()
	const [pending, startTransition] = useTransition()

	const { user } = useCheckout()
	if (!user) router.push('/sign-in')

	const form = useForm<z.infer<typeof shippingAddressSchema>>({
		resolver: zodResolver(shippingAddressSchema),
		defaultValues: user.address || {}
	})


	const onSubmit: SubmitHandler<z.infer<typeof shippingAddressSchema>> = async (values) => {
		startTransition(async () => {
			const res = await validateShippingAddress(values)
			if (!res.success) {
				toast({
					variant: 'destructive',
					title: "Please check your address",
					description: res.message
				})
				return
			}
			if (res.success && (res.missingComponentTypes || res.unconfirmedComponentTypes)) {
				// setIsDisabled(true)
				const missingUnconfirmedTypes = [...res.missingComponentTypes, ...res.unconfirmedComponentTypes]
				const missingUnconfirmedTypesFormatted = missingUnconfirmedTypes.join(', ').replace('administrative_area_level_1', 'state').replace('locality', 'city').replaceAll('_', ' ')
				toast({
					variant: 'destructive',
					title: "Missing or unconfirmed information",
					description: `Please check ${missingUnconfirmedTypesFormatted} and try again.`,
				})
			}

			if (res.success && res.componentData) {

				const specialComponents = res.componentData.components.filter((c: any) => c.replaced || c.inferred)
				setUserAddress(values)
				setSuggestedAddress(res.componentData.suggestedAddress)
				setIsDialogOpen(true)
			}
			console.log(res)
			// router.push('/payment-method')
		})
	}

	const saveAndCloseAction = () => {
		setIsDialogOpen(false)
		console.log('Save and close action')
	}
	const updateAndCloseAction = () => {
		setIsDialogOpen(false)
		console.log('update and close action')
	}

	const closeAction = () => {
		setIsDialogOpen(false)
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


						{/* street address */}

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

						{/* street address 2 */}

						<FormField
							control={form.control}
							name="subpremise"
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


						{/* city */}

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


						{/* state */}
						<FormField
							control={form.control}
							name='state'
							render={({ field }) => (
								<FormItem>
									<FormLabel>State/Region</FormLabel>
									<FormControl>
										<Input {...field} className="w-full border" autoComplete="address-level1" />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>


						{/* zip code */}

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


						<FormField
							control={form.control}
							name='country'
							render={({ field }) => (

								<ComboBox field={field} label="Country" list={COUNTRIES} placeholder="Select Country" />)} />


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
							)}
						</Button>
					</form>
				</Form>

			</Card>

			{isDialogOpen && suggestedAddress ? (
				<ValidateAddressDialog
					isOpen={isDialogOpen}
					values={userAddress ? userAddress : form.getValues()}
					suggestedAddress={suggestedAddress}
					updateAndCloseAction={updateAndCloseAction}
					saveAndCloseAction={saveAndCloseAction}
					closeAction={closeAction}
				/>
			) : null
			}
		</>
	)

}

export default ShippingAddressForm
