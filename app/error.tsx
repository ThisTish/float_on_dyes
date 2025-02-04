"use client"
import Header from "@/components/header/Header"
import { Button } from "@/components/ui/button"
import SearchInput from "@/components/ui/SearchInput"
import Link from "next/link"
import { useRouter } from "next/navigation"

// app/error.js
export default function Error({ error, reset }: any) {

	const router = useRouter()

	return (
		<div className="bg-[url('/notFoundLandscape.svg')] bg-cover bg-center bg-no-repeat h-screen flex items-center justify-center">
			<Header />
			<div className="wrapper flex flex-col items-center mt-20 text-black">
				<h1 className="text-3xl font-semibold tracking-tighter md:text-5xl lg:text-6xl">WTF Richard?!?!?!</h1>
				<p className=" text-lg mt-3 md:text-xl lg:text-2xl">Something went wrong</p>
				<p className="mb-10 mt-3 md:text-lg lg:text-xl">{error.message}</p>

			<div className="flex gap-3 justify-center px-5 wrapper">
				<Button variant={'outline'} onClick={() => router.back()}>
					Go Back
				</Button>
				<Button variant={'default'} onClick={() => reset()}>
					Try Again
				</Button>
				</div>
				<p className="mt-10">or search for something else</p>
				<div className="mt-10 min-w-64 max-w-96 w-full">
					<SearchInput />
				</div>
			</div>
		</div>
	)
}