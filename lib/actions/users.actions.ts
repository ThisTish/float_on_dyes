"use server"

import { isRedirectError } from "next/dist/client/components/redirect-error"
import { signInFormSchema } from "../validators"
import { signIn, signOut } from "@/auth"

export const signInWithCredentials = async (prevState: unknown, formData: FormData) => {
	try {
		const user = signInFormSchema.parse({
			email: formData.get('email'),
			password: formData.get('password')
		})
		await signIn('credentials', user)
		return { success: true, message: 'Successfully signed in' }

	} catch (error) {
		if (isRedirectError(error)) {
			throw error
		}
		return { success: false, message: 'Invalid email or password' }
	}
}

export async function signOutUser() {
	await signOut()
}