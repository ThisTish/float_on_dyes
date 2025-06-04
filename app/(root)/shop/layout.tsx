import "@/app/globals.css"
import ComboBox from "@/components/cart/ComboBox"
import Banner from "@/components/header/Banner"
import { FilterSelect } from "@/components/product/FilterSelect"
import { BRAND_OPTIONS } from "@/lib/constants/discOptions"


export default async function ShopLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {


	return (
		<>
			<div className="flex min-h-screen flex-col">
				<main className="space-y-10">
				<Banner title="Disc" subtitle="Shop" url="/images/cellHeader.jpg" darkUrl="/images/cellHeader-dark.jpg" />
				<FilterSelect
					group="Brand"
					placeholder="Search By Brand"
					list={BRAND_OPTIONS}
					/>
				{/* trying to play with this, not sure that's the route i want to go. */}
				{/* <ComboBox 
				field={null}
				label="Brand"
				placeholder="Brand"
				list={BRAND_OPTIONS}/> */}
					{children}
				</main>
			</div>
		</>
	)
}
