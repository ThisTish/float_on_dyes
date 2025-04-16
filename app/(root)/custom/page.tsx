import Banner from "@/components/header/Banner"
import { Metadata } from "next"

export const metadata: Metadata = {
	title: 'Custom Orders'
}

const CustomPage = () => {
	return (
		<>
		<Banner title="Orders" subtitle="Custom" url="/images/cellHeader.jpg"/>
		<main className="">

		</main>
		
		</>
	)
}

export default CustomPage