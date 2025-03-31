import { Card, CardContent, CardTitle, CardDescription, CardFooter } from "../ui/card"

const ProductCardSkeleton = () => {
	return (

		<Card className="w-64 max-w-72 border-2 border-darkBlue">

			<CardContent >

				{/* image */}
				<div className="mx-auto h-52 w-52 animate-pulse rounded-full bg-muted"></div>
			</CardContent>

			{/* title */}
			<CardTitle className="h-20">
				<div className="h-8 w-52 animate-pulse bg-muted delay-100"></div>
			</CardTitle>

			<CardDescription className="flex items-stretch justify-between">
				{/* price */}
				<div className="h-8 w-16 animate-pulse bg-muted delay-200"></div>
				{/* details button */}
				<div className="h-10 w-28 animate-pulse bg-muted delay-300"></div>
			</CardDescription>

			{/* tags */}
			<CardFooter className="flex flex-wrap">
				<div className="h-[18px] w-10 animate-pulse bg-muted"></div>
				<div className="h-[18px] w-14 animate-pulse bg-muted delay-100"></div>
				<div className="h-[18px] w-12 animate-pulse bg-muted delay-200"></div>
				<div className="h-[18px] w-8 animate-pulse bg-muted delay-300"></div>
			</CardFooter>

		</Card>
	)
}
6
export default ProductCardSkeleton