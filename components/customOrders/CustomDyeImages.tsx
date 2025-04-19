"use client"

import { DyeType } from "@/types"
import { SquareStack } from "lucide-react"
import Link from "next/link"
import Tooltip from "../ui/Tooltip"
import Image from "next/image"
import { useState } from "react"
import { cn } from "@/lib/utils"


const CustomDyeImages = ({ dyeTypes }: { dyeTypes: DyeType[] }) => {
	const [currentDye, setCurrentDye] = useState(0)
	const [currentImage, setCurrentImage] = useState(0)
	const [intervalId, setIntervalId] = useState<NodeJS.Timer | null>(null)

	const { name, fragment, images } = dyeTypes[currentDye]

	return (
		<div className="space-y-5">
			<div className="group relative size-fit">

				{/* button for more images */}
				<Tooltip label="See More Examples" position="top" className="mb-2" >
					<Link href={`/dyeTypeGallery#${fragment}`} className="absolute right-1 top-1 m-3 text-darkBlue opacity-0 transition duration-500 hover:scale-125 hover:bg-darkBlue hover:text-primary-foreground group-hover:z-50 group-hover:opacity-100 group-hover:duration-500" >
						<SquareStack size={30} className="-scale-x-90" />
					</Link>
				</Tooltip>

				{/* big image */}
				<Image
					src={images[currentImage]}
					width={1000}
					height={1000}
					alt={`Image of ${name}`}
					className="object-cover object-center"
					onMouseEnter={() => {
						const intervalId = setInterval(() => {
							setCurrentImage((prev) => (prev + 1) % images.length)
							setIntervalId(intervalId)
						}, 3000)
					}}
					onMouseLeave={() => {
						clearInterval(intervalId as NodeJS.Timeout)
						setCurrentImage(0)
					}}
				/>

				<span className="absolute bottom-1 left-1 m-3">
					{dyeTypes[currentDye].name}
				</span>
			</div>

			{/* small images */}
			<div className="flex flex-wrap gap-5">
				{dyeTypes.map((type, index) => (
					<div className={`group size-28 grid grid-rows-2 grid-cols-1 bg-transparent transition duration-500 hover:border hover:border-darkBlue ${currentDye === index && "border border-darkBlue"}`} key={type.name}>
						<Image
							src={type.images[0]}
							width={100}
							height={100}
							alt={`Image of ${type.name}`}
							onClick={() => setCurrentDye(index)}
							className="mx-auto size-12 cursor-pointer object-cover object-center md:size-24"
						/>
						<p className={`px-1 h-fit opacity-0 self-end group-hover:opacity-100 text-center text-sm font-semibold text-white bg-darkBlue transition-opacity duration-500   ${currentDye === index && 'opacity-100'}`}>
							{type.name}
						</p>
					</div>
				))}
			</div>
		</div>
	)
}

export default CustomDyeImages