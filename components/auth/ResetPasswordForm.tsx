"use client"

import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import { Button } from "@/components/ui/button"
import { AnimatedDiv } from "@/components/ui/AnimatedDiv"
import { BiLogInCircle } from "react-icons/bi"
import AuthCard from "@/components/auth/AuthCard"
import { emailVerification } from "@/lib/actions/tokens.actions"
import { Label } from "../ui/label"
import { Input } from "../ui/input"

const ResetPasswordForm = () => {

	const [data, action] = useActionState(emailVerification, {
		success: false,
		message: ''
	})

	const ResetButton = () => {
		const { pending } = useFormStatus()
		return (
			<div className="flex justify-center mb-5">
				<Button variant={'cta'} disabled={pending} className="w-1/2">
					{pending ? (
						<>
							<span className="animate-pulse">Sending...</span>
							<BiLogInCircle className="animate-pulse" />
						</>
					) : (
						<>
							<span>Send Reset Code</span>
							<AnimatedDiv variant={'cta'} animation={'scale'}>
								<BiLogInCircle />
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
			cardTitle="Reset Password"
			cardDescription="Enter email to get a reset code"
			otherLinkSpan="Having trouble? "
			otherLinkLabel="Contact Us"
			otherLinkHref="/contact"
		// showProviders={true}
		>
			<form action={action}>
				<div className="space-y-6 mb-5">
					<div>
						<Label htmlFor="email">Email</Label>
						<Input
							id="email"
							name="email"
							type="email"
							required
							autoComplete="email"
						/>
					</div>
					<ResetButton />
				</div>
			</form>
		</AuthCard >
	)
}


export default ResetPasswordForm