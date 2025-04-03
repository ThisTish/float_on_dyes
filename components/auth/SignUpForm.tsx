"use client"

import { signUp } from "@/lib/actions/users.actions"
import { ChangeEvent, useActionState, useRef, useState } from "react"
import { useFormStatus } from "react-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useSearchParams } from "next/navigation"
import { AnimatedDiv } from "@/components/ui/AnimatedDiv"
import { BiLogInCircle } from "react-icons/bi"
import AuthCard from "@/components/auth/AuthCard"
import { ArrowUpRight } from "lucide-react"
import Checkbox from "../ui/Checkbox"

const SignUpForm = () => {
	const [checked, setChecked] = useState(false)
	const checkBoxRef = useRef<HTMLInputElement>(null)

	const [data, action] = useActionState(signUp, {
		success: false,
		message: ''
	})

	const searchParams = useSearchParams()

	const callbackUrl = searchParams.get('callbackUrl') || '/'

	const handleCheckBoxChange = (e: ChangeEvent<HTMLInputElement>) => {
		setChecked(e.target.checked)
	}

	const SignUpButton = () => {
		const { pending } = useFormStatus()
		return (
			<div>
				<Button variant={'cta'} disabled={pending} className="w-full">
					{pending ? (
						<>
							<span className="animate-pulse">Signing Up</span>
							<BiLogInCircle className="animate-pulse" />
						</>
					) : (
						<>
							<span>Sign Up</span>
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
			cardTitle="Sign Up"
			cardDescription="Sign up for your account"
			otherLinkSpan="Already have an account? "
			otherLinkLabel="Sign In"
			otherLinkHref="/sign-in"
			showProviders={true}
		>
			<form action={action}>
				<input type="hidden" name="callbackUrl" value={callbackUrl} />
				<div className="mb-6 space-y-6">
					<div>
						<Label htmlFor="name">Name</Label>
						<Input
							id="name"
							name="name"
							type="text"
							required
							autoComplete="name"
						/>
					</div>
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
						<div className="text-center text-destructive">
							{data.message}
						</div>
					) : (
						<div className="text-center text-white">
							{data.message}
						</div>
					)}
					<div>
						<div className="mb-6 flex items-center gap-3">
							<Checkbox
								id="isSubscribed"
								name="isSubscribed"
								checked={checked}
								ref={checkBoxRef}
								onChange={handleCheckBoxChange}
								type="checkbox"
							/>
							<Label htmlFor="isSubscribed">Subscribe to Newsletter?</Label>
						</div>
						<SignUpButton />
					</div>
				</div>
			</form>
		</AuthCard>
	)
}

export default SignUpForm