import { Metadata } from "next"
import { auth } from "@/auth"
import { redirect } from "next/navigation"
import SignUpForm from "@/components/auth/SignUpForm"

export const metadata: Metadata = {
	title: 'Sign Up'
}

const SignUpPage = async (props: { searchParams: Promise<{ callbackUrl: string }> }) => {
	const { callbackUrl } = await props.searchParams

	const session = await auth()

	if (session) {
		return redirect(callbackUrl || '/')
	}

	return (
		<main className="mx-auto w-full max-w-md">
			<SignUpForm />
		</main>

	)
}

export default SignUpPage