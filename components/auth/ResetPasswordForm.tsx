"use client"

import { useActionState, useState } from "react"
import { useFormStatus } from "react-dom"
import { Button } from "@/components/ui/button"
import { AnimatedDiv } from "@/components/ui/AnimatedDiv"
import {  BiMailSend } from "react-icons/bi"
import AuthCard from "@/components/auth/AuthCard"
import { resetPassword } from "@/lib/actions/tokens.actions"
import { Label } from "../ui/label"
import { Input } from "../ui/input"

const ResetPasswordButton = () => {
	const { pending } = useFormStatus()

	return (
		<Button variant={'cta'} disabled={pending} className="w-1/2">
			{pending ? (
				<>
					<span className="animate-pulse">Sending...</span>
					<BiMailSend className="animate-pulse" />
				</>
			) : (
				<>
					<span>Send Reset Code</span>
					<AnimatedDiv variant={'cta'}  animation={'rotate'}>
						<BiMailSend  className="-rotate-45"/>
					</AnimatedDiv>
				</>
			)
			}
		</Button>
	)
}

const ResetPasswordForm = () => {

	const [data, action] = useActionState(resetPassword, {
		success: false,
		message: ''
	})


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
				<div className="mb-5 space-y-6">
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
					{data && !data.success ? (
						<div className="text-center text-destructive">
							{data.message}
						</div>
					) : (
						<div className="text-center text-white">
							{data.message}
						</div>
					)}
					<div className="mb-5 flex justify-center">
						<ResetPasswordButton />
					</div>	
				</div>
			</form>
		</AuthCard >
	)
}


export default ResetPasswordForm