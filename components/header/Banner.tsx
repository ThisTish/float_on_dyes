import { ReactNode } from "react"
import Heading from "../ui/Heading"
import { cn } from "@/lib/utils"

type BannerProps = {
	title: string
	subtitle: string
	url: string
	darkUrl?: string
	className?: string
	children?: ReactNode
}

const Banner = ({url, darkUrl, title, subtitle, children, className }: BannerProps) => {
	return (
		<header className={cn("relative h-28 w-full md:h-32 lg:h-40", className)}>

			<div
				className="absolute inset-0 bg-cover bg-center bg-no-repeat dark:hidden"
				style={{ backgroundImage: `url(${url})` }}
			/>

			<div
				className="absolute inset-0 hidden bg-cover bg-center bg-no-repeat dark:block"
				style={{ backgroundImage: `url(${darkUrl ?? url})` }}
			/>

			<div className="relative z-10">
				<Heading
					first={title}
					second={subtitle}
					className="absolute left-5 top-5 size-fit px-3 py-1 text-white shadow-[0_35px_35px_rgba(0,0,0,0.25)] backdrop-blur-md"
				/>
				{children}
			</div>
		</header>
	)
}

export default Banner