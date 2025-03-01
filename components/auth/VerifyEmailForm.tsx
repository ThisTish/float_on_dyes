"use client"

import { useActionState, useEffect, useState } from "react"
import { useFormStatus } from "react-dom"
import { Button } from "@/components/ui/button"
import { AnimatedDiv } from "@/components/ui/AnimatedDiv"
import { BiLogInCircle } from "react-icons/bi"
import AuthCard from "@/components/auth/AuthCard"
import { emailVerification } from "@/lib/actions/tokens.actions"
import Link from "next/link"
import { ArrowRight, ArrowUpRight } from "lucide-react"

const VerifyEmailForm = ({ token }: { token: string }) => {
	const [buttonClicked, setButtonClicked] = useState(false)
	const [data, action] = useActionState(emailVerification, {
		success: false,
		message: ''
	})

	const TokenButton = () => {
		const { pending, action } = useFormStatus()
		return (
			<div className="flex justify-center mb-5 z-10">
				<Button
					variant={'cta'}
					disabled={pending}
					className="w-1/2"
				>
					{pending ? (
						<>
							<span className="animate-pulse">Going to sign in</span>
							<ArrowRight className="animate-pulse" />
						</>
					) : (
						<>
							<span>Go to sign in</span>
							<AnimatedDiv variant={'cta'} animation={'rotate'}>
								<ArrowUpRight />
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
			cardTitle="Verify Email"
			otherLinkSpan="Having trouble? "
			otherLinkLabel="Contact Us"
			otherLinkHref="/contact"
		// showProviders={true}
		>
			<p className="text-balance text-center mb-5">Click the sign in button to finish verifying and to go to the sign in page.</p>
			<form action={action}>
				<input type="hidden" name="token" value={token} />
				{!data.success && data.message === 'Email already verified or you need a new token' ? (
					<div className="text-center text-destructive flex flex-col gap-5">
						<p>{data.message}</p>
						<Link href={'/sign-in'} className="text-white bg-black font-bold p-3">Try signing in here instead</Link>
					</div>
				) : !data.success && data.message ? (
					<div className="text-center text-destructive">
						{data.message}
					</div>
				) : data.success ? (
					<div className="text-center text-white">
						{data.message}
					</div>
				) : null}
				{data.message === '' && <TokenButton />}
			</form>
		</AuthCard >
	)
}


export default VerifyEmailForm