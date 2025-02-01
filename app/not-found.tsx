import Header from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import SearchInput from "@/components/ui/SearchInput"
import { Ghost, Search } from "lucide-react"

const NotFoundPage = () => {
	return (
		<div className="bg-[url('/notFoundLandscape.svg')] bg-cover bg-center h-screen flex items-center justify-center">
			<Header />
			<div className="flex flex-col items-center">
				<h1 className="text-4xl md:text-7xl">Yanked it!</h1>
				<p className="mb-10">Page not found</p>
				<div className="mb-10">
				<SearchInput />
				</div>
				<Button variant={'outline'}>Home Page</Button>
			</div>
		</div>
	)
}

<Search className="text-brightBlue " />
export default NotFoundPage