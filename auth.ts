import NextAuth from 'next-auth'
import { prisma } from '@/db/prisma'
import CredentialsProvider from 'next-auth/providers/credentials'
import { compare } from 'bcrypt-ts-edge'
import Google from 'next-auth/providers/google'
import Discord from "next-auth/providers/discord"
import { signInFormSchema } from './lib/validators'
import { authConfig } from './auth.config'
import { cookies } from 'next/headers'


export const { handlers, auth, signIn, signOut } = NextAuth({
	secret: process.env.NEXTAUTH_SECRET,
	trustHost: true,
	session: {
		strategy: 'jwt',
		maxAge: 30 * 24 * 60 * 60,
	},
	pages: {
		signIn: '/sign-in',
		error: '/sign-in'
	},
	callbacks: {
		...authConfig.callbacks,
		async session({ session, token, user, trigger }: any) {
			if (session.user && token.sub) {
				session.user.id = token.sub
				session.user.name = token.name
				session.user.image = token.image
				session.user.role = token.role
			}

			if (trigger == 'update') {
				session.user.name = user.name
			}
			return session
		},
		async jwt({ token, user, trigger, session }: any) {
			if (!token.sub) return token

			if (user) {
				token.id = user.id
				token.role = user.role

				if (user.email && user.name === 'NO_NAME') {
					token.name = user.email.split('@')[0]
				}

				await prisma.user.update({
					where: {
						id: user.id
					},
					data: {
						name: token.name || 'NO_NAME',
					}
				})

				if (trigger === 'signIn' || 'signUp') {
					const cookiesObject = await cookies()
					const sessionCartId = cookiesObject.get('sessionCartId')?.value

					if (sessionCartId) {
						const sessionCart = await prisma.cart.findFirst({
							where: {
								sessionCartId
							}
						})

						if (sessionCart) {
							await prisma.cart.deleteMany({
								where: {
									userId: user.id
								}
							})

							await prisma.cart.update({
								where: {
									id: sessionCart.id
								},
								data: {
									userId: user.id
								}
							})
						}
					}
				}
			}

			if (session?.user.name && trigger === 'update') {
				token.name = session.user.name
			}

			const existingUser = await prisma.user.findFirst({
				where: {
					id: token.sub
				}
			})
			if (!existingUser) return token

			token.name = existingUser.name
			token.email = existingUser.email
			token.image = existingUser.image
			token.role = existingUser.role

			return token
		}
	},
	providers: [
		Google({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET
		}),
		Discord({
			clientId: process.env.DISCORD_CLIENT_ID,
			clientSecret: process.env.DISCORD_CLIENT_SECRET
		}),
		CredentialsProvider({
			type: 'credentials',
			credentials: {
				email: { type: 'email' },
				password: { type: 'password' }
			},
			async authorize(credentials) {
				if (!credentials) return null
				const validationFields = signInFormSchema.safeParse(credentials)

				if (validationFields.success) {
					const user = await prisma.user.findFirst({
						where: {
							email: validationFields.data.email
						}
					})
					if (!user || !user.password) return null

					const passwordsMatch = await compare(validationFields.data.password, user.password)
					if (passwordsMatch) {
						return {
							id: user.id,
							name: user.name,
							email: user.email,
							role: user.role
						}
					}
				}
				return null
			}
		})
	]
})

