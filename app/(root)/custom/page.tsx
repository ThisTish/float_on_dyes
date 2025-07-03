import Banner from "@/components/header/Banner"
import { dyeTypes } from "@/lib/constants/discOptions"
import { Metadata } from "next"
import { getDyeableDiscs } from "@/lib/actions/product.actions"
import CustomPageClient from "@/components/customOrders/CustomPageClient"

export const metadata: Metadata = {
	title: 'Custom Orders'
}


// todo 'see more' on small screens for dye type pics or carousel
// todo picture cycle through going crazy

// const dyeTypeArray = dyeTypes

const CustomPage = async () => {

	const dyableDiscs = await getDyeableDiscs()
	if (!dyableDiscs) return (
		// todo make skeleton
		<div>Loading...</div>
	)

	return (
		<main className="space-y-10">
			<Banner title="Custom" subtitle="Orders" url="/images/cellHeader.jpg" />
			<CustomPageClient discs={dyableDiscs} />
		</main>
	)
}

export default CustomPage