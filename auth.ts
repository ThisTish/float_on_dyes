import NextAuth, { NextAuthConfig } from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from '@/db/prisma'
import CredentialsProvider from 'next-auth/providers/credentials'
import { compare } from 'bcrypt-ts-edge'
import Google from 'next-auth/providers/google'
import Discord from "next-auth/providers/discord"
import { signInFormSchema } from './lib/validators'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'


export const { handlers, auth, signIn, signOut } = NextAuth({
	adapter: PrismaAdapter(prisma),
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
		async session({ session, token, user, trigger }: any) {
			if (session && token.sub) {
				session.user.id = token.sub
				session.user.name = token.name
				session.user.image = token.image
				session.user.role = token.role
			}
			if (session.user) {
				session.user.id = session.user.id
				session.user.name = session.user.name
				session.user.image = session.user.image
				session.user.role = session.user.role
			}

			if (trigger == 'update') {
				session.user.name = user.name
			}

			return session
		},
		async jwt({ token, user, trigger, session }: any) {
			if (!token.sub) return token

			if (user) {
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
		},
		authorized({request, auth}):any {
			// check for cookie
			if(!request.cookies.get('sessionCartId')){
				// generate new session cart id cookie
				const sessionCartId = crypto.randomUUID()

				// clone the request headers
				const newRequestHeaders = new Headers(request.headers)

				// create new response and add new headers
				const response = NextResponse.next({
					request: {
						headers: newRequestHeaders
					}
				})
				// set new cookie sessioncartid
				response.cookies.set('sessionCartId', sessionCartId)

				return response
				
			}else{
				return true
			}
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

