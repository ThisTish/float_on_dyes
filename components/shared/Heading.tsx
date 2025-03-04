import { cn } from "@/lib/utils"

const Heading = ({ first, second, className }: { first: string, second: string, className?: string }) => {
	return (
		<h1 className={cn("text-darkBlue text-center", className)}>
			<span className="text-2xl font-light md:text-3xl lg:text-4xl">{first}</span>
			<span className="text-4xl font-bold md:text-5xl lg:text-6xl">{second}</span>
		</h1>
	)
}

export default Heading