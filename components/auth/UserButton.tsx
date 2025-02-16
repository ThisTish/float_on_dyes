import { DropdownMenuLabel } from "@radix-ui/react-dropdown-menu"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Button } from "../ui/button"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { BiUser } from "react-icons/bi"
import { signOut } from "@/auth"

const UserButton = () => {

	const { data: session, status } = useSession()

	if (status !== 'authenticated') {
		return (
			<Link href={'/sign-in'}>
				<Button>
					Sign In
				</Button>
			</Link>
		)
	}

	const userIcon = session.user.image || session?.user?.name?.charAt(0).toUpperCase() || <BiUser />

	return (
		<DropdownMenu>
			<DropdownMenuTrigger >
				<Button variant={'outline'} className="w-10 h-10 rounded-full">
					{userIcon}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent forceMount>
				<DropdownMenuLabel>
					<p className="font-semibold">{session.user.name}</p>
					<p className="text-muted">{session.user.email}</p>
				</DropdownMenuLabel>

				<DropdownMenuItem>
						{/* <Button type="submit" variant={'link'} className="w-full text-left" onClick={() => signOut()}> */}
							Signout
						{/* </Button> */}
					<p>Signout</p>
				</DropdownMenuItem>
			</DropdownMenuContent>

		</DropdownMenu>

	)
}

export default UserButton