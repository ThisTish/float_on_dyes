"use client"
import Image from "next/image"
import { useRouter } from "next/navigation"
import Tooltip from "../ui/Tooltip"

type GalleryDisc = {
	image: string
	isAvailable: boolean
	dyeType: string
	slug: string
}

const GalleryDisc = ({ image, isAvailable, dyeType, slug }: GalleryDisc) => {

	const router = useRouter()

	return (
		<div className="flex flex-col border border-black">

			<Tooltip label={dyeType}>

				<button
					onClick={isAvailable
						? () => router.push(`/products/${slug}`)
						: undefined
						// zoomed modal
					}
					className={`rounded-lg  ${isAvailable ? "cursor-pointer" : "cursor-default"
						}`}
				>
					<Image
						key={image}
						src={image}
						width={300}
						height={300}
						alt={`Image of ${dyeType}`}
					/>
				</button>
			</Tooltip>
				<span className={`text-center text-sm font-light ${isAvailable ? 'text-lightGreen' : 'text-lightCta'}`}>{isAvailable ? 'Available': 'Sold'}</span>
		</div>
	)
}

export default GalleryDisc