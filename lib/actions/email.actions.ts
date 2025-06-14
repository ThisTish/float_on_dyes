"use server"

import { prisma } from "@/db/prisma"
import { Resend } from 'resend'
import { redirect } from "next/navigation"
import { sendContactEmailSchema } from "../validators"
import { getBaseUrl } from "../utils"
import { APP_NAME } from "../constants"
import { EmailTemplate } from "@/components/emails/emailTemplate"
import { generateVerificationToken } from "./tokens.actions"



const resend = new Resend(process.env.RESEND_API_KEY)
const domain = getBaseUrl()

// todo change to emails before production from onboarding and tish.sirface


// contact form submission
export async function sendContactEmail(prevState: unknown, formData: FormData) {
	const contactData = sendContactEmailSchema.parse({
		name: formData.get('name'),
		email: formData.get('email'),
		message: formData.get('message')
	})

	// todo change the to & from to floatondyes.com & the email of the creator(or myself)
	const { data, error } = await resend.emails.send({
		from: 'theCreator <onboarding@resend.dev>',
		to: 'tish.sirface@gmail.com',
		subject: `Contact Form Submission from ${contactData.name}`,
		html: `${contactData.message}<br><br>From: ${contactData.name} <${contactData.email}>`,
	})
	if (error) return { success: false, message: error.message }
	return { success: true, message: `Message sent!` }
}

// send verification email
export async function sendVerificationEmail(email: string, greeting: string, token: string, isFirst: boolean) {
	const confirmLink = `${domain}/verify-email?token=${token}`

	const { data, error } = await resend.emails.send({
		from: 'theCreator <onboarding@resend.dev>',
		to: 'tish.sirface@gmail.com',
		subject: `Verify your email for ${APP_NAME}`,
		react: await EmailTemplate({ greeting: greeting, verificationUrl: confirmLink, isFirst: isFirst, isReset: false }),
	})
	if (error) return { error: error.message }
	if (data) return { data }
}


// send reset password email
export async function sendResetPasswordEmail(email: string, greeting: string, token: string, isFirst: boolean) {
	console.log('doing it')
	const confirmLink = `${domain}/update-password?token=${token}`

	const { data, error } = await resend.emails.send({
		from: 'theCreator <onboarding@resend.dev>',
		to: 'tish.sirface@gmail.com',
		subject: `Reset your password for ${APP_NAME}`,
		react: await EmailTemplate({ greeting: greeting, verificationUrl: confirmLink, isFirst: isFirst, isReset: true }),
	})
	if (error) return { error: error.message }
	if (data) return { data }
}

// email verification
export async function emailVerification(
	prevState: unknown,
	formData: FormData
) {
	const token = formData.get('token') as string
	if (!token) return { success: false, message: 'No token provided' }

	const verificationToken = await prisma.verificationToken.findFirst({
		where: {
			token
		}
	})

	if (!verificationToken) return { success: false, message: 'Email already verified or you need a new token' }

	if (verificationToken.expires < new Date()) {
		const newVerificationToken = await generateVerificationToken(verificationToken.email)
		await sendVerificationEmail(verificationToken.email, `Let's try that again,`, newVerificationToken.token, false)
		return { success: false, message: `Verification token has expired. New email sent to ${verificationToken.email}.` }
	}

	const updatedUser = await prisma.user.update({
		where: {
			email: verificationToken.email
		},
		data: {
			emailVerified: new Date()
		}
	})

	await prisma.verificationToken.delete({
		where: {
			id_token: {
				id: verificationToken.id,
				token: verificationToken.token
			}
		}
	})
	redirect('/sign-in')
}
