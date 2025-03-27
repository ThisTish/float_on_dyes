import { auth } from "@/auth"
import Heading from "@/components/ui/Heading"
import UserProfileForm from "@/components/user/UpdateProfileForm"
import { Metadata } from "next"
import { SessionProvider } from "next-auth/react"

export const metadata: Metadata = {
	title: 'Profile'
}

const UserProfilePage = async () => {
	const session = await auth()
	if (!session) throw new Error('User not found')

	return (
		<SessionProvider session={session}>
			<div className="mx-auto max-w-md space-y-4">
				<Heading first="User" second="Profile" />
				<UserProfileForm />
			</div>
		</SessionProvider>
	)
}

export default UserProfilePage