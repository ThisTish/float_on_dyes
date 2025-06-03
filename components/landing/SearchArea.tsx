import { BRANDS } from "@/lib/constants/discOptions"
import SearchButton from "../ui/SearchButton"
import Link from "next/link"
import Heading from "../ui/Heading"
import Marquee from "react-fast-marquee"


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
						<Link href={`/shop/${brand.name}`}>
							<button
								className="size-20 rounded-full p-1 hover:bg-darkBlue md:size-40"
							>
								<img src={brand.image} />
							</button>
						</Link>
					))}
				</Marquee>
			</div>
			<SearchButton />
		</section>
	)
}

export default SearchArea