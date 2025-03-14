import { auth } from "@/auth"
import WishListSection from "@/components/cart/WishListSection"
import Heading from "@/components/ui/Heading"
import UserProfileForm from "@/components/user/UpdateProfileForm"
import { getWishList } from "@/lib/actions/wishList.actions"
import { Metadata } from "next"
import { SessionProvider } from "next-auth/react"

export const metadata: Metadata = {
	title: 'Profile'
}

const UserProfilePage = async () => {
	const session = await auth()
	if (!session) throw new Error('User not found')
	const wishList = await getWishList(session.user.id)


	return (
		<SessionProvider session={session}>
			<div className="mx-auto space-y-10">
				<Heading first="User " second="Profile" />
				<div className="flex flex-wrap justify-between md:flex-nowrap gap-5">
					<UserProfileForm />
					{wishList ? (
						<div className="md:max-w-sm">
							<WishListSection wishList={wishList} />

						</div>
					) : null}
				</div>
			</div>
		</SessionProvider>
	)
}

export default UserProfilePage