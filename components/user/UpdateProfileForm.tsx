"use client"

import { useToast } from "@/hooks/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSession } from "next-auth/react"
import { ControllerRenderProps, useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { updatingUserProfileSchema } from "@/lib/validators"
import { Button } from "../ui/button"
import { PiSpinnerBallDuotone } from "react-icons/pi"
import { FaRegSave } from "react-icons/fa"
import { updateUserProfile } from "@/lib/actions/users.actions"

const UserProfileForm = () => {
	const { data: session, update } = useSession()

	const form = useForm<z.infer<typeof updatingUserProfileSchema>>({
		resolver: zodResolver(updatingUserProfileSchema),
		defaultValues: {
			name: session?.user.name ?? '',
			email: session?.user.email ?? '',
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
				className="flex flex-col gap-5"
				onSubmit={form.handleSubmit(onSubmit)}
			>
				<div className="flex flex-col gap-5">
					<FormField
						control={form.control}
						name="email"
						render={({ field }: { field: ControllerRenderProps<z.infer<typeof updatingUserProfileSchema>> }) => (
							<FormItem className="w-full">
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input {...field} type="email" disabled className="w-full border text-muted" />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="name"
						render={({ field }: { field: ControllerRenderProps<z.infer<typeof updatingUserProfileSchema>> }) => (
							<FormItem className="w-full">
								<FormLabel>Name</FormLabel>
								<FormControl>
									<Input {...field} type="text" className="w-full border text-muted" />
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