"use client"

import { useToast } from "@/hooks/use-toast"
import { shippingAddressDefaultValues } from "@/lib/constants"
import { shippingAddressSchema } from "@/lib/validators"
import { ShippingAddress } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useTransition } from "react"
import { ControllerRenderProps, useForm, SubmitHandler } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { AnimatedDiv } from "../ui/AnimatedDiv"
import { ArrowUpRight } from "lucide-react"
import { PiSpinnerBallDuotone } from "react-icons/pi"
import { updateUserAddress } from "@/lib/actions/users.actions"

const ShippingAddressForm = ({ address }: { address: ShippingAddress }) => {
	const router = useRouter()
	const { toast } = useToast()
	const [pending, startTransition] = useTransition()

	const form = useForm<z.infer<typeof shippingAddressSchema>>({
		resolver: zodResolver(shippingAddressSchema),
		defaultValues: address || shippingAddressDefaultValues
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
			<div className="max-w-md mx-auto space-y-5 border">
				<h1 className="h2-bold mt-4">
					Shipping Address
				</h1>
				<p className="text-sm text-muted-foreground">
					Please enter your shipping address
				</p>

				<Form {...form}>
					<form
						method='post'
						className="space-y-3"
						onSubmit={form.handleSubmit(onSubmit)}
					>
						{/* name */}
						<div className="flex flex-col md:flex-row">
							<FormField
								control={form.control}
								name="fullName"
								render={({ field }: { field: ControllerRenderProps<z.infer<typeof shippingAddressSchema>> }) => (
									<FormItem>
										<FormLabel>Full Name</FormLabel>
										<FormControl>
											<Input {...field} className="w-full" />
										</FormControl>
									</FormItem>
								)}
							>
							</FormField>
						</div>

						{/* street address */}
						<div className="flex flex-col md:flex-row">
							<FormField
								control={form.control}
								name="streetAddress"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Street Address</FormLabel>
										<FormControl>
											<Input {...field} className="w-full" />
										</FormControl>
									</FormItem>
								)}
							>
							</FormField>
						</div>

						{/* city */}
						<div className="flex flex-col md:flex-row">
							<FormField
								control={form.control}
								name="city"
								render={({ field }) => (
									<FormItem>
										<FormLabel>City</FormLabel>
										<FormControl>
											<Input {...field} className="w-full" />
										</FormControl>
									</FormItem>
								)}
							>
							</FormField>
						</div>

						{/* zip code */}
						<div className="flex flex-col md:flex-row">
							<FormField
								control={form.control}
								name="zipCode"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Zip Code</FormLabel>
										<FormControl>
											<Input {...field} className="w-full" />
										</FormControl>
									</FormItem>
								)}
							>
							</FormField>
						</div>

						{/* country */}
						<div className="flex flex-col md:flex-row">
							<FormField
								control={form.control}
								name="country"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Country</FormLabel>
										<FormControl>
											<Input {...field} className="w-full" />
										</FormControl>
									</FormItem>
								)}
							>
							</FormField>
						</div>

						<Button variant={'cta'} disabled={pending} className="w-full">
							{pending ? (
								<>
									<span className="animate-pulse">Submitting</span>
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
			</div>
		</>
	)
}

export default ShippingAddressForm