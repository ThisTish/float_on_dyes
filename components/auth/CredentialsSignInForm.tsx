"use client"

import { SIGN_IN_DEFAULT_VALUES } from "@/lib/constants"
import { signInWithCredentials } from "@/lib/actions/users.actions"
import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AnimatedDiv } from "@/components/ui/AnimatedDiv"
import { BiLogInCircle } from "react-icons/bi"
import AuthCard from "@/components/auth/AuthCard"
import { useRouter } from "next/navigation"

const CredentialsSignInForm = () => {
	const [data, action] = useActionState(signInWithCredentials, {
		success: false,
		message: ''
	})

	const router = useRouter()

	if(data.success){
		router.refresh()
	}

	const SignInButton = () => {
		const { pending } = useFormStatus()
		return (
			<div>
				<Button variant={'cta'} disabled={pending} className="w-full">
					{pending ? (
						<>
							<span className="animate-pulse">Signing in</span>
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
			otherLinkHref="/sign-up"
			showProviders={true}
		>
			<form action={action} className="space-y-5 mb-5">
				{/* <div className="space-y-6 mb-6"> */}
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
					{data && !data.success ? (
						<div className="text-center text-destructive">
							{data.message}
						</div>
						) : (
						<div className="text-center text-white">
							{data.message}
						</div>
						)}
					<div>
						<SignInButton />
					</div>
				{/* </div> */}
			</form>
		</AuthCard>
	)
}

export default CredentialsSignInForm