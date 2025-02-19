import { Metadata } from "next"
import UpdatePasswordForm from "@/components/auth/UpdatePasswordForm"

export const metadata: Metadata = {
	title: 'Update Password'
}

const UpdatePasswordPage = async (props: { searchParams: Promise<{ token: string }> }) => {
	const { token } = await props.searchParams

	return (
		<main className="w-full max-w-md mx-auto">
			<UpdatePasswordForm token={token}/>
		</main>

	)
}

export default UpdatePasswordPage