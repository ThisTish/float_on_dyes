"use client"

import { useToast } from "@/hooks/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSession } from "next-auth/react"
import { ControllerRenderProps, useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { updateNameEmailImageSchema } from "@/lib/validators"
import { Button } from "../ui/button"
import { PiSpinnerBallDuotone } from "react-icons/pi"
import { FaRegSave } from "react-icons/fa"
import { updateUserProfile } from "@/lib/actions/users.actions"
import { Avatar, AvatarFallback } from "../ui/avatar"
import Image from "next/image"
import { BiUserCircle } from "react-icons/bi"
import { AnimatedDiv } from "../ui/AnimatedDiv"

const UserProfileForm = () => {
	const { data: session, update } = useSession()


	const form = useForm<z.infer<typeof updateNameEmailImageSchema>>({
		resolver: zodResolver(updateNameEmailImageSchema),
		defaultValues: {
			name: session?.user.name || undefined,
			email: session?.user.email || undefined,
			image: session?.user.image || undefined
		}
	})

	const { toast } = useToast()

	const onSubmit = async (values: z.infer<typeof updateNameEmailImageSchema>) => {
		const res = await updateUserProfile(values)

		if (!res.success) {
			return toast({
				variant: 'destructive',
				description: res.message
			})
		}

		const newSession = {
			...session,
			user: {
				...session?.user,
				name: values.name,
				email: values.email,
				image: values.image

			}
		}

		await update(newSession)

		toast({
			variant: 'default',
			description: res.message
		})
	}

	return (
		<Form {...form}>
			<form
				className="mt-1 flex flex-col gap-5"
				onSubmit={form.handleSubmit(onSubmit)}
			>
				<>
					{session?.user.isOauth ? (
						<div className="text-balance text-sm text-destructive">Signing in with Google or Discord will limit what you can update.</div>
					) : null}
					<div className="flex flex-col gap-5">

						{/* avatar */}
						<FormField
							control={form.control}
							name="image"
							render={({ field }: { field: ControllerRenderProps<z.infer<typeof updateNameEmailImageSchema>> }) => (
								<FormItem className="w-full">
									<FormLabel>Image</FormLabel>
									<FormControl><div className="-mb-1 flex items-center gap-5">
										<Avatar className="h-10 w-10">
											{session?.user.image
												? (
													<Image
														src={session.user.image}
														alt="user avatar"
														width={40}
														height={40}
													/>
												) : (
													<AvatarFallback className="size-10 border border-primary bg-transparent font-extrabold text-primary transition-all duration-300 ease-in hover:border-white hover:bg-darkBlue hover:text-white">
														{session?.user.name?.charAt(0).toUpperCase() || <BiUserCircle size={40} />}
													</AvatarFallback>
												)
											}
										</Avatar>
										<Button size={'sm'} disabled={session?.user.isOauth}>
											Change Picture
										</Button>
									</div>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* name */}
						<FormField
							control={form.control}
							name="name"
							render={({ field }: { field: ControllerRenderProps<z.infer<typeof updateNameEmailImageSchema>> }) => (
								<FormItem className="w-full">
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input {...field} type="text" className="w-full border" />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* email */}
						<FormField
							control={form.control}
							name="email"
							render={({ field }: { field: ControllerRenderProps<z.infer<typeof updateNameEmailImageSchema>> }) => (
								<FormItem className="w-full">
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input {...field} type="email" disabled={session?.user.isOauth} className="w-full border" />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button type="submit" disabled={form.formState.isSubmitting || !form.formState.isDirty}>
							Save
							{form.formState.isSubmitting
								? <PiSpinnerBallDuotone className="animate-spin" />
								: <AnimatedDiv animation={'pulse'} >
									<FaRegSave />
								</AnimatedDiv>
							}
						</Button>

					</div>
				</>
			</form>
		</Form>

	)
}

export default UserProfileForm