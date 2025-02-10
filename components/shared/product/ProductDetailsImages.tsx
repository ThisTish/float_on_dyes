"use client"

import { useState } from "react"
import ProductImage from "./ProductImage"
import Image from "next/image"
import { cn } from "@/lib/utils"

const ProductDetailsImages = ({images, name}: {images: string[], name:string}) => {
	const [currentImage, setCurrentImage] = useState(0)


	return (
		<div className="space-y-5">
			<ProductImage
				src={images[currentImage]}
				width={1000}
				height={1000}
				alt={`Image of ${name}`}
				/>
			<div className="flex flex-wrap gap-5">
				{images.map((image, index) => (
					<Image
						key={index}
						src={image}
						width={100}
						height={100}
						alt={`Image of ${name}`}
						onClick={() => setCurrentImage(index)}
						className={cn("cursor-pointer object-cover object-center size-24", currentImage === index && "border border-darkGreen")}
						/>
				))}
			</div>

		</div>
	)
}

export default ProductDetailsImages