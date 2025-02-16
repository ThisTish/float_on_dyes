import { prisma } from "@/db/prisma"
import { getBaseUrl } from '@/lib/utils'
import { Resend } from 'resend'
import { APP_NAME } from "../constants"
import { EmailTemplate } from "@/components/emails/emailTemplate"

const domain = getBaseUrl()
const resend = new Resend(process.env.RESEND_API_KEY)
		
// todo change to emails before production from onboarding and tish.sirface


// verify email token
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


// reset password token
export async function generatePasswordResetToken(email: string) {
	try {
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

			const resetPasswordToken = await prisma.resetPasswordToken.create({
				data: {
					email,
					token,
					expires,
				}
			})
			return resetPasswordToken
		}
	} catch (error) {
		console.log(error)
		return null
	}
}

// send verification email
export async function sendVerificationEmail(email: string, name: string, token: string) {
	const confirmLink = `${domain}/verify-email?token=${token}`

	const { data, error } = await resend.emails.send({
		from: 'theCreator <onboarding@resend.dev>',
		to: 'tish.sirface@gmail.com',
		subject: `Verify your email for ${APP_NAME}`,
		// html: `<p><a href=${confirmLink}>Click Here</a> to verify ${email}</p>`,
		react: await EmailTemplate({ greeting: `Welcome back, ${name.split(' ')[0]}`, verificationUrl: confirmLink, isFirst: false}),
	})
	if (error) return { error: error.message }
	if (data) return { data }
}