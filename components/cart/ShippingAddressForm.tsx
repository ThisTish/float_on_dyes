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
	const [userAddress, setUserAddress] = useState<z.infer<typeof shippingAddressSchema>>()
	const [suggestedAddress, setSuggestedAddress] = useState<z.infer<typeof shippingAddressSchema>>()
	const [buttonType, setButtonType] = useState<'Continue' | 'Save as is' | 'Revalidate'>('Continue')
	const [fieldsNeedingReview, setFieldsNeedingReview] = useState<string[]>([])
	const [needsRevalidation, setNeedsRevalidation] = useState(false)

	const router = useRouter()
	const { toast } = useToast()
	const [pending, startTransition] = useTransition()

	const { user } = useCheckout()
	if (!user) router.push('/sign-in')

	const form = useForm<z.infer<typeof shippingAddressSchema>>({
		resolver: zodResolver(shippingAddressSchema),
		defaultValues: user.address || shippingAddressDefaultValues
	})


	const onValidateSubmit: SubmitHandler<z.infer<typeof shippingAddressSchema>> = async (values) => {
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

			// missing or unconfirmed results
			if (res.success && (res.missingComponentTypes || res.unconfirmedComponentTypes)) {
				const missingUnconfirmedTypes = [...res.missingComponentTypes, ...res.unconfirmedComponentTypes]
				const componentTypeToField: Record<string, keyof z.infer<typeof shippingAddressSchema>> = {
					'locality': 'city',
					'administrative_area_level_1': 'state',
					'postal_code': 'zipCode',
					'route': 'streetAddress',
					'street_number': 'streetAddress',
					'subpremise': 'subpremise',
					'country': 'country',
				}

				const missingUnconfirmedFieldNames = missingUnconfirmedTypes
					.map((type) => componentTypeToField[type])
					.filter(Boolean)

				const missingUnconfirmedTypesFormatted = missingUnconfirmedTypes
					.join(', ')
					.replace('administrative_area_level_1', 'state')
					.replace('locality', 'city')
					.replaceAll('_', ' ')

				setNeedsRevalidation(true)
				setFieldsNeedingReview(missingUnconfirmedFieldNames)

				setButtonType('Save as is')
				form.formState.isDirty ? setButtonType('Revalidate') : setButtonType('Save as is')

				toast({
					variant: 'destructive',
					title: "Missing or unconfirmed information",
					description: `Please check ${missingUnconfirmedTypesFormatted} and try again.`,
				})
			}

			// has a suggested address
			if (res.success && res.componentData) {
				const specialComponents = res.componentData.components.filter((c: any) => c.replaced || c.inferred)
				setUserAddress(values)
				setSuggestedAddress(res.componentData.suggestedAddress)
				setIsDialogOpen(true)
				setNeedsRevalidation(false)
			}

			if (res.success && res.correct) {
				router.push('/payment-method')
			}
		})
	}

	const isNeedingReview = (componentField: string) => {
		return needsRevalidation && fieldsNeedingReview.includes(componentField)
	}



	// REALLY saving no matter what
	const sureSubmit: SubmitHandler<z.infer<typeof shippingAddressSchema>> = async (values) => {
		console.log('sureSubmit')
		startTransition(async () => {
			const res = await updateUserAddress(values)
			console.log('sureSubmit res', res)
			if (!res.success) {
				toast({
					variant: 'destructive',
					title: "Could not save address",
					description: `${res.message}, please try again or reach out via our contact page`
				})
			}
			router.push('/payment-method')
		})
	}

	const saveAndCloseAction = () => {
		setIsDialogOpen(false)
		sureSubmit(userAddress as z.infer<typeof shippingAddressSchema>)

	}
	const updateAndCloseAction = () => {
		console.log('updateAndCloseAction')
		setIsDialogOpen(false)
		setNeedsRevalidation(false)
		sureSubmit(suggestedAddress as z.infer<typeof shippingAddressSchema>)
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
						onSubmit={
							buttonType === 'Save as is'
								? form.handleSubmit(sureSubmit)
								: form.handleSubmit(onValidateSubmit)
						}
					>
						{/* name */}
						<FormField
							control={form.control}
							name="fullName"
							render={({ field }: { field: ControllerRenderProps<z.infer<typeof shippingAddressSchema>> }) => (
								<FormItem>
									<FormLabel>Full Name</FormLabel>
									<FormControl>
										<Input {...field} name={field.name} className="w-full border" autoComplete="name" />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* street address */}
						<FormField
							control={form.control}
							name="streetAddress"
							render={({ field }) => (
								<FormItem className={isNeedingReview('streetAddress') ? 'text-destructive' : ''}>
									<FormLabel>Street Address</FormLabel>
									<FormControl>
										<Input
											{...field}
											name={field.name}
											className="w-full border"
											autoComplete="address-line1"
											placeholder="House number and street name"
											onChange={(e) => {
												field.onChange(e)
												if (isNeedingReview('streetAddress')) {
													setButtonType('Revalidate')
												}
											}}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* street address 2 */}
						<FormField
							control={form.control}
							name="subpremise"
							render={({ field }) => (
								<FormItem className={isNeedingReview('subpremise') ? 'text-destructive' : ''}>
									<FormLabel>Address Line 2</FormLabel>
									<FormControl>
										<Input
											{...field}
											name={field.name}
											className="w-full border"
											autoComplete="address-line2"
											placeholder="Apt, suite, unit, etc"
											onChange={(e) => {
												field.onChange(e)
												if (isNeedingReview('subpremise')) {
													setButtonType('Revalidate')
												}
											}}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* city */}
						<FormField
							control={form.control}
							name="city"
							render={({ field }) => (
								<FormItem className={isNeedingReview('city') ? 'text-destructive' : ''}>
									<FormLabel>City</FormLabel>
									<FormControl>
										<Input
											{...field}
											name={field.name}
											className="w-full border"
											autoComplete="address-level2"
											placeholder="City"
											onChange={(e) => {
												field.onChange(e)
												if (isNeedingReview('city')) {
													setButtonType('Revalidate')
												}
											}}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* state */}
						<FormField
							control={form.control}
							name='state'
							render={({ field }) => (
								<FormItem className={isNeedingReview('state') ? 'text-destructive' : ''}>
									<FormLabel>State/Region</FormLabel>
									<FormControl>
										<Input
											{...field}
											name={field.name}
											className="w-full border"
											autoComplete="address-level1"
											placeholder="State or Region"
											onChange={(e) => {
												field.onChange(e)
												if (isNeedingReview('state')) {
													setButtonType('Revalidate')
												}
											}}
										/>
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
								<FormItem className={isNeedingReview('zipCode') ? 'text-destructive' : ''}>
									<FormLabel>Zip Code</FormLabel>
									<FormControl>
										<Input
											{...field}
											name={field.name}
											className="w-full border"
											autoComplete="postal-code"
											onChange={(e) => {
												field.onChange(e)
												if (isNeedingReview('zipCode')) {
													setButtonType('Revalidate')
												}
											}}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* country */}
						<FormField
							control={form.control}
							name='country'
							render={({ field }) => (
								<div className={isNeedingReview('country') ? 'text-destructive' : ''}>
									<ComboBox field={field} label="Country" list={COUNTRIES} placeholder="Select Country" />
								</div>
							)}
						/>


						<Button variant={'cta'} disabled={pending} className="w-full">
							{pending ? (
								<>
									<span className="animate-pulse">Saving</span>
									<PiSpinnerBallDuotone className="animate-spin" />
								</>
							) : (
								<>
									<span>{buttonType}</span>
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
