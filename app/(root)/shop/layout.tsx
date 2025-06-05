import "@/app/globals.css"
import Banner from "@/components/header/Banner"
import SortFilterSearchSection from "@/components/product/SortFilterSearchSection"


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
					<SortFilterSearchSection />
					{children}
				</main>
			</div>
		</>
	)
}
