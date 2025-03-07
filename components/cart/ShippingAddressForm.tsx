"use client"

import { useToast } from "@/hooks/use-toast"
import { shippingAddressDefaultValues } from "@/lib/constants"
import { shippingAddressSchema } from "@/lib/validators"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useTransition } from "react"
import { ControllerRenderProps, useForm, SubmitHandler } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { AnimatedDiv } from "../ui/AnimatedDiv"
import { ArrowUpRight } from "lucide-react"
import { PiSpinnerBallDuotone } from "react-icons/pi"
import { updateUserAddress } from "@/lib/actions/users.actions"
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { useCheckout } from "@/context/CheckoutContext"

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
			<Card className="p-5 max-w-md mx-auto">
				<CardHeader>
					<CardTitle className="text-2xl px-0">
						Shipping Address
					</CardTitle>
					<CardDescription className="-mt-2 px-0 text-pretty">
						Please enter your shipping address

					</CardDescription>
				</CardHeader>

				<Form {...form}>
					<form
						method='post'
						className="space-y-5 mb-5"
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
											<Input {...field} className="w-full border" />
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
											<Input {...field} className="w-full border" />
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
											<Input {...field} className="w-full border" />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							>
							</FormField>
						</div>

						{/* zip code */}
						<div>
							<FormField
								control={form.control}
								name="zipCode"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Zip Code</FormLabel>
										<FormControl>
											<Input {...field} className="w-full border" />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							>
							</FormField>
						</div>

						{/* country */}
						<div>
							<FormField
								control={form.control}
								name="country"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Country</FormLabel>
										<FormControl>
											<Input {...field} className="w-full border mb-3" />
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