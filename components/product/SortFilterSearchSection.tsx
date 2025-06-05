import { BRAND_OPTIONS, DISC_TYPES, SORT_OPTIONS } from "@/lib/constants/discOptions"
import { FilterSelect } from "./FilterSelect"
import { ArrowUpRight } from "lucide-react"
import { AnimatedDiv } from "../ui/AnimatedDiv"
import { Button } from "../ui/button"
import SearchButton from "../ui/SearchButton"

const SortFilterSearchSection = () => {
	return (
		<section className="flex flex-col gap-3 bg-lightGreen p-5">
			<div className="flex flex-col items-center gap-3 md:flex-row md:flex-wrap">

				<FilterSelect
					group="Brand"
					placeholder="Search By Brand"
					list={BRAND_OPTIONS}
				/>
				<FilterSelect
					group="Type"
					placeholder="Search By Type"
					list={DISC_TYPES}
				/>
				<FilterSelect
					group="Sort"
					placeholder="Sort"
					list={SORT_OPTIONS}
				/>

				<Button
					variant={'outline'}
					size={'sm'}
					type={'submit'}
				className="mt-1 md:mt-5"
				>
					<AnimatedDiv
						variant={'outline'}
						size={'sm'}
						animation={'rotate'}
					>
						<ArrowUpRight />
					</AnimatedDiv>
					Apply
				</Button>
			</div>
			<div className="-ml-3 flex w-full flex-col justify-end pt-3">
				<span className='z-0 ml-4 text-center sm:text-start'> ...or search</span>
				<SearchButton />
			</div>
			{/* pagination? or load more button.... */}
		</section>
	)
}

export default SortFilterSearchSection


// *trying to play with this, not sure that's the route i want to go.
// 			<ComboBox
// 					field={null}
// 					label="Brand"
// 					placeholder="Brand"
// 					list={BRAND_OPTIONS}/>