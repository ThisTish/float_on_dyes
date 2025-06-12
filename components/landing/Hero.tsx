import { AnimatedDiv } from "@/components/ui/AnimatedDiv"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, MessageCircle } from "lucide-react"
import Link from "next/link"
import Title from "../header/Title";


const Hero = () => {

	return (
		<section className="absolute inset-0 mt-24 flex max-h-max min-h-96 flex-col gap-5 bg-[url('/images/herolandscape.svg')] bg-cover bg-center bg-no-repeat p-5 md:mt-32">
			<hgroup className="mx-auto w-72">
				<Title />
				<div className="mb-5 mt-20 space-y-3 text-balance p-3 text-end text-primary-foreground backdrop-contrast-50 md:w-96 lg:ml-44">
					<h2 className="text-2xl">Fly, my pretty!</h2>
					<p>Dye your discs, find your discs, love your discs.<br />
						Choose from our available dyes, or request a custom order, just for you.</p>
				</div>
				<div className="ml-auto flex w-44 flex-col gap-3 md:w-96 md:flex-row md:justify-end lg:ml-44">
					<Button variant={'outline'} className="">
						<Link href='/custom'>Custom Order</Link>
						<AnimatedDiv variant={'outline'} animation={'pulse'}>
							<MessageCircle />
						</AnimatedDiv>
					</Button>
					<Button variant={'cta'} className="">
						<Link href='/shop'>Go to Shop</Link>
						<AnimatedDiv variant={'cta'} animation={'rotate'}>
							<ArrowUpRight />
						</AnimatedDiv>
					</Button>
				</div>
			</hgroup>
		</section>
		// <section className="absolute inset-0 flex min-h-96 w-full flex-col items-center justify-center bg-[url('/images/heroLandscape.svg')] bg-cover bg-center bg-no-repeat">
		// 	<hgroup className="mt-40 flex h-full w-64 flex-col gap-16 md:w-72 lg:w-96">
		// 		<Title />
		// 		<div className="w-52 self-end text-balance rounded-full p-2 text-end backdrop-blur-sm md:mt-5 md:w-72 lg:mt-8 lg:w-80">
		// 			<h2 className="mb-5 text-2xl font-semibold tracking-wide md:text-3xl lg:text-4xl">"Fly, My Pretty!"</h2>
		// 			<p className="text-lg leading-5 lg:text-xl">One of a kind dyes and custom designs for your favorite things...</p>
		// 			<span className="w-fit px-1 text-xl font-bold md:text-2xl lg:text-3xl">Discs</span>
		// 		</div>
		// 	</hgroup>
		// 	<div className="wrapper -mt-14 flex justify-end gap-3 px-5 pb-5 text-xs tracking-widest md:pb-8 md:text-base md:font-semibold md:tracking-wider lg:text-lg lg:font-bold lg:tracking-wide">
		// 		<Button
		// 			variant={"outline"}
		// 			className="h-8 gap-1 px-2 md:h-10 md:gap-2 md:px-3 lg:h-12 lg:gap-3 lg:px-4"
		// 			asChild
		// 		>
		// 			<Link href="/contact">
		// 				Contact Us
		// 				<AnimatedDiv variant={'secondary'} animation={'scale'} >
		// 					<MessageCircle />
		// 				</AnimatedDiv>
		// 			</Link>
		// 		</Button>

		// 		<Button
		// 			variant={"cta"}
		// 			className="h-8 gap-1 px-2 md:h-10 md:gap-2 md:px-3 lg:h-12 lg:gap-3 lg:px-4"
		// 			asChild
		// 		>
		// 			<Link href="/shop">
		// 				Go to Shop
		// 				<AnimatedDiv variant={'cta'} animation={'rotate'}>
		// 					<ArrowUpRight />
		// 				</AnimatedDiv>
		// 			</Link>
		// 		</Button>
		// 	</div>
		// </section>
	)
}

export default Hero