"use client"
import { useState } from "react"
import { Lens } from "@/components/ui/lens"
import Image from "next/image"

type ProductImageProps = {
	src: string
	width: number
	height: number
	alt: string
}

const ProductImage = ({ src, width, height, alt }: ProductImageProps) => {
	const [hovering, setHovering] = useState(false)

	return (
		<>
			<Lens hovering={hovering} setHovering={setHovering}>
				<Image
					src={src}
					width={width}
					height={height}
					alt={alt}
					className="overflow-hidden object-cover object-center"
					priority
				/>
			</Lens>
		</>

	)
}

export default ProductImage