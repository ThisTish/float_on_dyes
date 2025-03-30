import { auth } from "@/auth"
import WishListSection from "@/components/cart/WishListSection"
import { AnimatedDiv } from "@/components/ui/AnimatedDiv"
import { Button } from "@/components/ui/button"
import Heading from "@/components/ui/Heading"
import SearchButton from "@/components/ui/SearchButton"
import { getWishList } from "@/lib/actions/wishList.actions"
import { ArrowUpRight } from "lucide-react"
import { Metadata } from "next"
import Link from "next/link"


export const metadata: Metadata = {
	title: "Wishlist"
}
const WishListPage = async () => {
	const session = await auth()
	const userId = session?.user.id
	if(!userId) throw new Error('User not found, try logging in again')

	const wishlist = await getWishList(userId ?? undefined)

	return (
		<div className="space-y-5">
			<Heading first="Your" second="Wishlist" className="mb-10"/>

			{!wishlist || wishlist.items.length === 0 ? (
				<div className="mx-auto flex max-w-md flex-col items-center justify-between gap-8 bg-card shadow-sm backdrop-blur-md">
					<p className="py-3 pt-5 text-center text-lg">You don't have anything in your wishlist yet</p>
					<Button
						variant={"cta"}
						asChild
					>
						<Link href="/shop">
							Go to Shop
							<AnimatedDiv variant={'cta'} animation={'rotate'}>
								<ArrowUpRight />
							</AnimatedDiv>
						</Link>
					</Button>
					<div className="mx-auto self-start pb-10 sm:w-2/3">
						<p className="text-center">or search for something</p>
						<SearchButton />
					</div>
				</div>
			) :
			<WishListSection wishList={wishlist} />
			}

		</div>
	)
}

export default WishListPage