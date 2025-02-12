import NextAuth, { NextAuthConfig } from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import CredentialsProvider from 'next-auth/providers/credentials'
import { compareSync } from 'bcrypt-ts-edge'
import { db } from './lib/prisma'

export const config = {
	pages: {
		signIn: '/sign-in',
		error: '/sign-in'
	},
	session: {
		strategy: 'jwt',
		maxAge: 30 * 24 * 60 * 60,
	},
	providers: [
		CredentialsProvider({
			credentials: {
				email: { type: 'email' },
				password: { type: 'password' }
			},
			async authorize(credentials) {
				if (credentials == null) return null
				const user = await db.user.findFirst({
					where: {
						email: credentials.email as string
					}
				})
				console.log('user', user?.password, 'credentials', credentials.password)
				if (user && user.password) {
					const isMatch = compareSync(credentials.password as string, user.password)
					if (isMatch) {
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
	],
	callbacks: {
		async session({ session, token, user, trigger }: any) {
			// adds the session's user id to the token subject
			session.user.id = token.sub
			// sets the username if there is an update
			if (trigger == 'update') {
				session.user.name = user.name
			}
			return session
		}
	}
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(config)