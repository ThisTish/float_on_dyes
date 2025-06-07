import { BRAND_OPTIONS, DISC_TYPES, SORT_OPTIONS } from "@/lib/constants/discOptions"
import { FilterSelect } from "./FilterSelect"
import { ArrowUpRight, X } from "lucide-react"
import { AnimatedDiv } from "../ui/AnimatedDiv"
import { Button } from "../ui/button"
import SearchButton from "../ui/SearchButton"

const SortFilterSearchSection = () => {
	return (
		<section className="flex flex-col gap-3 bg-lightGreen p-5">
			<div className="flex flex-col items-center justify-end gap-3 md:flex-row md:flex-wrap">
				<div className="-ml-5 mr-auto mt-4">

					<SearchButton />
				</div>

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

			</div>
			<div className="flex items-baseline justify-between">
				<div className="flex flex-wrap gap-3">


					<Button variant={'chip'} size={'chip'} className="items-center gap-1 pr-0" >tag <X className="scale-75 group-hover:scale-90 group-hover:text-lightCta" /></Button>
					<Button variant={'chip'} size={'chip'} className="items-center gap-1 pr-0" >button <X className="scale-75 group-hover:scale-90 group-hover:text-lightCta" /></Button>
					<Button variant={'chip'} size={'chip'} className="items-center gap-1 pr-0" >name <X className="scale-75 group-hover:scale-90 group-hover:text-lightCta" /></Button>
					<Button variant={'chip'} size={'chip'} className="items-center gap-1 pr-0" >person <X className="scale-75 group-hover:scale-90 group-hover:text-lightCta" /></Button>
					<Button variant={'chip'} size={'chip'} className="items-center gap-1 pr-0" >disc <X className="scale-75 group-hover:scale-90 group-hover:text-lightCta" /></Button>
				</div>
				{/* {tags ? (
					tags.map((tag) => (
						<Button
						key={tag.name}
						variant={'chip}
						size={'chip}
						))
						>{tag}
						<X />
						</Button>
						): null } */}
				<Button
					variant={'outline'}
					size={'sm'}
					type={'submit'}
					className="mt-1 w-fit p-3 md:mt-5"
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