"use client"

import { sendContactEmailSchema } from "@/lib/validators"
import { ControllerRenderProps, SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"
import { Card, CardHeader, CardTitle, CardDescription } from "../ui/card"
import { FormField, Form, FormItem, FormLabel, FormControl, FormMessage } from "../ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { sendContactEmail } from "@/lib/actions/email.actions"
import { useTransition } from "react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import Image from "next/image"
import { APP_NAME } from "@/lib/constants"
import { Button } from "../ui/button"
import { PiSpinnerBallDuotone } from "react-icons/pi"
import { AnimatedDiv } from "../ui/AnimatedDiv"
import { Send } from "lucide-react"
import { ToastAction } from "../ui/toast"


const ContactForm = () => {
	const [pending, startTransition] = useTransition()

	const { toast } = useToast()

	const form = useForm<z.infer<typeof sendContactEmailSchema>>({
		resolver: zodResolver(sendContactEmailSchema),
		defaultValues: {
			name: '',
			email: '',
			message: ''
		}
	})

	const onSubmit: SubmitHandler<z.infer<typeof sendContactEmailSchema>> = async (values) => {
		startTransition(async () => {

			const formData = new FormData()
			formData.append('name', values.name)
			formData.append('email', values.email)
			formData.append('message', values.message)

			const res = await sendContactEmail(undefined, formData)
			if (!res.success) {
				toast({
					variant: 'destructive',
					title: "Error sending message",
					description: 'Try again later or contact us via email.',
					action:
						<ToastAction altText="FloatOnDyes email" onClick={() => window.location.href = `mailto:floatondyes@gmail.com`}>FloatOnDyes@gmail.com</ToastAction>
				})
				return
			}
			toast({
				variant: 'default',
				title: "Message sent!",
				style: { maxWidth: '200px', fontSize: '1.2rem' }
			})
			form.reset()
		})
	}


	return (
		<Card className="mx-auto w-full max-w-md bg-lightGreen p-5 dark:bg-card">
			<CardHeader className="inline-flex flex-row gap-10 px-10">
				<Link href={'/'} className="flex">
					<Image
						src={'/images/logo.svg'}
						width={50}
						height={50}
						alt={`${APP_NAME} logo`}
						priority
					/>
				</Link>
				<CardTitle className="text-pretty px-0 text-lg md:text-2xl">
					Send us a message
				</CardTitle>
			</CardHeader>
			<CardDescription className="-mt-2 mb-3 text-pretty px-0">
				Fill out the form and we will reply as soon as possible.
			</CardDescription>

			<Form {...form}>
				<form
					method='post'
					className="mb-5 space-y-5"
					onSubmit={form.handleSubmit(onSubmit)}
				>
					<div className="flex flex-col gap-3 md:flex-row">

						{/* name */}
						<FormField
							control={form.control}
							name="name"
							render={({ field }: { field: ControllerRenderProps<z.infer<typeof sendContactEmailSchema>> }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input {...field} type="text" name={field.name} autoComplete="name" className="w-full" />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* email */}
						<FormField
							control={form.control}
							name="email"
							render={({ field }: { field: ControllerRenderProps<z.infer<typeof sendContactEmailSchema>> }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input {...field} type="text" name={field.name} autoComplete="email" className="w-full" />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					{/* message */}
					<FormField
						control={form.control}
						name="message"
						render={({ field }: { field: ControllerRenderProps<z.infer<typeof sendContactEmailSchema>> }) => (
							<FormItem>
								<FormLabel>Message</FormLabel>
								<FormControl>
									<Textarea {...field} name={field.name} className="w-full" rows={5} />
								</FormControl>
								<FormMessage />
							</FormItem>
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
								<span>Send</span>
								<AnimatedDiv variant={'cta'} animation={'rotate'}>
									<Send />
								</AnimatedDiv>
							</>
						)}
					</Button>
				</form>
			</Form>
		</Card>
	)
}

export default ContactForm