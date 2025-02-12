"use client"

import { AnimatedDiv } from "@/components/ui/AnimatedDiv";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signInWithCredentials } from "@/lib/actions/users.actions";
import { signInFormSchema } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { useActionState } from "react";
import { useForm } from "react-hook-form";
import { BiLogInCircle } from "react-icons/bi";
import { z } from "zod";

const CredentialsSignIn = () => {
	const form = useForm<z.infer<typeof signInFormSchema>>({
		resolver: zodResolver(signInFormSchema),
		defaultValues: {
			email: '',
			password: ''
		}
	})

		const [data, action] = useActionState(signInWithCredentials, {
			success: false,
			message: ''
	})

	return (
			<Form {...form}>
				<form action={action} className="space-y-5">
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input {...field} type="email" autoComplete="email" required />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input {...field} type="password" autoComplete="password" required />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					
	
					{data && !data.success && (
						<p className="text-destructive text-sm font-light text-center">
							{data.message}
						</p>
					)}
					<div className="flex justify-end">
						<Button type="submit" variant={'cta'} >
							Sign In
							<AnimatedDiv variant={'cta'} animation={'scale'}>
								<BiLogInCircle />
							</AnimatedDiv>
						</Button>
					</div>
				</form>
			</Form>

	)
}

export default CredentialsSignIn;