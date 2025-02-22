import { NextAuthConfig } from "next-auth"
import Head from "next/head"
import { NextResponse } from "next/server"

export const authConfig = {
	providers: [],
	callbacks: {
		authorized({ request, auth}: any){
			const protectedPaths=[
				/\/shipping-address/,
				/\/payment-method/,
				/\/place-order/,
				/\/profile/,
				/\/profile/,
				/\/user\/(.*)/,
				/\/order\/(.*)/,
				/\/admin/
			]
			// get pathname from the req url object
			const { pathname } = request.nextUrl

			// check if user is not authorized and accessing a protected path
			if(!auth && protectedPaths.some((p)=> p.test(pathname))) return false

			// check for session cart id cookie
			if(!request.cookies.get("sessionCartId")){
				const sessionCartId = crypto.randomUUID.toString()

				// create new response and add the new header
				const response = NextResponse.next({
					request: {
						headers: new Headers(request.headers)
					}
				})
				
				//set newly generate session cart id
				response.cookies.set("sessionCartId", sessionCartId)
				
				return response
			}

			return true
		}
	}
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