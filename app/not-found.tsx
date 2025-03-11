import Header from "@/components/header/Header"
import { AnimatedDiv } from "@/components/ui/AnimatedDiv"
import BackButton from "@/components/ui/BackButton"
import { Button } from "@/components/ui/button"
import SearchButton from "@/components/ui/SearchButton"
import { Search } from "lucide-react"
import Link from "next/link"
import { FaHome } from "react-icons/fa"

const NotFoundPage = () => {
	return (
		<div className="bg-[url('/images/notFoundLandscape.svg')] bg-cover bg-center bg-no-repeat h-screen flex items-center justify-center">
			<Header layout="main" />
			<div className="max-w-md flex flex-col items-center mt-20">
				<h1 className="text-5xl font-semibold tracking-tighter md:text-6xl lg:text-7xl">Yanked it!</h1>
				<p className="mb-10 text-lg mt-3 md:text-xl lg:text-2xl">Page not found</p>
				<div className="flex gap-3 justify-center px-5 wrapper">
					<BackButton size="default" />
					<Button variant={'default'} asChild>
						<Link href="/">
							Home Page
							<AnimatedDiv variant={'default'} animation={'scale'}>
								<FaHome />
							</AnimatedDiv>
						</Link>
					</Button>
				</div>
				<div className="self-start w-2/3 mx-auto">
					<SearchButton />
				</div>
				<p>or search for something else</p>
			</div>
		</div>
	)
}

<Search className="text-brightBlue " />
export default NotFoundPage