import "@/app/globals.css"
import AdminMainNav from "@/components/admin/AdminMainNav"
import Menu from "@/components/header/Menu"
import { requireAdmin } from "@/lib/auth-guard"
import { APP_NAME } from "@/lib/constants"
import Image from "next/image"
import Link from "next/link"


export default async function AdminLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {

	await requireAdmin()

	return (
		<>
			<header className="fixed top-0 z-50 w-full shadow-md backdrop-blur-md">
				<div className="wrapper flex-between">
					<Link href="/" className="flex-start">
						<Image
							src={'/images/logo.svg'}
							alt={`${APP_NAME} logo`}
							width={48}
							height={48}
						/>
					</Link>
					<AdminMainNav className="mx-6" />
					<div className="ml-auto flex items-center space-x-5">
						<Menu />
					</div>

				</div>

			</header>
			<div className="mt-40 flex min-h-screen flex-col">
				<main className="wrapper flex-1">
					<div className="container mx-auto flex-1 space-y-4 p-8 pt-6">
						{children}
					</div>
				</main>
			</div>
		</>
	)
}
