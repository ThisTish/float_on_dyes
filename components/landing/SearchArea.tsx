import { BRANDS } from "@/lib/constants/discOptions"
import SearchButton from "../ui/SearchButton"
import Link from "next/link"
import Heading from "../ui/Heading"
import Marquee from "react-fast-marquee"
import { Button } from "../ui/button"
import { AnimatedDiv } from "../ui/AnimatedDiv"
import { ArrowUpRight } from "lucide-react"


const SearchArea = () => {
	return (
		<section className="mt-10 h-fit space-y-5 p-3">
			<Heading first="Search" second="Brands" className="flex justify-center" />
			<div className="flex h-fit gap-3">
				<Marquee
					speed={50}
					direction="left"
					pauseOnHover={true}
					pauseOnClick={true}
				>
					{BRANDS.map((brand) => (
						<Link href={`/shop/${brand.name}`} key={brand.name}>
							<button
								className="size-20 p-1 hover:bg-foreground md:size-40"
							>
								<img src={brand.image} className="bg-darkBlue"/>
							</button>
						</Link>
					))}
				</Marquee>
			</div>
			<div className="flex justify-between">

			<SearchButton />
			<Button
					variant={"cta"}
					className="h-8 gap-1 px-2 md:h-10 md:gap-2 md:px-3 lg:h-12 lg:gap-3 lg:px-4"
					asChild
					>
					<Link href="/shop">
						Go to Shop
						<AnimatedDiv variant={'cta'} animation={'rotate'}>
							<ArrowUpRight />
						</AnimatedDiv>
					</Link>
				</Button>
					</div>
		</section>
	)
}

export default SearchArea