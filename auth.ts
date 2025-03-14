import NextAuth from 'next-auth'
import { prisma } from '@/db/prisma'
import CredentialsProvider from 'next-auth/providers/credentials'
import { compare } from 'bcrypt-ts-edge'
import Google from 'next-auth/providers/google'
import Discord from "next-auth/providers/discord"
import { signInFormSchema } from './lib/validators'
import { authConfig } from './auth.config'
import { cookies } from 'next/headers'
import { InputJsonValue } from '@prisma/client/runtime/library'


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
				session.user.id = token.id
				session.user.name = token.name
				session.user.image = token.image
				session.user.role = token.role
				session.user.isOAuth = token.isOAuth as boolean

			}

			if (trigger == 'update') {
				session.user.name = token.name
				session.user.image = token.image
				session.user.email = token.email
			}
			return session
		},
		async jwt({ token, user, trigger, session }: any) {
			if (!token.sub) return token

			let existingUser = null

			if (user) {
				existingUser = await prisma.user.findFirst({
					where: {
						email: user.email
					}
				})

				if (!existingUser) {
					existingUser = await prisma.user.create({
						data: {
							email: user.email,
							name: user.name,
							image: user.image,
							role: user.role
						}
					})
				}

				if (user.email && user.name === 'NO_NAME') {
					token.name = user.email.split('@')[0]
				}

				token.id = existingUser.id
				token.role = existingUser.role


				if (trigger === 'signIn' || trigger === 'signUp') {
					const cookiesObject = await cookies()
					const sessionCartId = cookiesObject.get('sessionCartId')?.value
					if (!sessionCartId) return console.log('NONE')
					console.log(existingUser)
					if (sessionCartId) {
						const sessionCart = await prisma.cart.findFirst({
							where: {
								sessionCartId
							}
						})
						let userCart = await prisma.cart.findFirst({
							where: {
								userId: existingUser?.id ?? user.id
							}
						})
						if (sessionCart) {
							console.log('session cart in auth', sessionCart)
							if (!userCart) {
								await prisma.cart.update({
									where: {
										id: sessionCart.id
									},
									data: {
										userId: existingUser.id,
									}
								})
							} else if (sessionCart.id !== userCart.id) {
								if (userCart.items.length > 0 || sessionCart?.items.length > 0) {
									const mergedItemsMap = new Map<string, any>()
									for (const item of [...userCart.items, ...sessionCart.items] as { id: string }[]) {
										mergedItemsMap.set(item.id, item)
									}
									const mergedItems = Array.from(mergedItemsMap.values())
									await prisma.cart.update({
										where: { id: userCart.id },
										data: {
											items: {
												set: mergedItems as InputJsonValue[]
											}
										}
									})
									await prisma.cart.delete({
										where: { id: sessionCart.id }
									})
								}
							}
						}
					}
				}
			}

			if (session?.user.name && trigger === 'update') {
				token.name = session.user.name
				token.image = session.user.image
				token.email = session.user.email

			}


			if (!existingUser) await prisma.user.findFirst({
				where: {
					id: token.sub
				}
			})

			if (!existingUser) return token

			token.name = existingUser.name
			token.email = existingUser.email
			token.image = existingUser.image
			token.role = existingUser.role
			token.isOAuth = !existingUser.password

			return token
		}
	},
	debug: true,
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

