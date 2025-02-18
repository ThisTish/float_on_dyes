"use client"

import { useActionState, useState } from "react"
import { useFormStatus } from "react-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useSearchParams } from "next/navigation"
import { AnimatedDiv } from "@/components/ui/AnimatedDiv"
import { BiLogInCircle } from "react-icons/bi"
import AuthCard from "@/components/auth/AuthCard"
import { emailVerification } from "@/lib/actions/tokens.actions"

const VerifyEmailForm = ({token}: {token: string}) => {

	const [data, action] = useActionState(emailVerification, {
		success: false,
		message: ''
	})

	const SignUpButton = () => {
		const { pending } = useFormStatus()
		return (
			<div className="flex justify-end">
				<Button variant={'cta'} disabled={pending}>
					{pending ? (
						<>
							<span className="animate-pulse">Signing Up</span>
							<BiLogInCircle className="animate-pulse" />
						</>
					) : (
						<>
							<span>Sign Up</span>
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
			cardTitle="Sign Up"
			cardDescription="Sign up to your account"
			otherLinkSpan="Don't have an account? "
			otherLinkLabel="Sign In"
			otherLinkHref="/sign-in"
		>
			<form action={action}>
				<input type="hidden" name="callbackUrl" value={token} />
				<div className="space-y-6">
					<div>
						<SignUpButton />
					</div>
					{data ? (
						<div className="text-center text-destructive">
							{data.message}
						</div>
					) : null}

				</div>
			</form>
		</AuthCard>
	)
}

export default VerifyEmailForm