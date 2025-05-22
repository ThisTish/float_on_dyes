"use client"

import { useRef, useState } from "react"
import ProductImage from "./ProductImage"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { BiZoomIn } from "react-icons/bi"
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import { X } from "lucide-react"


const ProductDetailsImages = ({ images, name }: { images: string[], name: string }) => {
	const [currentImage, setCurrentImage] = useState(0)
	const picRef = useRef<HTMLImageElement>(null)

	return (
		<div className="space-y-5">
			<div className="group relative size-fit">
				{/* button for big big */}
				{/* button for big big */}
				<Dialog>
					<DialogTrigger asChild>
						<BiZoomIn size={30} className="absolute right-1 top-1 m-3 text-darkBlue opacity-0 transition duration-500 hover:scale-125 group-hover:z-50 group-hover:opacity-100 group-hover:duration-500" />
					</DialogTrigger>
					<DialogContent className="m-0 flex h-screen max-h-none w-screen max-w-none items-center justify-center border-none bg-black/90 p-0">
						<DialogClose className="absolute right-4 top-4 z-50 text-white opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
							<X className="size-8" /><span className="sr-only">Close</span>
						</DialogClose>

						<DialogTitle className="hidden">Zoomed in image of {name}</DialogTitle>
						<img
							className="max-h-full max-w-full object-contain"
							src={images[currentImage]}
							alt={`Image of ${name}`}
							ref={picRef}
						/>
					</DialogContent>
				</Dialog>

				{/* main big image */}
				<ProductImage
					src={images[currentImage]}
					width={1000}
					height={1000}
					alt={`Image of ${name}`}
				/>
			</div>

			{/* small images */}
			<div className="flex flex-wrap gap-5">
				{images.map((image, index) => (
					<Image
						key={index}
						src={image}
						width={100}
						height={100}
						alt={`Image of ${name}`}
						onClick={() => setCurrentImage(index)}
						className={cn("cursor-pointer object-cover object-center size-12 md:size-24", currentImage === index && "border border-darkGreen")}
					/>
				))}
			</div>
		</div>
	)
}

export default ProductDetailsImages