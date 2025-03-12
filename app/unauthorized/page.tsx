import { AnimatedDiv } from "@/components/ui/AnimatedDiv"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Metadata } from "next"
import Link from "next/link"
import { FaHome } from "react-icons/fa"
import { PiWarningCircleDuotone } from "react-icons/pi"

export const metadata: Metadata = {
	title: "Unauthorized Access"
}
const UnauthorizedPage = () => {
	return (
		<Card className="mx-auto flex flex-col justify-center items-center max-w-md my-40 p-10">
			<CardHeader >
					<PiWarningCircleDuotone size={50} className="mx-auto animate-pulse text-destructive"/>
				<CardTitle className="text-2xl text-center">
					Unauthorized Access
				</CardTitle>
				<CardDescription>
					You do not have permission to access this page
				</CardDescription>
			</CardHeader>
			<CardContent className="text-balance text-center">
				If you believe this is an error, please contact the site administrator.
			</CardContent>
			<CardFooter className="grid mt-3">
				<p className="text-xs text-center">
				Please return to the home page and continue browsing the site.
				</p>
				<Button variant={'default'} asChild>
					<Link href="/">
						Home Page
						<AnimatedDiv variant={'default'} animation={'scale'}>
							<FaHome />
						</AnimatedDiv>
					</Link>
				</Button>
			</CardFooter>
		</Card>

	)
}

export default UnauthorizedPage