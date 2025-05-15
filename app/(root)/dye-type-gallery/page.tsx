import Banner from "@/components/header/Banner"
import { dyeTypes } from "@/lib/constants/discOptions"
import Image from "next/image"

const DyeTypeGallery = async (props:{ params: Promise<{fragment: string}>}) => {

	const {fragment} = await props.params


	return (
		<main className="space-y-10">
			<Banner title="Dye Bed" subtitle="Gallery" url="/images/cellHeader.jpg" />
			<section className="grid grid-cols-1 gap-10">
				{dyeTypes.map((type) => (
					<div className="space-y-3 text-xl font-bold tracking-wide text-darkBlue md:text-2xl">
					<p key={type.name} >{type.name}</p>
					<div className="ml-5 flex flex-nowrap gap-5 overflow-x-auto">
						{type.images.map((image) => (
							<Image
							src={image}
							width={400}
							height={400}
							alt={`Image of ${type.name} dye bed`}
							className="border border-darkBlue p-3"
							id={type.fragment}
							/>
						))}
					</div>

					</div>
				))}
			</section>

		</main>
	)
}

export default DyeTypeGallery