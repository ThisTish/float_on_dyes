import CustomDyeImages from "@/components/customOrders/CustomDyeImages"
import Banner from "@/components/header/Banner"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form } from "@/components/ui/form"
import { dyeTypes } from "@/lib/constants/dyeTypes"
import { SquareStack } from "lucide-react"
import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
	title: 'Custom Orders'
}

const dyeTypeArray = dyeTypes

const CustomPage = () => {
	return (
		<main className="space-y-10">
		<Banner title="Custom" subtitle="Orders" url="/images/cellHeader.jpg"/>

		<section className="grid grid-cols-1 gap-5 md:grid-cols-2">

			{/* images */}
			<div className="w-full">
		<CustomDyeImages dyeTypes={dyeTypes}/>
			</div>
			<div>
				<Card>
					<CardHeader>
						<CardTitle>Custom Order Form</CardTitle>
						<CardDescription>Please select from the options below or<Link href="/contact"> contact us</Link> for more options or complex requests.</CardDescription>
					</CardHeader>
					<CardContent>
						<Form>
							<form>
								<div className="grid grid-cols-1 gap-5 md:grid-cols-2">
									<div className="flex flex-col gap-2">
										<label htmlFor="name">Name</label>
										<input type="text" id="name" name="name" placeholder="Your Name" className="border p-2" required />
									</div>
									<div className="flex flex-col gap-2">
										<label htmlFor="email">Email</label>
										<input type="email" id="email" name="email" placeholder="Your Email" className="border p-2" required />
									</div>
								</div>
								<div className="mt-5 flex flex-col gap-2">
									<label htmlFor="dyeType">Dye Type</label>
									<select id="dyeType" name="dyeType" className="border p-2">
										{dyeTypeArray.map((dye) => (
											<option key={dye.fragment} value={dye.name}>{dye.name}</option>
										))}
									</select>
								</div>
								<div className="mt-5 flex flex-col gap-2">
									<label htmlFor="message">Message</label>
									<textarea id="message" name="message" rows={4} placeholder="Your Message" className="border p-2"></textarea>
								</div>
								<Button type="submit" className="mt-5"><SquareStack size={20} /> Submit Order</Button>
							</form>
						</Form>
					</CardContent>
				</Card>
			</div>

		</section>
		</main>
	)
}

export default CustomPage