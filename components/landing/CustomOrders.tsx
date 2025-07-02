import Marquee from "react-fast-marquee";
import Heading from "../ui/Heading";
import { dyeTypes } from "@/lib/constants/discOptions";

const CustomOrders = () => {
	return (
		<section className="mt-32 flex h-fit flex-col space-y-5 bg-darkBlue p-3 pt-5">
			<Heading first="Custom" second="Dyes" className="flex justify-center" />
			<Marquee
				speed={75}
				direction="right"
				pauseOnHover={true}
				pauseOnClick={true}
			>
				{dyeTypes.map((dye) => (
					<div className="mx-3 flex size-48 flex-col items-stretch justify-center bg-card">
						<img src={dye.images[0]} alt={`Image of ${dye.name} dye bed`} key={dye.name} className="size-40 object-center p-1" />
						<span className="text-center text-sm font-semibold">{dye.name}</span>
					</div>
				))}

			</Marquee>
		</section>
	)
}

export default CustomOrders;