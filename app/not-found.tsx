import Header from "@/components/header/Header"
import BackButton from "@/components/ui/BackButton"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import Link from "next/link"

const NotFoundPage = () => {
	return (
		<div className="bg-[url('/images/notFoundLandscape.svg')] bg-cover bg-center bg-no-repeat h-screen flex items-center justify-center">
			<Header layout="main"/>
			<div className="wrapper flex flex-col items-center">
				<h1 className="text-5xl font-semibold tracking-tighter md:text-6xl lg:text-7xl">Yanked it!</h1>
				<p className="mb-10 text-lg mt-3 md:text-xl lg:text-2xl">Page not found</p>
				<div className="flex gap-3">

				<BackButton size="lg" />
				<Button variant={'outline'} size={'lg'} asChild>
					<Link href="/">
						Home Page
					</Link>
				</Button>
				</div>
			</div>
		</div>
	)
}

<Search className="text-brightBlue " />
export default NotFoundPage