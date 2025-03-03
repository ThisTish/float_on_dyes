import { Metadata } from "next"
import CredentialsSignInForm from "@/components/auth/CredentialsSignInForm"
import { auth } from "@/auth"
import { redirect } from "next/navigation"
import CheckoutSteps from "@/components/cart/CheckoutSteps"

export const metadata: Metadata = {
	title: 'Sign In'
}

const SignInPage = async (props: { searchParams: Promise<{ callbackUrl: string }> }) => {
	const { callbackUrl } = await props.searchParams

	const session = await auth()

	if (session) {
		return redirect(callbackUrl || '/')
	}

	return (
		<main className="w-full max-w-md mx-auto">
			<CheckoutSteps current={0} />
			<CredentialsSignInForm />
		</main>

	)
}

export default SignInPage