import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Star } from "lucide-react"
import { TbStarFilled } from "react-icons/tb"

type ReviewCardProps = {
	name: string
	image: string
	review: string
}

const ReviewCards = ({ name, image, review }: ReviewCardProps) => {
	return (
		<Card className="flex w-fit max-w-sm flex-row">
			<div className="w-10 overflow-hidden rounded-full border">

				<Image src={image} alt={`Custom Disc for ${name}`} width={250} height={250} className="rounded-full" />
			</div>
			<CardContent className="flex flex-col gap-1">
				<p className="font-bold text-darkBlue">
					{name}
				</p>
				<div className="flex gap-1">
					{Array.from({ length: 5 }).map((_, i) => (
						<TbStarFilled key={i} className="h-4 w-4 text-lightCta" />
					))}
				</div>

				<p className="text-darkBlue">{review}</p>
			</CardContent>
		</Card>
	)
}

export default ReviewCards