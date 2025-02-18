"use server"

import { signInFormSchema, signUpFormSchema } from "../validators"
import { signIn, signOut } from "@/auth"
import { prisma } from "@/db/prisma"
import { isRedirectError } from "next/dist/client/components/redirect-error"
import { formatSignUpError } from "../utils"
import { hashSync } from "bcrypt-ts-edge"
import { generateVerificationToken, sendVerificationEmail } from "./tokens.actions"

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

		const existingUser = await getExistingUser(user.email)
		if (!existingUser || !existingUser.success) return { success: false, message: `${existingUser.message}` }

		if (existingUser.user) {
			const { id, name, email, emailVerified } = existingUser.user
			const greeting = `Welcome back, ${name.split(' ')[0].slice(0, 1).toUpperCase() + name.split(' ')[0].slice(1).toLowerCase()},`

			if (!emailVerified) {
				const verificationToken = await generateVerificationToken(email)
				await sendVerificationEmail(email, greeting, verificationToken.token, false)
				return { success: false, message: `Email is not verified, new verification email sent to ${email}. ` }
			}
		}

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



export async function signUp(prevState: unknown, formData: FormData) {
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

		const greeting = `Hi ${user.name ? user.name.split(' ')[0].slice(0, 1).toUpperCase() + user.name.split(' ')[0].slice(1).toLowerCase() : 'User'},`

		const verificationToken = await generateVerificationToken(user.email)
		await sendVerificationEmail(user.email, greeting, verificationToken.token, true)
		return { success: false, message: `Sign up almost complete. We need to verify your email. Verification email has been sent to ${user.email}. ` }




	} catch (error) {
		if (isRedirectError(error)) {
			throw error
		}
		return { success: false, message: formatSignUpError(error) }
	}
}

// 
export async function getExistingUser(email: string) {
	const existingUser = await prisma.user.findFirst({
		where: {
			email
		}
	})

	if (!existingUser) return { success: false, message: 'User not found' }

	return {
		user: {
			id: existingUser.id,
			name: existingUser.name,
			email: existingUser.email,
			emailVerified: existingUser.emailVerified
		}, success: true, message: 'User found'
	}
}

// sign out user
export async function signOutUser() {
	console.log('clicked')
	await signOut()
	console.log('signed out')
}