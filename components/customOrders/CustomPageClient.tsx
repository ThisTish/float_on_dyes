"use client"

import { Decimal } from "@prisma/client/runtime/library"
import { useCallback, useState } from "react"
import CustomDyeImages from "./CustomDyeImages"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import CustomOrderForm from "./CustomOrderForm"
import Link from "next/link"
import { Button } from "../ui/button"
import { AnimatedDiv } from "../ui/AnimatedDiv"
import { Send } from "lucide-react"

type CustomOrderFormProps = {
	discs: {
		id: string,
		name: string,
		brand: string,
		plastic: string,
		weight: number,
		isStamped: boolean,
		price: Decimal | string,
		images: string[],
		slug: string
	}[]
}


const CustomPageClient = ({ discs }: CustomOrderFormProps) => {
	const [currentDyeIndex, setCurrentDyeIndex] = useState(0)

	const handleDyeChange = useCallback((index: number) => {
		setCurrentDyeIndex(index)
	}, [])

	return (
		<section className="grid grid-cols-1 gap-5 md:grid-cols-2">

			{/* images */}
			<div className="w-full">
				<CustomDyeImages currentDyeIndex={currentDyeIndex} />
			</div>

			{/* form */}
			<Card className="p-5">
				<CardHeader>
					<CardTitle className="px-0 text-2xl">Custom Order Form</CardTitle>
					<CardDescription className="-mt-2 text-pretty px-0">Please select from the options below or<Link href="/contact" className="font-bold text-darkGreen hover:text-darkBlue" > contact us</Link> for more options or complex requests.</CardDescription>
				</CardHeader>

				<CardContent className="mb-5">
					<CustomOrderForm discs={discs} handleDyeChange={handleDyeChange} />
				</CardContent>
			</Card>

			{/* contact */}
			<Card className="p-5 md:col-start-2">
				<CardHeader>
					<CardTitle className="text-lg">Looking for something really special, have a big idea, or just have some questions about the process?
					</CardTitle>
				</CardHeader>
				<CardContent>
					<Link href={'/contact'}>
						<Button variant={"outline"}>
							Contact Us
							<AnimatedDiv variant={'outline'} animation={'rotate'}>
								<Send />
							</AnimatedDiv>
						</Button>
					</Link>
				</CardContent>
				<CardFooter className="mt-5">
					<p>or Email us at <a href="mailto:info@floatondyes.com" className="font-semibold text-darkGreen hover:text-darkBlue"> info@floatondyes.com</a></p>
				</CardFooter>

			</Card>
		</section>
	)
}

export default CustomPageClient