import { auth } from "@/auth"
import Heading from "@/components/ui/Heading"
import PasswordUpdateForm from "@/components/user/PasswordUpdateForm"
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
			<Heading first="User" second="Profile" className="mb-10" />
			<div className="mx-auto flex flex-col justify-between gap-5 md:flex-row">

				<h2 className="text-lg font-semibold text-darkGreen">Profile Information</h2>
				<UserProfileForm />

				<hr className="mt-3 border-t" />

				{/* password */}
				<h2 className="text-lg font-semibold text-darkGreen">Change Password</h2>
				<PasswordUpdateForm isOauth={session.user.isOauth ? true : false} />
			</div>
		</SessionProvider>
	)
}

export default UserProfilePage