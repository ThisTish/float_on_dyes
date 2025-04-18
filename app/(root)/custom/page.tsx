import Banner from "@/components/header/Banner"
import { SquareStack } from "lucide-react"
import { Metadata } from "next"

export const metadata: Metadata = {
	title: 'Custom Orders'
}

const CustomPage = () => {
	return (
		<main className="space-y-10">
		<Banner title="Custom" subtitle="Orders" url="/images/cellHeader.jpg"/>

		<section className="grid grid-cols-1 gap-5 md:grid-cols-2">

			{/* images */}
			<div className="w-full">
			<SquareStack size={30} className="-scale-x-90" />

			</div>

		</section>
		</main>
	)
}

export default CustomPage