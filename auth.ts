import NextAuth from 'next-auth'
import { prisma } from '@/db/prisma'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { compare } from 'bcrypt-ts-edge'
import Google from 'next-auth/providers/google'
import Discord from "next-auth/providers/discord"
import { signInFormSchema } from './lib/validators'
import { authConfig } from './auth.config'
import { cookies } from 'next/headers'
import { getCart, mergeCarts } from './lib/actions/cart.actions'
import { CartItem } from './types'


export const { handlers, auth, signIn, signOut } = NextAuth({
	secret: process.env.NEXTAUTH_SECRET,
	adapter: PrismaAdapter(prisma),
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
				session.user.isOauth = token.isOauth as boolean
			}


			if (trigger == 'update') {
				session.user.name = user.name
				session.user.image = user.image
				session.user.email = user.email
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

				if (trigger === 'signIn' || trigger === 'signUp') {
					const cookiesObject = await cookies()
					const sessionCartId = cookiesObject.get('sessionCartId')?.value

					if (sessionCartId) {
						const sessionCart = await getCart(undefined, sessionCartId)

						const userCart = await getCart(user.id)

						if (userCart && sessionCart) {
							if (userCart.id !== sessionCart?.id && userCart.items.length > 0 && sessionCart.items.length > 0) {
								const newItems = [...sessionCart.items, ...userCart.items]

								await mergeCarts(newItems, sessionCart.id, user.id)

								await prisma.cart.delete({
									where: {
										id: userCart.id
									}
								})
							}

							if (userCart.items.length === 0 || !sessionCart.userId) {
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

						if (!userCart && sessionCart) {
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

			const existingAccount = await prisma.account.findFirst({
				where: {
					userId: existingUser.id
				}
			})

			token.name = existingUser.name
			token.email = existingUser.email
			token.image = existingUser.image
			token.role = existingUser.role
			token.isOauth = !!existingAccount


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

