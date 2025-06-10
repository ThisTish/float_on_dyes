import Banner from "@/components/header/Banner"
import GalleryDisc from "@/components/product/GalleryDisc"

const GalleryPage = () => {
	return (
		<main className="space-y-10">
			<Banner title="Disc" subtitle="Gallery" url="/images/cellHeader.jpg">
				<div className="absolute right-1 top-16 mt-1 p-1 text-xs font-extralight text-primary backdrop-blur-xl md:right-5 md:top-14 md:text-base md:font-normal lg:top-20" >

					<p className="text-pretty">Click disc to zoom in</p>
					<p className="text-pretty">If 'Available', click to go to product page.</p>
				</div>
			</Banner>
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