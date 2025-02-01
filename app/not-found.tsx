import Header from "@/components/header"
import { Button } from "@/components/ui/button"
import SearchInput from "@/components/ui/SearchInput"
import { Ghost, Search } from "lucide-react"
import Link from "next/link"

const NotFoundPage = () => {
	return (
		<div className="bg-[url('/notFoundLandscape.svg')] bg-cover bg-center bg-no-repeat h-screen flex items-center justify-center">
			<Header />
			<div className="wrapper flex flex-col items-center">
				<h1 className="text-5xl font-semibold tracking-tighter md:text-6xl lg:text-7xl">Yanked it!</h1>
				<p className="mb-10 text-lg mt-3 md:text-xl lg:text-2xl">Page not found</p>
				<div className="mb-10 min-w-64 max-w-96 w-full">
					<SearchInput />
				</div>
				<Button variant={'outline'} asChild>
					<Link href="/">
						Home Page
					</Link>
				</Button>
			</div>
		</div>
	)
}

<Search className="text-brightBlue " />
export default NotFoundPage