import Banner from "@/components/header/Banner"
import GalleryDisc from "@/components/product/GalleryDisc"

// todo get discs that have been dyed and map over instead of hardcoded
// todo spread them evenly when final pictures are in. x gap too wide

const GalleryPage = () => {
	return (
		<main className="space-y-20">
			<Banner title="Disc" subtitle="Gallery" url="/images/cellHeader.jpg" />

			<div className="grid justify-center grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

				<GalleryDisc
					image="/images/discs/cloudbreaker.png"
					isAvailable={true}
					dyeType="Cell pull"
					slug="cloud-breaker-cell-swirl"
					discName="Cloud Breaker"
				/>
				<GalleryDisc
					image="/images/discs/cloudbreaker.png"
					isAvailable={false}
					dyeType="Cell pull"
					slug="cloud-breaker-cell-swirl"
					discName="Cloud Breaker"
				/>
				<GalleryDisc
					image="/images/discs/cloudbreaker.png"
					isAvailable={true}
					dyeType="Cell pull"
					slug="cloud-breaker-cell-swirl"
					discName="Cloud Breaker"
				/>
				<GalleryDisc
					image="/images/discs/cloudbreaker.png"
					isAvailable={true}
					dyeType="Cell pull"
					slug="cloud-breaker-cell-swirl"
					discName="Cloud Breaker"
				/>
				<GalleryDisc
					image="/images/discs/cloudbreaker.png"
					isAvailable={true}
					dyeType="Cell pull"
					slug="cloud-breaker-cell-swirl"
					discName="Cloud Breaker"
				/>
			</div>
		</main>
	)
}

export default GalleryPage