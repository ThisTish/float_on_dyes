"use client"

import { useActionState, useState } from "react"
import { useFormStatus } from "react-dom"
import { Button } from "@/components/ui/button"
import { AnimatedDiv } from "@/components/ui/AnimatedDiv"
import AuthCard from "@/components/auth/AuthCard"
import { emailVerification } from "@/lib/actions/email.actions"
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
			<div className="z-10 mb-5 flex justify-center">
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
			<p className="mb-5 text-balance text-center">Finish verifying your account by signing in.</p>
			<form action={action}>
				<input type="hidden" name="token" value={token} />
				{!data.success && data.message === 'Email already verified or you need a new token' ? (
					<div className="flex flex-col gap-5 text-center text-destructive">
						<p>{data.message}</p>
						<Link href={'/sign-in'} className="bg-black p-3 font-bold text-white">Try signing in here instead</Link>
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