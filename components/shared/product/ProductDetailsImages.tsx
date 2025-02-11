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
			<div className="size-fit group relative">
				<Link href={images[currentImage]} className="absolute m-3 top-1 right-1 transition duration-500 text-darkBlue opacity-0 group-hover:opacity-100 group-hover:duration-500 group-hover:z-50 hover:scale-125" >
					<BiZoomIn size={30}	/>
				</Link>
					<ProductImage
						src={images[currentImage]}
						width={1000}
						height={1000}
						alt={`Image of ${name}`}
					/>
			</div>
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