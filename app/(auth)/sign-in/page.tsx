import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { APP_NAME } from "@/lib/constants"
import Image from "next/image"
import Link from "next/link"
import CredentialsSignIn from "./CredentialsSignIn"
import { auth } from "@/auth"
import { redirect } from "next/navigation"

const SignInPage = async (props: { searchParams: Promise<{ callbackUrl: string }> }) => {

	const { callbackUrl } = await props.searchParams
	const session = await auth()

	if (session) {
		return redirect(callbackUrl || '/')
	}

	return (
		<main className="w-full max-w-md mx-auto">
			<Card className="p-5 bg-lightGreen dark:bg-card">
				<CardHeader className="inline-flex flex-row px-10 gap-10">
					<Link href={'/'} className="flex ">
						<Image
							className=""
							src={'/images/logo.svg'}
							width={50}
							height={50}
							alt={`${APP_NAME} logo`}
						/>
					</Link>
					<div className="flex flex-col items-center">
						<CardTitle className="text-2xl">
							Sign In
						</CardTitle>
						<CardDescription>
							Sign in to yor account
						</CardDescription>
					</div>
				</CardHeader>
				<CardContent>
					<CredentialsSignIn />
				</CardContent>
			</Card>
		</main>

	)
}

export default SignInPage