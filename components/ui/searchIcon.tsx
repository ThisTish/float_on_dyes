import { cn } from "@/lib/utils"

const SearchIcon = ({className}: {className?: string}) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" className={cn(' lucide lucide-search', className)}><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
	)
}

export default SearchIcon