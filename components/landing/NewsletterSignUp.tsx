import { BiEnvelope } from "react-icons/bi"
import { AnimatedDiv } from "../ui/AnimatedDiv"
import { Button } from "../ui/button"
import Heading from "../ui/Heading"
import { Input } from "../ui/input"

// todo add to newsletter list functionality

const NewsletterSignUp = () => {
	return (
		<section className="mt-32 flex h-fit flex-col space-y-5 bg-darkBlue p-3 py-5 text-white">
			<Heading first="letter" second="News" className="flex flex-row-reverse justify-center gap-1" />
			<div className="flex h-fit w-full flex-col justify-around gap-5 p-5">
				<p className="text-lg font-light md:w-1/2 md:text-xl">
					Sign up for our newsletter to be the first to know about new dyes, dyable discs added to our stock, and exclusive deals.
				</p>
				<form className="flex flex-col items-center gap-3 self-end md:flex-row">
					<Input
						type="email"
						placeholder="Enter your email"
						className="h-10 w-56 md:w-64"
					/>
					<Button
						type="submit"
						variant={'outline'}
					>
						Subscribe
						<AnimatedDiv variant={'outline'} animation={'pulse'} >
							<BiEnvelope />
						</AnimatedDiv>
					</Button>
				</form>
			</div>
		</section>
	)
}

export default NewsletterSignUp