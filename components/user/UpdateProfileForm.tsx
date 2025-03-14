"use client"

import { useToast } from "@/hooks/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSession } from "next-auth/react"
import { ControllerRenderProps, useForm } from "react-hook-form"
import { set, z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { updatingUserProfileSchema } from "@/lib/validators"
import { Button } from "../ui/button"
import { PiSpinnerBallDuotone } from "react-icons/pi"
import { FaRegSave } from "react-icons/fa"
import { updateUserProfile } from "@/lib/actions/users.actions"
import { Avatar, AvatarFallback } from "../ui/avatar"
import Image from "next/image"
import { BiUserCircle } from "react-icons/bi"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"


// todo update user avatar with upload thing

const UserProfileForm = () => {
	const [disabled, setDisabled] = useState(false)
	const { data: session, update } = useSession()

	useEffect(() => {
		if (session?.user.isOAuth) setDisabled(true)
	}, [session])

	const form = useForm<z.infer<typeof updatingUserProfileSchema>>({
		resolver: zodResolver(updatingUserProfileSchema),
		defaultValues: {
			id: session?.user.id || undefined,
			name: session?.user.name || undefined,
			email: session?.user.email || undefined,
			image: session?.user.image || undefined,
			password: undefined,
			newPassword: undefined,
			confirmNewPassword: undefined
		}
	})

	const { toast } = useToast()

	const onSubmit = async (values: z.infer<typeof updatingUserProfileSchema>) => {
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
				name: values.name
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
						className="flex flex-col gap-5 w-full max-w-md"
						onSubmit={form.handleSubmit(onSubmit)}
					>
						<div className="flex flex-col gap-5">
							{disabled ? (
								<div className="text-destructive text-sm text-balance text-center dark:bg-primary">**Since you signed in with Google or Discord, options to update your profile are limited.**</div>
							) : null}

							{/* avatar */}
							<FormField
								control={form.control}
								name="image"
								render={({ field }: { field: ControllerRenderProps<z.infer<typeof updatingUserProfileSchema>> }) => (
									<FormItem className="w-full">
										<FormLabel>Avatar</FormLabel>
										<FormControl>
											<div className="flex gap-3 items-center">
												<Avatar className="w-12 h-12">
													{session?.user.image
														? (
															<Image
																src={session.user.image}
																alt="user avatar"
																width={48}
																height={48}
															/>
														) : (
															<AvatarFallback className="size-12 bg-transparent text-primary border border-primary font-extrabold transition-all duration-300 ease-in hover:text-white hover:border-white hover:bg-darkBlue">
																{session?.user.name?.charAt(0).toUpperCase() || <BiUserCircle size={48} />}
															</AvatarFallback>
														)
													}
												</Avatar>
												<Button size={'sm'} disabled={disabled}>
													Change Picture
												</Button>
											</div>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							{/* Name */}
							<FormField
								control={form.control}
								name="name"
								render={({ field }: { field: ControllerRenderProps<z.infer<typeof updatingUserProfileSchema>> }) => (
									<FormItem className="w-full">
										<FormLabel>Name</FormLabel>
										<FormControl>
											<Input {...field} type="text" className="w-full border " value={field.value || ''} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							{/* email */}
							<FormField
								control={form.control}
								name="email"
								render={({ field }: { field: ControllerRenderProps<z.infer<typeof updatingUserProfileSchema>> }) => (
									<FormItem className="w-full border-b pb-5">
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input {...field} type="email" disabled={disabled} className="w-full border " value={field.value || ''} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							{/* password */}
							<h2 className="text-lg font-semibold">Change Password</h2>
							<FormField
								control={form.control}
								name="password"
								render={({ field }: { field: ControllerRenderProps<z.infer<typeof updatingUserProfileSchema>> }) => (
									<FormItem className="w-full">
										<FormLabel>Password</FormLabel>
										<FormControl>
											<Input {...field} type="password" disabled={disabled} className="w-full border " value={field.value || ''} placeholder='*******' />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="newPassword"
								render={({ field }: { field: ControllerRenderProps<z.infer<typeof updatingUserProfileSchema>> }) => (
									<FormItem className="w-full">
										<FormLabel>New Password</FormLabel>
										<FormControl>
											<Input {...field} type="password" disabled={disabled} className="w-full border " value={field.value || ''} placeholder='*******' />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="confirmNewPassword"
								render={({ field }: { field: ControllerRenderProps<z.infer<typeof updatingUserProfileSchema>> }) => (
									<FormItem className="w-full">
										<FormLabel>Confirm New Password</FormLabel>
										<FormControl>
											<Input {...field} type="password" disabled={disabled} className="w-full border " value={field.value || ''} placeholder='*******' />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<Button type="submit" disabled={form.formState.isSubmitting || !form.formState.isDirty}>
								Update
								{form.formState.isSubmitting ? <PiSpinnerBallDuotone className="animate-spin" /> : <FaRegSave />}
							</Button>

						</div>
					</form>
				</Form>
		
	)
}

export default UserProfileForm