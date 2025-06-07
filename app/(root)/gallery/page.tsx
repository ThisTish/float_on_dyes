import Banner from "@/components/header/Banner"
import GalleryDisc from "@/components/product/GalleryDisc"

const GalleryPage = () => {
	return (
		<main className="space-y-10">
			<Banner title="Disc" subtitle="Gallery" url="/images/cellHeader.jpg" />
			<div className="flex flex-wrap gap-1">

				<GalleryDisc
					image="/images/discs/cloudbreaker.png"
					isAvailable={true}
					dyeType="Cell pull"
					slug="cloud-breaker-cell-swirl"
				/>
				<GalleryDisc
					image="/images/discs/cloudbreaker.png"
					isAvailable={false}
					dyeType="Cell pull"
					slug="cloud-breaker-cell-swirl"
				/>
				<GalleryDisc
					image="/images/discs/cloudbreaker.png"
					isAvailable={true}
					dyeType="Cell pull"
					slug="cloud-breaker-cell-swirl"
				/>
				<GalleryDisc
					image="/images/discs/cloudbreaker.png"
					isAvailable={true}
					dyeType="Cell pull"
					slug="cloud-breaker-cell-swirl"
				/>
				<GalleryDisc
					image="/images/discs/cloudbreaker.png"
					isAvailable={true}
					dyeType="Cell pull"
					slug="cloud-breaker-cell-swirl"
				/>
			</div>
		</main>
	)
}

export default GalleryPage