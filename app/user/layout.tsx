import "@/app/globals.css"
import Menu from "@/components/header/Menu"
import MainNav from "@/components/user/MainNav"
import Image from "next/image"
import Link from "next/link"


export default async function UserLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {



	return (
		<>
			<header className="w-full fixed top-0 z-50 backdrop-blur-md shadow-md">
				<div className="wrapper flex-between">
					<Link href="/" className="flex-start ">
						<Image
							src={'/images/logo.svg'}
							alt={`{APP_NAME} logo`}
							width={48}
							height={48}
						/>
					</Link>
					<MainNav className="mx-6" />
					<div className="ml-auto items-center flex space-x-5">
						<Menu />
					</div>

				</div>

			</header>
			<div className="flex flex-col min-h-screen">
				<main className="flex-1 wrapper">
					<div className="flex-1 space-y-4 p-8 pt-6 container mx-auto">
						{children}
					</div>
				</main>
			</div>
		</>
	)
}
