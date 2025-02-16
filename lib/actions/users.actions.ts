"use server"

import { signInFormSchema, signUpFormSchema } from "../validators"
import { signIn, signOut } from "@/auth"
import { prisma } from "@/db/prisma"
import { isRedirectError } from "next/dist/client/components/redirect-error"
import { formatSignUpError } from "../utils"
import { hashSync } from "bcrypt-ts-edge"

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

		await signIn('credentials', {
			email: user.email,
			password: user.password
		})

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

export async function signUp(prevState: unknown, formData: FormData) {
	console.log('signing up', formData)
	try {
		const user = signUpFormSchema.parse({
			name: formData.get('name'),
			email: formData.get('email'),
			password: formData.get('password'),
			confirmPassword: formData.get('confirmPassword'),
		})

		const unhashedPassword = user.password

		user.password = hashSync(user.password, 10)

		await prisma.user.create({
			data: {
				name: user.name,
				email: user.email,
				password: user.password,
			}
		})

		await signIn('credentials', {
			email: user.email,
			password: unhashedPassword
		})
		console.log('signed in')
		return { success: true, message: 'Signed up successfully, you are now logged in' }

	} catch (error) {
		if (isRedirectError(error)) {
			throw error
		}
		return { success: false, message: formatSignUpError(error) }
	}
}



// sign out user
export async function signOutUser() {
	console.log('clicked')
	await signOut()
	console.log('signed out')
}