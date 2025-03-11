import "@/app/globals.css"
import { auth } from "@/auth"
import Footer from "@/components/Footer"
import Header from "@/components/header/Header"
import { SessionProvider } from "next-auth/react"
import { redirect } from "next/navigation"

// todo when taking out the auth-remove the async

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {


	// const session = await auth()
	// if(!session?.user) redirect('/coming-soon')

	return (
		<>
			<SessionProvider>
				<Header layout="main" />
				<div className="flex flex-col min-h-screen">
					<main className="flex-1 wrapper my-40">
						{children}
					</main>
					<Footer />
				</div>
			</SessionProvider>

		</>
	)
}
