import "@/app/globals.css"
import { APP_DESCRIPTION, APP_NAME, SERVER_URL } from "@/lib/constants"
import { Metadata } from "next"

export const metadata: Metadata = {
	title: {
		template: `%s | ${APP_NAME}`,
		default: APP_NAME
	},
	description: APP_DESCRIPTION,
	metadataBase: new URL(SERVER_URL)
}



export default function AuthLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<>
			<div className="flex-center min-h-screen w-full">
					{children}
			</div>
		</>
	)
}
