"use client"

import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import { Button } from "@/components/ui/button"
import { AnimatedDiv } from "@/components/ui/AnimatedDiv"
import { BiLogInCircle } from "react-icons/bi"
import AuthCard from "@/components/auth/AuthCard"
import { emailVerification, updatePassword } from "@/lib/actions/tokens.actions"
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
			<div className="flex justify-center mb-5">
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
						<div className="text-center text-destructive mb-5">
							{data.message}
						</div>
					) : (
						<div className=" text-white flex items-center w-fit mx-auto mb-5">
							{data.message} <Link href="/sign-in" className="text-brightBlue font-semibold text-lg ml-2">Sign In</Link>
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