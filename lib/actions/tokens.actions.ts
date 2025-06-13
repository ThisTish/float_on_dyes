"use server"

import { prisma } from "@/db/prisma"
import { formatError } from '@/lib/utils'
import { Resend } from 'resend'
import { resetPasswordFormSchema, updatePasswordFormSchema } from "../validators"
import { hashSync } from "bcrypt-ts-edge"
import { isRedirectError } from "next/dist/client/components/redirect-error"
import { sendResetPasswordEmail } from "./email.actions"

const resend = new Resend(process.env.RESEND_API_KEY)

// generate verify email token
export async function generateVerificationToken(email: string) {
	const token = crypto.randomUUID()
	const expires = new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
	const existingToken = await prisma.verificationToken.findFirst({
		where: {
			email
		}
	})
	if (existingToken) {
		await prisma.verificationToken.delete({
			where: {
				id_token: {
					id: existingToken.id,
					token: existingToken.token
				}
			}
		})
	}
	const newVerificationToken = await prisma.verificationToken.create({
		data: {
			email,
			token,
			expires,
		}
	})
	return newVerificationToken
}

// generate reset password token
export async function generatePasswordResetToken(email: string) {

	const token = crypto.randomUUID()
	const expires = new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
	const existingToken = await prisma.resetPasswordToken.findFirst({
		where: {
			email
		}
	})
	if (existingToken) {
		await prisma.resetPasswordToken.delete({
			where: {
				id_token: {
					id: existingToken.id,
					token: existingToken.token
				}
			}
		})

	}
	const resetPasswordToken = await prisma.resetPasswordToken.create({
		data: {
			email,
			token,
			expires,
		}
	})
	return resetPasswordToken
}


// generate and send reset password token
export async function resetPassword(prevState: unknown, formData: FormData) {
	const data = resetPasswordFormSchema.parse({
		email: formData.get('email')
	})

	const user = await prisma.user.findFirst({
		where: {
			email: data.email
		}
	})
	if (!user) return { success: false, message: 'User not found' }
	user.name = user.name.split(' ')[0].slice(0, 1).toUpperCase() + user.name.split(' ')[0].slice(1).toLowerCase()

	const resetToken = await generatePasswordResetToken(user.email)
	await sendResetPasswordEmail(user.email, `Forgot your password, ${user.name}?`, resetToken.token, false)

	return { success: true, message: `Reset password email sent to ${user.email}` }
}


// update password
export async function updatePassword(prevState: unknown, formData: FormData) {

	try {
		const data = updatePasswordFormSchema.parse({
			token: formData.get('token'),
			password: formData.get('password'),
			confirmPassword: formData.get('confirmPassword')
		})

		const resetPasswordToken = await prisma.resetPasswordToken.findFirst({
			where: {
				token: data.token
			}
		})

		if (!resetPasswordToken) return { success: false, message: 'Invalid token,' }

		if (resetPasswordToken.expires < new Date()) {
			const newResetPasswordToken = await generatePasswordResetToken(resetPasswordToken.email)
			await sendResetPasswordEmail(resetPasswordToken.email, `Let's try that again`, newResetPasswordToken.token, false)
			return { success: false, message: `Reset password token has expired. New email sent to ${resetPasswordToken.email}.` }
		}

		data.password = hashSync(data.password, 10)

		await prisma.user.update({
			where: {
				email: resetPasswordToken.email
			},
			data: {
				password: data.password
			}
		})

		await prisma.resetPasswordToken.delete({
			where: {
				id_token: {
					id: resetPasswordToken.id,
					token: resetPasswordToken.token
				}
			}
		})

		return { success: true, message: 'Password updated successfully, you can now ' }
	} catch (error) {
		if (isRedirectError(error)) {
			throw error
		}
		return { success: false, message: formatError(error) }
	}
}