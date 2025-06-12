import { prisma } from "@/db/prisma"
import { Resend } from 'resend'
import { sendContactEmailSchema } from "../validators"

const resend = new Resend(process.env.RESEND_API_KEY)


// contact form submission
export async function sendContactEmail(prevState: unknown, formData: FormData) {
	const contactData = sendContactEmailSchema.parse({
		name: formData.get('name'),
		email: formData.get('email'),
		message: formData.get('message')
	})


		const { data, error } = await resend.emails.send({
			from: 'theCreator <onboarding@resend.dev>',
			to: 'tish.sirface@gmail.com',
			subject: `Contact Form Submission from ${contactData.name}`,
			html: `${contactData.message}<br><br>From: ${contactData.name} <${contactData.email}>`,
		})
		if (error) return { error: error.message }
		if (data) return { data }

	return { success: true, message: `Message sent! We will reach out to you ASAP, ${name}` }
}
