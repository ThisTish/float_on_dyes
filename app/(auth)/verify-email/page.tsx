import { Metadata } from "next"
import { auth } from "@/auth"
import { redirect } from "next/navigation"
import VerifyEmailForm from "@/components/auth/VerifyEmailForm"

export const metadata: Metadata = {
	title: 'Verify Email'
}

const VerifyEmailPage = async (props: { searchParams: Promise<{ token: string }> }) => {
	const { token } = await props.searchParams

	const session = await auth()

	if (session) {
		return redirect('/')
	}

	return (
		<main className="w-full max-w-md mx-auto">
			<VerifyEmailForm token={token}/>
		</main>

	)
}

export default VerifyEmailPage