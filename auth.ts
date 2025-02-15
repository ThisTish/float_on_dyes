import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from '@/db/prisma'
import CredentialsProvider from 'next-auth/providers/credentials'
import type { NextAuthConfig } from 'next-auth'
import { compare } from 'bcrypt-ts-edge'
import Google from 'next-auth/providers/google'
import Discord from "next-auth/providers/discord"

export const config = {
	pages: {
		signIn: '/sign-in',
		error: '/sign-in',
	},
	session: {
		strategy: 'jwt',
		maxAge: 30 * 24 * 60 * 60
	},
	adapter: PrismaAdapter(prisma),
	providers: [
		CredentialsProvider({
			credentials: {
				email: { type: 'email' },
				password: { type: 'password' },
			},
			async authorize(credentials) {
				if(!credentials.email || !credentials.password) return null

				const user = await prisma.user.findFirst({
					where: {
						email: credentials.email as string,
					}
				})

				if (user && user.password) {
					const isMatch = await compare(
						credentials.password as string,
						user.password
					)

					if (isMatch) {
						return {
							id: user.id,
							name: user.name,
							email: user.email,
							role: user.role,
						}
					}
				}
				return null
			}
		}),
			Google({
				clientId: process.env.GOOGLE_CLIENT_ID,
				clientSecret: process.env.GOOGLE_CLIENT_SECRET
			}),
			Discord({
				clientId: process.env.DISCORD_CLIENT_ID,
				clientSecret: process.env.DISCORD_CLIENT_SECRET
			})
	],
	callbacks: {
		async session({ session, user, trigger, token }: any) {
			// Set the user ID from the token
			session.user.id = token.sub
			session.user.role = token.role
			session.user.name = token.name

			// If there is an update, set the user name
			if (trigger === 'update') {
				session.user.name = user.name
			}

			return session
		},
	}

} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(config)