import Banner from "@/components/header/Banner"
import { dyeTypes } from "@/lib/constants/discOptions"
import { Metadata } from "next"
import Image from "next/image"
import Marquee from 'react-fast-marquee'

export const metadata: Metadata = {
	title: 'Dye Type Gallery'
}


const DyeTypeGallery = async (props: { params: Promise<{ fragment: string }> }) => {

	const { fragment } = await props.params


	return (
		<main className="space-y-10">
			<Banner title="Dye" subtitle="Types" url="/images/cellHeader.jpg" />
			<section className="grid grid-cols-1 gap-5">
				{dyeTypes.map((type) => (
					<div id={type.fragment} key={type.name} className="space-y-3 text-xl font-bold tracking-wide text-darkBlue md:text-2xl">
						<p  key={type.name} className="mt-5">{type.name}</p>
						<Marquee
							speed={50}
							direction="left"
							pauseOnHover={true}
							pauseOnClick={true}
							gradient={true}
							gradientColor="94, 172, 234"
						>
							{type.images.map((image) => (
								<Image
									key={image}
									src={image}
									width={400}
									height={400}
									alt={`Image of ${type.name} dye bed`}
								// className="overflow-hidden rounded-full border object-cover object-center p-3"
								/>
							))}
						</Marquee>
					</div>
				))}
			</section>

		</main>
	)
}

export default DyeTypeGallery