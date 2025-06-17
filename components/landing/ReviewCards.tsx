import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Star } from "lucide-react"
import { TbStarFilled } from "react-icons/tb"
import Quotes from "../ui/quotes"

type ReviewCardProps = {
	name: string
	image: string
	review: string
}

const ReviewCards = ({ name, image, review }: ReviewCardProps) => {
	return (
		<div className="flex w-60 flex-col gap-3 p-5 backdrop-brightness-125 md:w-72 lg:w-96">
			{/* <div className="w-fit overflow-hidden rounded-full"> */}
			<Image src={image} alt={`Custom Disc for ${name}`} width={200} height={200} className="mx-auto rounded-full" />
			{/* </div> */}
			<div className="flex flex-col">

				<div className="flex">

					<div className="size-5">
						<Quotes />
					</div>

					<span className="w-fit text-balance font-semibold text-darkBlue dark:text-lightBlue">{review}</span>
					
					<div className="my-3 size-5 rotate-180 self-end">
						<Quotes />
					</div>
					

				</div>
					<span className="mx-1 text-nowrap text-end font-light text-white">
						-{name}
					</span>
			</div>

			{/* <div className="my-auto gap-1 text-pretty">
				
				<p className="font-bold text-darkBlue">
					{name}
				</p>

				<div className="flex gap-1">
					{Array.from({ length: 5 }).map((_, i) => (
						<TbStarFilled key={i} className="size-4 text-lightCta" />
					))}
				</div>

				<p className="text-darkBlue">{review}</p>
			</div> */}
		</div>


	)
}

export default ReviewCards