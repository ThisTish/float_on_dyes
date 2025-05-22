"use client"

import { Decimal } from "@prisma/client/runtime/library"
import { useCallback, useState } from "react"
import CustomDyeImages from "./CustomDyeImages"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import CustomOrderForm from "./CustomOrderForm"
import Link from "next/link"

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
			<div>
				<Card className="p-5">
					<CardHeader>
						<CardTitle className="px-0 text-2xl">Custom Order Form</CardTitle>
						<CardDescription className="-mt-2 text-pretty px-0">Please select from the options below or<Link href="/contact" className="text-brightBlue hover:text-primary" > contact us</Link> for more options or complex requests.</CardDescription>
					</CardHeader>

					<CardContent className="mb-5">
						<CustomOrderForm discs={discs} handleDyeChange={handleDyeChange} />
					</CardContent>

				</Card>
			</div>
		</section>
	)
}

export default CustomPageClient