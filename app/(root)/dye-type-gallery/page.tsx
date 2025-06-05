import Banner from "@/components/header/Banner"
import { dyeTypes } from "@/lib/constants/discOptions"
import { Metadata } from "next"
import Image from "next/image"
import Marquee from 'react-fast-marquee'

export const metadata: Metadata = {
	title: 'Dye Type Gallery'
}

// todo make smooth scroll
// todo scroll to right part of dye type section. it is too high up rn
// todo back to top button
// todo slide out menu for types on mobile


const DyeTypeGallery = async () => {

	return (
		<main className="space-y-10">
			<Banner title="Dye" subtitle="Types" url="/images/cellHeader.jpg" />

			{/* list of dye types */}
			<section className="hidden flex-wrap justify-center bg-lightGreen p-5 text-center md:flex">
				{dyeTypes.map((type) => (
					<span className="p-3">
						<a
							key={type.name}
							href={`#${type.fragment}`}
							className="font-semibold text-darkBlue hover:text-white md:text-xl">
							{type.name}
						</a>
					</span>
				))}
			</section>

			{/* mobile dye type list */}
			<div className="md:hidden">

			</div>

			{/* dye type images */}
			<section className="grid grid-cols-1 gap-5">
				{dyeTypes.map((type) => (
					<div id={type.fragment} key={type.name} className="space-y-3 text-xl font-bold tracking-wide text-darkBlue md:text-2xl">
						<p key={type.name} className="mt-5">{type.name}</p>
						{/* small screen */}
						<div className="md:hidden">
							<Marquee
								speed={50}
								direction="left"
								pauseOnHover={true}
								pauseOnClick={true}
							>
								{type.images.map((image) => (
									<Image
										key={image}
										src={image}
										width={200}
										height={200}
										alt={`Image of ${type.name} dye bed`}
									/>
								))}
							</Marquee>
						</div>

						{/* md and up screen */}
						<div className="hidden md:flex">
							{type.images.length > 3 ? (
								<Marquee
									speed={50}
									direction="left"
									pauseOnHover={true}
									pauseOnClick={true}
								>
									{type.images.map((image) => (
										<Image
											key={image}
											src={image}
											width={400}
											height={400}
											alt={`Image of ${type.name} dye bed`}
										/>
									))}
								</Marquee>
							) : (
								// if not enough to carousel
								type.images.map((image: string) => (
									<Image
										key={image}
										src={image}
										width={400}
										height={400}
										alt={`Image of ${type.name} dye bed`}
									/>
								))
							)}
						</div>
					</div>
				))}
			</section>

		</main>
	)
}

export default DyeTypeGallery