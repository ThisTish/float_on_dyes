"use server"

import { signInFormSchema } from "../validators"
import { signIn, signOut } from "@/auth"
import { isRedirectError } from "next/dist/client/components/redirect-error"

// sign in user with credentials
export async function signInWithCredentials(prevState: unknown, formData: FormData){
	console.group()
	console.log('signin with credentials triggered')
	try {
		const user = signInFormSchema.parse({
			email: formData.get('email'),
			password: formData.get('password')
		})
		console.log('action', user)
		const result = await signIn('credentials', {
			...user,
			redirect: false
		})
		console.log('action signin results', result)
		console.groupEnd()
		return { success: true, message: 'Signed in successfully' }
	} catch (error) {
		if(isRedirectError(error)){
			throw error
		}
		return { success: false, message: 'Invalid email or password'}
	}
}

// sign out user
export async function signOutUser(){
	console.log('clicked')
	await signOut()
	console.log('signed out')
}