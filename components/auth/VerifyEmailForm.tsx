"use client"

import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import { Button } from "@/components/ui/button"
import { AnimatedDiv } from "@/components/ui/AnimatedDiv"
import { BiLogInCircle } from "react-icons/bi"
import AuthCard from "@/components/auth/AuthCard"
import { emailVerification } from "@/lib/actions/tokens.actions"

const VerifyEmailForm = ({ token }: { token: string }) => {

	const [data, action] = useActionState(emailVerification, {
		success: false,
		message: ''
	})

	const TokenButton = () => {
		const { pending } = useFormStatus()
		return (
			<div className="flex justify-center mb-5">
				<Button variant={'cta'} disabled={pending} className="w-1/2">
					{pending ? (
						<>
							<span className="animate-pulse">Going to sign in</span>
							<BiLogInCircle className="animate-pulse" />
						</>
					) : (
						<>
							<span>Go to sign in</span>
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
			cardTitle="Email Verification"
			cardDescription="Thanks for verifying your email!"
			otherLinkSpan="Having trouble? "
			otherLinkLabel="Contact Us"
			otherLinkHref="/contact"
		// showProviders={true}
		>
			<p className="text-balance text-center mb-5">You can now sign in and continue doing what you were doing.</p>
			<form action={action}>
				<input type="hidden" name="token" value={token} />
				{data ? (
					<div className="text-center text-destructive">
						{data.message}
					</div>
				) : null}
				<TokenButton />
			</form>
		</AuthCard >
	)
}


export default VerifyEmailForm