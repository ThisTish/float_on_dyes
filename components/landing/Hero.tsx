import { AnimatedDiv } from "@/components/ui/AnimatedDiv"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, MessageCircle } from "lucide-react"
import Link from "next/link"
import Title from "../header/Title";


const Hero = () => {

	return (
		<section className="flex flex-col w-full min-h-96 absolute inset-0 bg-[url('/images/heroLandscape.svg')] bg-cover bg-center bg-no-repeat items-center justify-center ">
			<hgroup className="flex flex-col gap-16 w-64 h-full mt-32 md:w-72 lg:w-96 ">
				<Title />
				<div className="text-end w-52 p-2 self-end backdrop-blur-sm text-balance rounded-full md:w-72 md:mt-5 lg:mt-8  lg:w-80 ">
					<h2 className="text-2xl md:text-3xl lg:text-4xl mb-5 font-semibold tracking-wide">"Fly, My Pretty!"</h2>
					<p className="text-lg leading-5 lg:text-xl">One of a kind dyes and custom designs for your favorite things...</p>
					<span className="px-1 font-bold w-fit text-xl md:text-2xl lg:text-3xl">Discs</span>
				</div>
			</hgroup>
			<div className="flex gap-3 justify-end px-5 pb-5 -mt-14 md:pb-8 wrapper tracking-widest text-xs md:tracking-wider md:text-base md:font-semibold lg:tracking-wide lg:text-lg lg:font-bold">
				<Button
					variant={"outline"}
					className="h-8 px-2 gap-1 md:h-10 md:px-3 md:gap-2 lg:px-4 lg:gap-3 lg:h-12"
					asChild
				>
					<Link href="/contact">
						Contact Us
						<AnimatedDiv variant={'secondary'} animation={'scale'} >
							<MessageCircle />
						</AnimatedDiv>
					</Link>
				</Button>

				<Button
					variant={"cta"}
					className="h-8 px-2 gap-1 md:h-10 md:px-3 md:gap-2 lg:px-4 lg:gap-3 lg:h-12"
					asChild
				>
					<Link href="/shop">
						Go to Shop
						<AnimatedDiv variant={'cta'} animation={'rotate'}>
							<ArrowUpRight />
						</AnimatedDiv>
					</Link>
				</Button>
			</div>
		</section>
	)
}

export default Hero