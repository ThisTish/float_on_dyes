"use server"

import { signInFormSchema } from "../validators"
import { signIn, signOut } from "@/auth"
import { prisma } from "@/db/prisma"
import { AuthError } from "next-auth"
import { isRedirectError } from "next/dist/client/components/redirect-error"
import { redirect } from "next/navigation"

// sign in user with credentials
export async function signInWithCredentials(
	prevState: unknown,
	formData: FormData
) {

	try {
		const user = signInFormSchema.parse({
			email: formData.get('email'),
			password: formData.get('password'),
		})

		await signIn('credentials', user)

		return { success: true, message: 'Signed in successfully' }
	} catch (error) {
		if (isRedirectError(error)) {
			throw error
		}
		return { success: false, message: 'Invalid email or password' }
	}
}

export async function signInWithGoogle() {
	await signIn('google')
}



// sign out user
export async function signOutUser() {
	console.log('clicked')
	await signOut()
	console.log('signed out')
}