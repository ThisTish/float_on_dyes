import "@/app/globals.css"
import Footer from "@/components/Footer"
import Header from "@/components/header"


export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<>
			<Header />
			<div className="flex h-screen flex-col">
				<main className="flex-1 wrapper">
					{children}
				</main>
			</div>
			<Footer />
		</>
	)
}
