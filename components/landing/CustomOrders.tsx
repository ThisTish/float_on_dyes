import Marquee from "react-fast-marquee";
import Heading from "../ui/Heading";
import { dyeTypes } from "@/lib/constants/discOptions";
import { getDyeableDiscs } from "@/lib/actions/product.actions";
import Link from "next/link";
import { Button } from "../ui/button";
import { AnimatedDiv } from "../ui/AnimatedDiv";
import { ArrowUpRight } from "lucide-react";

const CustomOrders = async () => {

	const dyableDiscs = await getDyeableDiscs()

	return (
		<section className="mt-32 flex h-fit flex-col space-y-5 p-3 py-5">
			<Heading first="Custom" second="Dyes" className="flex justify-center" />

			{/* dye style  */}
			<div className="flex flex-col space-y-3">
				<p className="text-xl font-semibold text-darkBlue">
					Choose from a bunch of styles...
				</p>
				<Marquee
					speed={75}
					direction="right"
					pauseOnHover={true}
					pauseOnClick={true}
				>
					{dyeTypes.map((dye) => (
						<div className="-mx-5 grid py-3">
							<img src={dye.images[0]} alt={`Image of ${dye.name} dye bed`} key={dye.name} className="mx-auto h-48 w-auto" />
							<span className="p-1 text-center font-light text-darkBlue">{dye.name}</span>
						</div>
					))}
				</Marquee>
			</div>

			{/* disc selection */}
			<div className="flex flex-col space-y-3">
				<p className="text-xl font-semibold text-darkBlue">
					Pick a blank disc...
				</p>
				<div className="flex flex-wrap gap-5">
					{dyableDiscs.map((disc) => (
						<Link href={`/products/${disc.slug}`} key={disc.name} className="grid py-3">
							<img
								src={disc.images[0]} alt={`Image of ${disc.name}`}
								className="mx-auto h-48 w-auto"
							/>
						</Link>
					))}
				</div>
			</div>

			{/* extras */}
			<div className="flex w-full flex-col items-center justify-between md:flex-row">
				<span className="mb-3 text-balance text-center text-xl font-semibold text-darkGreen md:text-start">
					Add some color, extra options, and notes to make it yours!
				</span>

				{/* link Button */}
				<Button
					variant={"default"}
					className="bg-darkGreen"
					asChild
				>
					<Link href="/custom">
						Custom Order Form
						<AnimatedDiv variant={'default'} animation={'rotate'}>
							<ArrowUpRight />
						</AnimatedDiv>
					</Link>
				</Button>
			</div>

		</section>
	)
}

export default CustomOrders;