"use client"

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
import { USER_PAGE_LINKS } from "@/lib/constants/page-links"

const UserButton = () => {
	const [pending, startTransition] = useTransition()


	const { data: session, status } = useSession()

	if (status !== 'authenticated') {
		return (
			<Link href={'/sign-in'}>
				<Tooltip label="Sign In / Sign Up" position="bottom" className="mt-1">
					<BiUserCircle size={40} className="rounded-full transition-all duration-300 ease-in hover:bg-darkBlue hover:text-white" />
				</Tooltip>
			</Link>
		)
	}


	return (
		<DropdownMenu modal={false} >
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
								<AvatarFallback className="border border-primary bg-transparent font-extrabold text-primary transition-all duration-300 ease-in hover:border-white hover:bg-darkBlue hover:text-white">
									{session.user.name?.charAt(0).toUpperCase() || <BiUserCircle />}
								</AvatarFallback>
							)
						}
					</Avatar>
				</Tooltip>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel className="mb-3">
					<p className="font-bold">{session.user.name}</p>
					<p className="text-muted-foreground">{session.user.email}</p>
				</DropdownMenuLabel>
				{USER_PAGE_LINKS.map((link) => (
					<DropdownMenuItem key={link.name}>
						<Link href={link.href} className="font-semibold">
							{link.name}
						</Link>
					</DropdownMenuItem>
				))}


				{session.user.role === 'admin' ? (
					<DropdownMenuItem>
						<Link href="/admin/dashboard" className="font-semibold">
							Dashboard
						</Link>
					</DropdownMenuItem>
				) : null
				}

				<form action={() => startTransition(() => signOutUser())} >
					<Button variant={'destructive'} size={'sm'} className="m-2" >
						{pending ? <PiSpinnerBallDuotone className="mx-auto animate-spin" /> : "Signout"}
					</Button>
				</form>
			</DropdownMenuContent>

		</DropdownMenu>

	)
}

export default UserButton