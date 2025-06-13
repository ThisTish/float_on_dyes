"use client"

import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import { Button } from "@/components/ui/button"
import { AnimatedDiv } from "@/components/ui/AnimatedDiv"
import AuthCard from "@/components/auth/AuthCard"
import { updatePassword } from "@/lib/actions/tokens.actions"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import Link from "next/link"
import { TbLockPassword } from "react-icons/tb"

const UpdatePasswordForm = ({ token }: { token: string }) => {

	const [data, action] = useActionState(updatePassword, {
		success: false,
		message: ''
	})



	const UpdatePasswordButton = () => {
		const { pending } = useFormStatus()
		return (
			<div className="mb-5 flex justify-center">
				<Button variant={'cta'} disabled={pending} className="w-1/2">
					{pending ? (
						<>
							<span className="animate-pulse">Updating...</span>
							<TbLockPassword className="animate-pulse" />
						</>
					) : (
						<>
							<span>Update Password</span>
							<AnimatedDiv variant={'cta'} animation={'scale'}>
								<TbLockPassword />
							</AnimatedDiv>
						</>
					)
					}
				</Button>
			</div>
		)
	}
	return (
		<AuthCard
			cardTitle="Update Password"
			cardDescription="Enter in your new password, and confirm it"
			otherLinkSpan="Having trouble? "
			otherLinkLabel="Contact Us"
			otherLinkHref="/contact"
		// showProviders={false}
		>
			<form action={action}>
				<div className="space-y-6">
					<input type="hidden" name="token" value={token} />
					<div>
						<Label htmlFor="password">Password</Label>
						<Input
							id="password"
							name="password"
							type="password"
							required
							autoComplete="password"
						/>
					</div>
					<div>
						<Label htmlFor="confirmPassword">Confirm Password</Label>
						<Input
							id="confirmPassword"
							name="confirmPassword"
							type="password"
							required
							autoComplete="password"
						/>
					</div>
					{data && !data.success ? (
						<div className="mb-5 text-center text-destructive">
							{data.message === 'Invalid token,' ? (
								<div className="flex justify-center gap-1">
									<span>{data.message}</span>
									<Link href={'/reset-password'} className="font-bold hover:text-base hover:text-white">try resetting your password again.</Link>
								</div>
							) : (
								<span>{data.message}</span>
							)
							}
						</div>
					) : (
						<div className="mx-auto mb-5 flex w-fit items-center text-white">
							{data.message} <Link href="/sign-in" className="ml-2 text-lg font-semibold text-brightBlue">Sign In</Link>
						</div>
					)}
					<div>
						<UpdatePasswordButton />
					</div>

				</div>
			</form>
		</AuthCard >
	)
}


export default UpdatePasswordForm