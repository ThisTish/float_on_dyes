import { DropdownMenuLabel } from "@radix-ui/react-dropdown-menu"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Button } from "../ui/button"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { BiUser, BiUserCircle } from "react-icons/bi"
import Tooltip from "../ui/Tooltip"
import { Avatar, AvatarFallback } from "../ui/avatar"
import Image from "next/image"
import { signOutUser } from "@/lib/actions/users.actions"

const UserButton = () => {

	const { data: session, status } = useSession()

	if (status !== 'authenticated') 
		{
		return (
			<Link href={'/sign-in'}>
				<Tooltip label="Sign In" position="bottom" className="mt-1">
					<BiUserCircle size={40} className="transition-all duration-300 ease-in hover:text-primary-foreground hover:bg-darkBlue rounded-full" />
				</Tooltip>
			</Link>
		)
	}

	const userIcon = session.user.image || session?.user?.name?.charAt(0).toUpperCase() || <BiUser />

	return (
		<DropdownMenu modal={false}>
			<DropdownMenuTrigger className="rounded-full" >
				<Tooltip label="User Menu" position="bottom" className="mt-2">
					<Avatar>
						{session.user.image
							? (
								<Image
									src={session.user.image}
									alt="user avatar"
									width={40}
									height={40}
								/>
							) : (
								<AvatarFallback className="bg-transparent text-primary border border-primary font-extrabold transition-all duration-300 ease-in hover:text-primary-foreground hover:border-primary-foreground hover:bg-darkBlue">
									{session.user.name?.charAt(0).toUpperCase() || <BiUserCircle />}
								</AvatarFallback>
							)
						}
					</Avatar>
				</Tooltip>
			</DropdownMenuTrigger>
			<DropdownMenuContent >
				<DropdownMenuLabel>
					<p className="font-semibold">{session.user.name}</p>
					<p className="text-muted-foreground">{session.user.email}</p>
				</DropdownMenuLabel>
				<form action={signOutUser}>
					<Button variant={'link'} className="w-full text-start p-0 before:hover:bg-destructive">
						Signout
					</Button>
				</form>
			</DropdownMenuContent>

		</DropdownMenu>

	)
}

export default UserButton