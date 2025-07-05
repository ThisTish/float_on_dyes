import Banner from "@/components/header/Banner"
import Image from "next/image"
import ContactFootnote from "@/components/shared/ContactFootnote"

const AboutPage = () => {
	return (
		<main className="space-y-20">
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
			<ContactFootnote message="Questions, comments, ideas? We would love to hear them..." />
		</main>
	)
}

export default AboutPage