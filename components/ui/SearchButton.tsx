import { Search } from "lucide-react"
import { Label } from "./label"
import { Input } from "./input"

const SearchButton = () => {
	return (
		/* From Uiverse.io by jubayer-10 */
		<search
			className="overflow-hidden bg-primary-foreground size-14 hover:w-72 shadow-md rounded-full flex group items-center hover:duration-500 duration-500 hover:rounded-none"
		>
			<div className="relative p-4 rounded-full flex items-center justify-center bg-darkBlue text-white translate-x-0 transition-all group-hover:translate-x-[231px] group-hover:rounded-none duration-500 group-hover:duration-700">
				<Search />
			</div>
			<Label className="sr-only" htmlFor="search">Search</Label>
			<Input
				type="text"
				className="outline-none text-lg bg-transparent w-full text-primary -ml-8 pr-4"
			/>
			
		</search>

	)
}

export default SearchButton