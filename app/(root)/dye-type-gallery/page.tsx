import Banner from "@/components/header/Banner"
import { dyeTypes } from "@/lib/constants/discOptions"
import { Metadata } from "next"
import Image from "next/image"
import Marquee from 'react-fast-marquee'
import DyeTypeList from "./DyeTypeList"
import { ArrowUp } from "lucide-react"
import Tooltip from "@/components/ui/Tooltip"

export const metadata: Metadata = {
	title: 'Dye Type Gallery'
}


const DyeTypeGallery = async () => {

	return (
		<main className="space-y-10" id="top">
			<Banner title="Dye" subtitle="Types" url="/images/cellHeader.jpg" />

			{/* list of dye types */}
			<DyeTypeList />

			{/* dye type images */}
			<section className="grid grid-cols-1">
				<button className="fixed bottom-5 right-5 z-50 rounded-full bg-lightGreen p-3 text-darkBlue shadow-lg transition-colors hover:bg-darkBlue hover:text-white">
					<Tooltip label={'Back to top'} className="mb-5">
						<a href="#top">
							<ArrowUp />
						</a>
					</Tooltip>
				</button>
				{dyeTypes.map((type) => (
					<div key={type.name}>
						{/* div to help center anchor jump */}
						<div className="h-20 md:h-28" id={type.fragment}></div>
						<div className="space-y-3 bg-card p-5 text-xl font-bold tracking-wide text-darkBlue md:text-2xl">
							<p >{type.name}</p>

							{/* sm screen */}
							<div className="flex sm:hidden">
								{type.images.length > 1 ? (
									<Marquee
										speed={50}
										direction="left"
										pauseOnHover={true}
										pauseOnClick={true}
										delay={2}
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
								) : (
									type.images.map((image: string) => (
										<Image
											key={image}
											src={image}
											width={200}
											height={200}
											alt={`Image of ${type.name} dye bed`}
										/>
									))
								)}
							</div>

							{/* md and up screen */}
							<div className="hidden sm:flex lg:hidden">
								{type.images.length > 2 ? (
									<Marquee
										speed={50}
										direction="left"
										pauseOnHover={true}
										pauseOnClick={true}
										delay={2}
									>
										{type.images.map((image) => (
											<Image
												key={image}
												src={image}
												width={300}
												height={300}
												alt={`Image of ${type.name} dye bed`}
											/>
										))}
									</Marquee>
								) : (
									type.images.map((image: string) => (
										<Image
											key={image}
											src={image}
											width={300}
											height={300}
											alt={`Image of ${type.name} dye bed`}
										/>
									))
								)}
							</div>

							{/* lg and up screen */}
							<div className="hidden lg:flex">
								{type.images.length > 3 ? (
									<Marquee
										speed={50}
										direction="left"
										pauseOnHover={true}
										pauseOnClick={true}
										delay={2}
									>
										{type.images.map((image) => (
											<Image
												key={image}
												src={image}
												width={375}
												height={375}
												alt={`Image of ${type.name} dye bed`}
											/>
										))}
									</Marquee>
								) : (
									type.images.map((image: string) => (
										<Image
											key={image}
											src={image}
											width={375}
											height={375}
											alt={`Image of ${type.name} dye bed`}
										/>
									))
								)}
							</div>
						</div>
					</div>
				))}
			</section>
			<section className="mx-auto w-2/3 bg-brightBlue p-3 text-white">
				<h3 className="self-start font-semibold italic">*Disclaimer</h3>
				<p className="text-sm font-extralight">
					Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure dolore itaque molestiae rem maiores et debitis. Asperiores iste praesentium aperiam?
				</p>
			</section>
		</main>
	)
}

export default DyeTypeGallery