import { Metadata } from "next"
import ResetPasswordForm from "@/components/auth/ResetPasswordForm"

export const metadata: Metadata = {
	title: 'Reset Password'
}

const ResetPasswordPage = () => {

	return (
		<main className="w-full max-w-md mx-auto">
			<ResetPasswordForm />
		</main>

	)
}

export default ResetPasswordPage