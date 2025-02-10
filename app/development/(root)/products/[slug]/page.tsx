import ProductPrice from "@/components/shared/product/ProductPrice"
import { AnimatedDiv } from "@/components/ui/AnimatedDiv"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { getProductBySlug } from "@/lib/actions/product.actions"
import { notFound } from "next/navigation"
import { BiBookmarkHeart, BiPlus, BiPlusCircle, BiShoppingBag } from "react-icons/bi"

const ProductDetailsPage = async (props: { params: Promise<{ slug: string }> }) => {

	const { slug } = await props.params

	const product = await getProductBySlug(slug)

	if (!product) notFound()

	return (
		<div className="space-y-10">
			<header className="relative w-full h-28 mt-28 bg-[url('/images/cellHeader.jpg')] dark:bg-[url('/images/cellHeader-dark.jpg')] bg-cover bg-center bg-no-repeat md:h-32 lg:h-40">
				<h1 className="text-white backdrop-blur-sm size-fit absolute left-5 top-5">
					<span className="text-4xl font-bold md:text-5xl lg:text-6xl">{product.name} </span>
					<span className="text-2xl font-light md:text-3xl lg:text-4xl">{product.dyeType}</span>
				</h1>
				{/* Breadcrumb */}
			</header>
			{/* tags */}
			<div className="flex space-x-2">
				{product.tags.map((tag: string) => (
					<Button variant={'chip'} size={'chip'} key={`${product.id}-${tag}`}>{tag}</Button>
				))}
			</div>

			<section className="grid grid-cols-1 gap-5 md:grid-cols-2">
				{/* images */}
				<div className="w-full h-96">

				</div>
				{/* details */}
				<Card className="space-y-5 p-10 text-darkGreen">
					<CardHeader>
						<CardTitle >
							<h2 className="text-2xl font-extrabold tracking-tight">{product.name} </h2>
							<h3 className="text-xl font-bold">{product.brand}</h3>
						</CardTitle>
						<CardDescription>
							<p className="flex flex-wrap gap-3 -mt-2 justify-between items-center">
								<span className="text-lg font-semibold">{product.dyeType}</span>
								<ProductPrice className="text-2xl" value={Number(product.price)} />
							</p>
						</CardDescription>
					</CardHeader>
					<CardContent>
						<p className="text-pretty">{product.description}</p>

					<div className="grid grid-cols-4 grid-rows-2 pt-5 mx-auto max-w-80 text-center text-sm sm:text-xl sm:tracking-wide">
						{/* flight numbers */}
						<div className="aspect-square max-w-24 bg-brightBlue text-white content-evenly">
							<h4 >Speed</h4>
							<span className="font-bold tracking-widest">{product.speed}</span>
						</div>
						<div className="aspect-square max-w-24 bg-darkGreen text-white content-evenly ">
							<h4 >Glide</h4>
							<span className="font-bold tracking-widest">{product.glide}</span>
						</div>
						<div className="aspect-square max-w-24 bg-darkBlue text-white content-evenly ">
							<h4 >Turn</h4>
							<span className="font-bold tracking-widest">{product.turn}</span>
						</div>
						<div className="aspect-square max-w-24 bg-lightGreen text-white content-evenly ">
							<h4 >Fade</h4>
							<span className="font-bold tracking-widest">{product.fade}</span>
						</div>
					</div>
					</CardContent>

					{/* buttons */}
					<CardFooter className="flex flex-col-reverse sm:flex-row justify-center items-center w-full gap-3">
						<Button variant={'default'} size={'lg'} className="w-full ">
							Wish Bag
							<AnimatedDiv variant={'default'} animation={'pulse'} className="ml-2"><BiBookmarkHeart /></AnimatedDiv>
						</Button>
						<Button variant={'cta'} size={'lg'} className="w-full ">
							Bag It
							<AnimatedDiv variant={'cta'} animation={'rotateFull'} className="ml-2"><BiPlus /></AnimatedDiv>
						</Button>

					</CardFooter>
				</Card>
			</section>
		</div>
	)
}

export default ProductDetailsPage