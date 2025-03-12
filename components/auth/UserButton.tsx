import { DropdownMenuLabel } from "@radix-ui/react-dropdown-menu"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Button } from "../ui/button"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { BiUserCircle } from "react-icons/bi"
import Tooltip from "../ui/Tooltip"
import { Avatar, AvatarFallback } from "../ui/avatar"
import Image from "next/image"
import { signOutUser } from "@/lib/actions/users.actions"
import { useTransition } from "react"
import { PiSpinnerBallDuotone } from "react-icons/pi"

const UserButton = () => {
	const [pending, startTransition] = useTransition()


	const { data: session, status } = useSession()

	if (status !== 'authenticated') {
		return (
			<Link href={'/sign-in'}>
				<Tooltip label="Sign In" position="bottom" className="mt-1">
					<BiUserCircle size={40} className="transition-all duration-300 ease-in hover:text-primary-foreground hover:bg-darkBlue rounded-full" />
				</Tooltip>
			</Link>
		)
	}


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
								<AvatarFallback className="bg-transparent text-primary border border-primary font-extrabold transition-all duration-300 ease-in hover:text-white hover:border-white hover:bg-darkBlue">
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
				<DropdownMenuItem>
					<Link href="/user/profile">
						<Button variant={'link'} className="w-full text-start p-0 rounded-full">
							Profile
						</Button>
					</Link>
				</DropdownMenuItem>
				<DropdownMenuItem>
					<Link href="/user/orders">
						<Button variant={'link'} className="w-full text-start p-0 rounded-full">
							Orders
						</Button>
					</Link>
				</DropdownMenuItem>

				{session.user.role === 'admin' ? (
					<DropdownMenuItem>
						<Link href="/admin/dashboard">
							<Button variant={'link'} className="w-full text-start p-0 rounded-full">
								Dashboard
							</Button>
						</Link>
					</DropdownMenuItem>
				) : null
				}

				<form action={() => startTransition(() => signOutUser())}>
					<Button variant={'link'} className={`relative justify-start ml-2 flex w-fit cursor-default select-none items-center gap-2 px-2 py-1.5 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0 text-start p-0 before:hover:bg-destructive rounded-full ${pending ? 'focus:bg-transparent' : "focus:bg-blue-50/50}"}`}>
						{pending ? <PiSpinnerBallDuotone className="animate-spin mx-auto" /> : "Signout"}
					</Button>
				</form>
			</DropdownMenuContent>

		</DropdownMenu>

	)
}

export default UserButton