import NextAuth, { NextAuthConfig } from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from '@/db/prisma'
import CredentialsProvider from 'next-auth/providers/credentials'
import { compareSync } from 'bcrypt-ts-edge'

export const config = {
	pages: {
		signIn: '/sign-in',
		error: '/sign-in'
	},
	session: {
		strategy: 'jwt',
		maxAge: 30 * 24 * 60 * 60,
	},
	adapter: PrismaAdapter(prisma),
	providers: [
		CredentialsProvider({
			credentials: {
				email: { type: 'email' },
				password: { type: 'password' }
			},
			async authorize(credentials) {
				if (credentials == null) return null
				const user = await prisma.user.findFirst({
					where: {
						email: credentials.email as string
					}
				})
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
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		async session({ session, token, user, trigger }: any) {
			// adds the session's user's id to the token subject
			session.user.id = token.sub

			// if there is an update, set the user name
			if(trigger == 'update'){
				session.user.name = user.name
			}
			return session
		},
		async signIn({user, account}){
			console.log('user signin', user)
			return true
		}
	}
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(config)