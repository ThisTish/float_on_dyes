import NextAuth, {type DefaultSession} from "next-auth"

export type ExtendUser = DefaultSession['user'] & {
	id: string
	role: string
	isOauth: boolean
	image: string
	wishListId: string
}

declare module 'next-auth' { 
	interface Session {
		user: ExtendUser
	}
}