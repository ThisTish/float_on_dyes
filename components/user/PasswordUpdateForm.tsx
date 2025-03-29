"use client"

import { useToast } from "@/hooks/use-toast"
import { updatePasswordProfileFormSchema } from "@/lib/validators"
import { zodResolver } from "@hookform/resolvers/zod"
import { ControllerRenderProps, useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { PiSpinnerBallDuotone } from "react-icons/pi"
import { updateProfilePassword } from "@/lib/actions/users.actions"
import { FaRegSave } from "react-icons/fa"

const PasswordUpdateForm = ({ isOauth }: { isOauth: boolean }) => {

	const form = useForm<z.infer<typeof updatePasswordProfileFormSchema>>({
		resolver: zodResolver(updatePasswordProfileFormSchema),
		defaultValues: {
			password: undefined,
			newPassword: undefined,
			confirmNewPassword: undefined
		}
	})

	const { toast } = useToast()

	const onSubmit = async (values: z.infer<typeof updatePasswordProfileFormSchema>) => {
		const res = await updateProfilePassword(values)

		if (!res.success) {
			return toast({
				variant: 'destructive',
				description: res.message
			})
		}

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

				<FormField
					control={form.control}
					name="password"
					render={({ field }: { field: ControllerRenderProps<z.infer<typeof updatePasswordProfileFormSchema>> }) => (
						<FormItem className="w-full">
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input {...field} type="password" disabled={isOauth} className="w-full border" value={field.value || ''} placeholder='*******' />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="newPassword"
					render={({ field }: { field: ControllerRenderProps<z.infer<typeof updatePasswordProfileFormSchema>> }) => (
						<FormItem className="w-full">
							<FormLabel>New Password</FormLabel>
							<FormControl>
								<Input {...field} type="password" disabled={isOauth} className="w-full border" value={field.value || ''} placeholder='*******' />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="confirmNewPassword"
					render={({ field }: { field: ControllerRenderProps<z.infer<typeof updatePasswordProfileFormSchema>> }) => (
						<FormItem className="w-full">
							<FormLabel>Confirm New Password</FormLabel>
							<FormControl>
								<Input {...field} type="password" disabled={isOauth} className="w-full border" value={field.value || ''} placeholder='*******' />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit" disabled={form.formState.isSubmitting || !form.formState.isDirty}>
					Update
					{form.formState.isSubmitting ? <PiSpinnerBallDuotone className="animate-spin" /> : <FaRegSave />}
				</Button>
			</form>
		</Form>
	)
}

export default PasswordUpdateForm