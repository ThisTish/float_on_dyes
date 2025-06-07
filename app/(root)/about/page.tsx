import Banner from "@/components/header/Banner"
import { AnimatedDiv } from "@/components/ui/AnimatedDiv"
import { Button } from "@/components/ui/button"
import { CardContent, CardFooter } from "@/components/ui/card"
import { Send } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const AboutPage = () => {
	return (
		<main className="space-y-10">
			<Banner url={'/images/cellHeader.jpg'} darkUrl={'/images/cellHeader-dark.jpg'} title='About' subtitle='Us' />

			<div className="flex flex-wrap justify-around space-y-5">

				{/* text */}
				<section className="my-auto flex h-fit flex-col space-y-3 bg-darkBlue p-5 text-primary-foreground md:w-1/3">
					<p>
						We are a team of passionate individuals dedicated to providing the best service possible. Our mission is to create a platform that connects people and fosters community.
					</p>
					{/* <hr /> */}
					<p>
						With years of experience in the industry, we strive to innovate and improve continuously. We believe in transparency, integrity, and excellence in everything we do.
					</p>
				</section>
				{/* image */}
				<figure className="flex flex-col items-center gap-3">

					<Image
						src={`/images/Aboutus.jpg`}
						alt="picture of a man & woman with their dogs and a cat"
						width={500}
						height={500}
						className="border border-darkBlue shadow-lg dark:opacity-75"
					/>
					<figcaption className="border bg-darkBlue p-3 text-center text-xs font-light text-primary-foreground">
						Mitch & Tish with Max, Steve, and Fibonacci
					</figcaption>
				</figure>
			</div>
			<hr className="mx-auto w-2/3 border border-darkGreen"/>
				<section className="mx-auto w-1/3 text-balance p-10">
					<p className="mb-3">Questions, comments, ideas? We would love to hear them...</p>
						<Link href={'/contact'} className="w-full">
							<Button variant={"default"} className="w-full bg-darkGreen" size={'sm'}>
								Contact Us
								<AnimatedDiv variant={'default'} animation={'rotate'} className="bg-darkGreen" size={'sm'}>
									<Send />
								</AnimatedDiv>
							</Button>
						</Link>
						<p className="mt-3 text-sm">or Email us at <a href="mailto:info@floatondyes.com" className="font-semibold text-darkGreen hover:text-darkBlue"> info@floatondyes.com</a></p>
				</section>
		</main>
	)
}

export default AboutPage