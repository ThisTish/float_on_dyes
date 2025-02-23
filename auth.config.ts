import type { NextAuthConfig } from 'next-auth'
import { NextResponse } from 'next/server'

export const authConfig = {
  providers: [],
	callbacks: {
		authorized({ request, auth }: any) {
			// Array of regex patterns of paths we want to protect
			const protectedPaths = [
				/\/shipping-address/,
				/\/payment-method/,
				/\/place-order/,
				/\/profile/,
				/\/user\/(.*)/,
				/\/order\/(.*)/,
				/\/admin/,
			]

			// Get pathname from the req URL object
			const { pathname } = request.nextUrl
			// Check if user is not authenticated and accessing a protected path
			if (!auth && protectedPaths.some((p) => p.test(pathname))) return false

			// Check for session cart cookie
			if (!request.cookies.get('sessionCartId')) {
				// Generate new session cart id cookie
				const sessionCartId = crypto.randomUUID()
				// Create new response and add the new headers
				const response = NextResponse.next({
					request: {
						headers: new Headers(request.headers),
					},
				})

				// Set newly generated sessionCartId in the response cookies
				response.cookies.set('sessionCartId', sessionCartId)
				return response
			}
			return true
		},
	},
} satisfies NextAuthConfig



//* how it was originally in auth.ts
// authorized({request, auth}):any {
		// 	// check for cookie
		// 	if(!request.cookies.get('sessionCartId')){
		// 		// generate new session cart id cookie
		// 		const sessionCartId = crypto.randomUUID()

		// 		// clone the request headers
		// 		const newRequestHeaders = new Headers(request.headers)

		// 		// create new response and add new headers
		// 		const response = NextResponse.next({
		// 			request: {
		// 				headers: newRequestHeaders
		// 			}
		// 		})
		// 		// set new cookie sessioncartid
		// 		response.cookies.set('sessionCartId', sessionCartId)

		// 		return response
				
		// 	}else{
		// 		return true
		// 	}
		// }