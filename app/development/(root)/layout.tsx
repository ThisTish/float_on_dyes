import "@/app/globals.css"
import Footer from "@/components/Footer"
import Header from "@/components/header/Header"


export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<>
			<Header />
			<div className="flex flex-col min-h-screen">
				<main className="flex-1 wrapper">
					{children}
				</main>
				<Footer />
			</div>
		</>
	)
}
