"use server"

import { shippingAddressSchema, signInFormSchema, signUpFormSchema } from "../validators"
import { auth, signIn, signOut } from "@/auth"
import { prisma } from "@/db/prisma"
import { isRedirectError } from "next/dist/client/components/redirect-error"
import { formatError } from "../utils"
import { hashSync } from "bcrypt-ts-edge"
import { generateVerificationToken, sendVerificationEmail } from "./tokens.actions"
import { ShippingAddress } from "@/types"

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
			const greeting = `Welcome back, ${name.split(' ')[0].slice(0, 1).toUpperCase() + name.split(' ')[0].slice(1).toLowerCase()}`

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


// sign up user
export async function signUp(prevState: unknown, formData: FormData) {
	try {
		const user = signUpFormSchema.parse({
			name: formData.get('name'),
			email: formData.get('email'),
			password: formData.get('password'),
			confirmPassword: formData.get('confirmPassword'),
			isSubscribed: formData.get('isSubscribed') === 'on' ? true : false
		})
		user.password = hashSync(user.password, 10)
		user.email = user.email.toLowerCase()

		await prisma.user.create({
			data: {
				name: user.name,
				email: user.email,
				password: user.password,
				isSubscribed: user.isSubscribed
			}
		})

		const greeting = `Hi ${user.name ? user.name.split(' ')[0].slice(0, 1).toUpperCase() + user.name.split(' ')[0].slice(1).toLowerCase() : 'User'}`

		const verificationToken = await generateVerificationToken(user.email)
		await sendVerificationEmail(user.email, greeting, verificationToken.token, true)
		return { success: true, message: `Sign up almost complete. We need to verify your email. Verification email has been sent to ${user.email}. ` }

	} catch (error) {
		if (isRedirectError(error)) {
			throw error
		}
		return { success: false, message: formatError(error) }
	}
}


// get existing user
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
	await signOut({ redirectTo: '/', redirect: true })
}


// providers
export async function providerSignIn(provider: 'google' | 'discord') {
	await signIn(provider, {
		redirectTo: '/'
	})
}


// get user by id
export async function getUserById(userId: string) {
	const user = await prisma.user.findFirst({
		where: {
			id: userId
		}
	})
	if (!user) throw new Error('User not found')
	return user
}

// update user address
export async function updateUserAddress(data: ShippingAddress) {
	try {
		const session = await auth()
		if (!session) throw new Error('User not found')
		const user = await getUserById(session.user.id)
		if (!user) throw new Error('User not found')

		const address = shippingAddressSchema.parse(data)

		await prisma.user.update({
			where: {
				id: user.id
			},
			data: {
				address
			}
		})

		return { success: true, message: 'Address updated successfully' }


	} catch (error) {
		return { success: false, message: formatError(error) }
	}
}