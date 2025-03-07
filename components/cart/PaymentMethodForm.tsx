"use client"

import { useRouter } from "next/navigation"
import { ChangeEvent, useRef, useState, useTransition } from "react"
import { ControllerRenderProps, useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { updateUserPaymentMethod } from "@/lib/actions/users.actions"
import { paymentMethodSchema } from "@/lib/validators"
import { useCheckout } from "@/context/CheckoutContext"
import { DEFAULT_PAYMENT_METHOD, PAYMENT_METHODS } from "@/lib/constants"
import { useToast } from "@/hooks/use-toast"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { PiSpinnerBallDuotone } from "react-icons/pi"
import { AnimatedDiv } from "../ui/AnimatedDiv"
import { ArrowUpRight } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import Checkbox from "../ui/Checkbox"

const PaymentMethodForm = () => {
	const [checked, setChecked] = useState(false)
	const checkBoxRef = useRef<HTMLInputElement>(null)
	const [pending, startTransition] = useTransition()
	const router = useRouter()
	const { toast } = useToast()
	const { user } = useCheckout()

	const form = useForm<z.infer<typeof paymentMethodSchema>>({
		resolver: zodResolver(paymentMethodSchema),
		defaultValues: {
			type: user.paymentMethod.type ?? DEFAULT_PAYMENT_METHOD
		}
	})

	const onSubmit = async (values: z.infer<typeof paymentMethodSchema>) => {
		startTransition(async () => {
			const res = await updateUserPaymentMethod(values)
			if (!res.success) {
				toast({
					variant: 'destructive',
					description: res.message
				})
				return
			}
			router.push('/place-order')
		})
	}

	const handleCheckBoxChange = (e: ChangeEvent<HTMLInputElement>) => {
		setChecked(e.target.checked)
	}

	return (
		<>
			<Card className="p-5 max-w-md mx-auto">
				<CardHeader>
					<CardTitle className="text-2xl px-0">
						Payment Method
					</CardTitle>
					<CardDescription className="-mt-2 px-0 text-pretty">
						Please choose your preferred payment method
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
								name="type"
								render={({ field }: { field: ControllerRenderProps<z.infer<typeof paymentMethodSchema>> }) => (
									<FormItem className="space-y-3 mb-2">
										<FormControl>
											<RadioGroup 
											name="type" 
											onValueChange={field.onChange} 
											className="flex flex-col space-y-2"
											value={field.value}
											>
												{PAYMENT_METHODS.map((method) => (
													<FormItem key={method} className="flex items-center space-x-3 space-y-0">
														<FormControl>
															<Checkbox
																id={method}
																name='type'
																checked={field.value === method}
																onChange={() => field.onChange(method)}
																ref={checkBoxRef}
																type="radio"
															/>

															{/* <RadioGroupItem value={method} checked={field.value === method} /> */}
														</FormControl>
														<FormLabel htmlFor="type">{method}</FormLabel>
													</FormItem>
												))}
											</RadioGroup>
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

			</Card>
		</>
	)
}

export default PaymentMethodForm