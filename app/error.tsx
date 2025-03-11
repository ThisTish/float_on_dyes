"use client"
import Header from "@/components/header/Header"
import { AnimatedDiv } from "@/components/ui/AnimatedDiv"
import BackButton from "@/components/ui/BackButton"
import { Button } from "@/components/ui/button"
import SearchButton from "@/components/ui/SearchButton"
import SearchInput from "@/components/ui/SearchInput"
import { RefreshCcw } from "lucide-react"
import { useRouter } from "next/navigation"

// app/error.js
export default function Error({ error, reset }: any) {

	const router = useRouter()

	return (
		<div className="bg-[url('/images/notFoundLandscape.svg')] bg-cover bg-center bg-no-repeat h-screen flex items-center justify-center">
			<Header layout="main" />
			<div className="max-w-md flex flex-col items-center mt-20 text-black">
				<h1 className="text-3xl font-semibold tracking-tighter md:text-5xl lg:text-6xl">WTF Richard?!?!?!</h1>
				<p className=" text-lg mt-3 md:text-xl lg:text-2xl">Something went wrong</p>
				<p className="mb-10 mt-3 md:text-lg lg:text-xl">{error.message}</p>

				<div className="flex gap-3 justify-center px-5 wrapper">
					<BackButton size="default" />
					<Button variant={'default'} onClick={() => reset()}>
						Try Again
						<AnimatedDiv animation={'rotateFull'}><RefreshCcw /></AnimatedDiv>
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