"use client"

import { useToast } from "@/hooks/use-toast"
import { shippingAddressDefaultValues } from "@/lib/constants"
import { COUNTRIES, STATES } from "@/lib/constants/places"
import { shippingAddressSchema } from "@/lib/validators"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useTransition } from "react"
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
			const res = await validateShippingAddress(values)
			if (!res.success || !res.isValid) {
				toast({
					variant: 'destructive',
					title: "Please check your address",
					description: res.message
				})
				return
			}

			if(!res.isValid)

			console.log(res)
			// router.push('/payment-method')
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
		</>
	)
}

export default ShippingAddressForm