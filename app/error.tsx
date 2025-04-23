"use client"
import Header from "@/components/header/Header"
import { AnimatedDiv } from "@/components/ui/AnimatedDiv"
import BackButton from "@/components/ui/BackButton"
import { Button } from "@/components/ui/button"
import SearchButton from "@/components/ui/SearchButton"
import { RefreshCcw } from "lucide-react"
import { useRouter } from "next/navigation"

// app/error.js
export default function Error({ error, reset }: any) {


	return (
		<div className="flex h-screen items-center justify-center bg-[url('/images/notFoundLandscape.svg')] bg-cover bg-center bg-no-repeat">
			<Header layout="main" />
			<div className="mt-20 flex max-w-md flex-col items-center text-black">
				<h1 className="text-nowrap text-3xl font-semibold md:text-5xl lg:text-6xl">WTF Richard?!?!?!</h1>
				<p className="mt-3 text-lg md:text-xl lg:text-2xl">Something went wrong</p>
				<p className="mb-10 mt-3 md:text-lg lg:text-xl">{error.message}</p>

				<div className="wrapper flex justify-center gap-3 px-5">
					<BackButton size="default" />
					<Button variant={'default'} onClick={() => reset()}>
						Try Again
						<AnimatedDiv animation={'rotateFull'}><RefreshCcw /></AnimatedDiv>
					</Button>
				</div>
				<div className="mx-auto w-2/3 self-start">
					<SearchButton />
				</div>
				<p>or search for something else</p>
			</div>
		</div>
	)
}