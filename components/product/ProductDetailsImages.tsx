"use client"

import { useRef, useState } from "react"
import ProductImage from "./ProductImage"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { BiZoomIn } from "react-icons/bi"
import Link from "next/link"

const ProductDetailsImages = ({ images, name }: { images: string[], name: string }) => {
	const [currentImage, setCurrentImage] = useState(0)
	const picRef = useRef<HTMLImageElement>(null)

	return (
		<div className="space-y-5">
			<div className="group relative size-fit">
				{/* button for big big */}
				<Link href={images[currentImage]} className="absolute right-1 top-1 m-3 text-darkBlue opacity-0 transition duration-500 hover:scale-125 group-hover:z-50 group-hover:opacity-100 group-hover:duration-500" >
					<BiZoomIn size={30} />
				</Link>

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