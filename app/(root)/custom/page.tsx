import CustomDyeImages from "@/components/customOrders/CustomDyeImages"
import Banner from "@/components/header/Banner"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { dyeTypes } from "@/lib/constants/discOptions"
import { Metadata } from "next"
import Link from "next/link"
import CustomOrderForm from "@/components/customOrders/CustomOrderForm"
import { getDyeableDiscs } from "@/lib/actions/product.actions"

export const metadata: Metadata = {
	title: 'Custom Orders'
}


// todo 'see more' on small screens for dye type pics or carousel
// todo picture cycle through going crazy
//> todo change big picture to dyetype when selected

const dyeTypeArray = dyeTypes

const CustomPage = async () => {

	const dyableDiscs = await getDyeableDiscs()
	if (!dyableDiscs) return (
		// todo make skeleton
		<div>Loading...</div>
	)

	const handleImageChange = (index: number) => {
		console.log('do things to customdyeimages, and pass this to Form?')
	}

	return (
		<main className="space-y-10">
			<Banner title="Custom" subtitle="Orders" url="/images/cellHeader.jpg" />

			<section className="grid grid-cols-1 gap-5 md:grid-cols-2">

				{/* images */}
				<div className="w-full">
					<CustomDyeImages dyeTypes={dyeTypes} />
				</div>
				<div>
					<Card className="p-5">
						<CardHeader>
							<CardTitle className="px-0 text-2xl">Custom Order Form</CardTitle>
							<CardDescription className="-mt-2 text-pretty px-0">Please select from the options below or<Link href="/contact"> contact us</Link> for more options or complex requests.</CardDescription>
						</CardHeader>

						<CardContent className="mb-5">
							<CustomOrderForm discs={dyableDiscs} />
						</CardContent>

					</Card>
				</div>
			</section>
		</main>
	)
}

export default CustomPage