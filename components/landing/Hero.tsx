import { AnimatedDiv } from "@/components/ui/AnimatedDiv"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, MessageCircle } from "lucide-react"
import Link from "next/link"
import Title from "../header/Title";

const float = "Float ".split("");
const on = "On ".split("");
const dyes = "Dyes ".split("");

const Hero = () => {
	return (
		<section className="flex flex-col w-full min-h-96 absolute inset-0 bg-[url('/heroLandscape.svg')] bg-cover bg-center bg-no-repeat items-center justify-center ">
			<hgroup className="flex flex-col gap-10 w-64 h-full mt-32 md:w-72 lg:w-96 ">
				<Title />
				<h2 className="text-xl text-primary text-end w-52 p-2 self-end backdrop-blur-sm leading-5 text-balance rounded-full md:w-72 md:mt-5 lg:mt-7 lg:text-2xl lg:w-80 ">
					<p>One of a kind dyes and custom designs for your favorite things...</p>
					<span className="px-1 font-extrabold w-fit text-2xl md:text-3xl lg:text-4xl">Discs</span>
				</h2>
			</hgroup>
			<div className="flex gap-3 justify-end px-5 pb-5 -mt-14 md:pb-8 wrapper">
				<Button
					variant={"outline"}
					className="h-8 px-2 tracking-widest text-xs gap-1 md:h-10 md:px-3 md:tracking-wider md:font-semibold md:gap-2"
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
					className="h-8 px-2 tracking-widest text-xs gap-1 md:h-10 md:px-3 md:tracking-wider md:font-semibold md:gap-2"
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