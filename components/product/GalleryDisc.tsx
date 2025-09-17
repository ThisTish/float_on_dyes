import Image from "next/image"
import Tooltip from "../ui/Tooltip"
import { CircleOff, X } from "lucide-react"
import Link from "next/link"
import { Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger } from "../ui/dialog"
import { BiSolidStore } from "react-icons/bi"

type GalleryDisc = {
	image: string
	discName: string
	isAvailable: boolean
	dyeType: string
	slug?: string
}

// todo button for only show available
// todo lazy load more images -infinite scroll

const GalleryDisc = ({ image, isAvailable, dyeType, slug, discName }: GalleryDisc) => {

	return (
		<div className="group relative flex flex-col">

			{!isAvailable ? (
				<Dialog>
					<DialogTrigger>
						<Tooltip label={dyeType}>
							<div className="flex flex-col items-center">
								<Image
									key={image}
									src={image}
									width={450}
									height={450}
									alt={`Image of ${dyeType}`}
									className="hover:cursor-zoom-in"
								/>
								<span className="text-center text-sm font-light">{discName}</span>
							</div>
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
			) : (
				<Tooltip label={dyeType}>
					<div className="flex flex-col text-center">
						<Link href={`/products/${slug}`}>
							<Image
								key={image}
								src={image}
								width={450}
								height={450}
								alt={`Image of ${dyeType}`}
							/>
							<span className="text-sm font-light" >{discName}</span>
						</Link>
					</div>
				</Tooltip>
			)}

			<div className="absolute right-1 top-1 z-10 p-3 md:hidden lg:group-hover:flex">
				{isAvailable ? (
					<Link href={`/products/${slug}`}>
						<BiSolidStore className="text-darkGreen" size={16} />
					</Link>
				) : (
					<CircleOff className="text-lightCta" size={16} />
				)}
			</div>

			{/* <span className={`text-center text-sm font-light ${isAvailable ? 'text-lightGreen hover:font-bold' : 'text-lightCta'}`}>
				{isAvailable ? (
					<Link href={`/products/${slug}`}>Available</Link>
				) : 'Sold'}
			</span> */}
		</div>
	)
}

export default GalleryDisc