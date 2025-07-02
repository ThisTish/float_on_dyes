import Image from "next/image"
import { BiSolidQuoteAltLeft, BiSolidQuoteAltRight } from "react-icons/bi"

type ReviewCardProps = {
	name: string
	image: string
	review: string
}

const ReviewCards = ({ name, image, review }: ReviewCardProps) => {
	return (
		<div className="flex w-60 flex-col gap-3 p-5 backdrop-brightness-125 md:w-72 lg:w-96">
			<Image src={image} alt={`Custom Disc for ${name}`} width={200} height={200} className="mx-auto rounded-full" />
			<div className="flex flex-col">

				<span className="text-pretty font-semibold text-darkBlue dark:text-lightBlue">
					<BiSolidQuoteAltLeft className="-mt-3 mr-3 inline size-5" />
					{review}
					<BiSolidQuoteAltRight className="-mt-3 ml-3 inline size-5" />
				</span>

				<span className="mx-1 text-nowrap text-end font-light text-white">
					-{name}
				</span>
			</div>

		</div>


	)
}

export default ReviewCards