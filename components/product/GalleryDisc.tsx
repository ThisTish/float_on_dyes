import Image from "next/image"
import Tooltip from "../ui/Tooltip"
import { X } from "lucide-react"
import Link from "next/link"
import { Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger } from "../ui/dialog"

type GalleryDisc = {
	image: string
	isAvailable: boolean
	dyeType: string
	slug: string
}

const GalleryDisc = ({ image, isAvailable, dyeType, slug }: GalleryDisc) => {

	return (
		<div className="relative flex flex-col">

			<Dialog>
				<DialogTrigger>
					<Tooltip label={dyeType}>
						<Image
							key={image}
							src={image}
							width={300}
							height={300}
							alt={`Image of ${dyeType}`}
						className="hover:cursor-zoom-in"
						/>
					</Tooltip>
				</DialogTrigger>
				<DialogContent aria-description="Zoomed in image" className="m-0 flex h-screen max-h-none w-screen max-w-none items-center justify-center border-none p-0">
					<DialogClose className="absolute right-4 top-4 z-50 text-white opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
						<X className="size-8 text-primary" /><span className="sr-only">Close</span>
					</DialogClose>

					<DialogTitle className="sr-only" >Zoomed in image of {slug}</DialogTitle>
					<img
						className="max-h-full max-w-full object-contain"
						src={image}
						alt={`Image of ${slug}`}
					/>
				</DialogContent>
			</Dialog>

			<span className={`text-center text-sm font-light ${isAvailable ? 'text-lightGreen hover:font-bold' : 'text-lightCta'}`}>
				{isAvailable ? (
					<Link href={`/products/${slug}`}>Available</Link>
				) : 'Sold'}
			</span>
		</div>
	)
}

export default GalleryDisc