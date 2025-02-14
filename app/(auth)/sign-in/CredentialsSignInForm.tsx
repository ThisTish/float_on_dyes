"use client"

import { SIGN_IN_DEFAULT_VALUES } from "@/lib/constants"
import { signInWithCredentials } from "@/lib/actions/users.actions"
import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useSearchParams } from "next/navigation"
import { AnimatedDiv } from "@/components/ui/AnimatedDiv"
import { BiLogInCircle } from "react-icons/bi"
import AuthCard from "@/components/auth/AuthCard"

const CredentialsSignInForm = () => {
	const [data, action] = useActionState(signInWithCredentials, {
		success: false,
		message: ''
	})

	const searchParams = useSearchParams()

	const callbackUrl = searchParams.get('callbackUrl') || '/'

	const SignInButton = () => {
		const { pending } = useFormStatus()
		return (
			<div className="flex justify-end">
				<Button variant={'cta'} disabled={pending}>
					{pending ? (
						<>
							<span>Signing in</span>
							<BiLogInCircle className="animate-pulse" />
						</>
					) : (
						<>
							<span>Sign In</span>
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
			cardTitle="Sign In"
			cardDescription="Sign in to your account"
			otherLinkSpan="Don't have an account? "
			otherLinkLabel="Sign Up"
			otherLinkHref="/sign-up">
		<form action={action}>
			<input type="hidden" name="callbackUrl" value={callbackUrl} />
			<div className="space-y-6">
				<div>
					<Label htmlFor="email">Email</Label>
					<Input
						id="email"
						name="email"
						type="email"
						required
						autoComplete="email"
						defaultValue={SIGN_IN_DEFAULT_VALUES.email}
					/>
				</div>
				<div>
					<Label htmlFor="password">Password</Label>
					<Input
						id="password"
						name="password"
						type="password"
						required
						autoComplete="password"
						defaultValue={SIGN_IN_DEFAULT_VALUES.password}
					/>
				</div>
				<div>
					<SignInButton />
				</div>
				{data  ? (
					<div className="text-center text-destructive">
						{data.message}
					</div>
				) : null}
				
			</div>
		</form>
		</AuthCard>
	)
}

export default CredentialsSignInForm