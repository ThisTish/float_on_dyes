import { DropdownMenuLabel } from "@radix-ui/react-dropdown-menu"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Button } from "../ui/button"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { BiUser, BiUserCircle } from "react-icons/bi"
import { signOut } from "@/auth"
import Tooltip from "../ui/Tooltip"

const UserButton = () => {

	const { data: session, status } = useSession()

	if (status !== 'authenticated') {
		return (
			<Link href={'/sign-in'}>
				<Tooltip label="Sign In">
				<BiUserCircle size={40} className=" hover:text-primary-foreground hover:bg-darkBlue rounded-full"/>
				</Tooltip>
			</Link>
		)
	}

	const userIcon = session.user.image || session?.user?.name?.charAt(0).toUpperCase() || <BiUser />

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
					{userIcon}
			</DropdownMenuTrigger>
			<DropdownMenuContent forceMount>
				<DropdownMenuLabel>
					<p className="font-semibold">{session.user.name}</p>
					<p className="text-muted">{session.user.email}</p>
				</DropdownMenuLabel>

				<DropdownMenuItem>
						<Button type="submit" variant={'link'} className="w-full text-left">
							Signout
						</Button>
				</DropdownMenuItem>
			</DropdownMenuContent>

		</DropdownMenu>

	)
}

export default UserButton