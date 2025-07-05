import { Send } from "lucide-react"
import { AnimatedDiv } from "../ui/AnimatedDiv"
import { Button } from "../ui/button"
import Link from "next/link"

const ContactFootnote = ({ message }: { message: string }) => {
	return (
		<>
			<hr className="mx-auto w-2/3 border border-darkGreen" />
			<div className="mx-auto w-full text-balance md:w-1/3">
				<p className="mb-5 text-lg font-semibold">{message}</p>
				<Link href={'/contact'} className="w-full">
					<Button variant={"default"} className="mb-5 w-full bg-darkGreen" size={'sm'}>
						Contact Us
						<AnimatedDiv variant={'default'} animation={'rotate'} className="bg-darkGreen" size={'sm'}>
							<Send />
						</AnimatedDiv>
					</Button>
				</Link>
				<p className="text-sm">or Email us at <a href="mailto:info@floatondyes.com" className="font-semibold text-darkGreen hover:text-darkBlue"> info@floatondyes.com</a></p>
			</div>
		</>
	)
}

export default ContactFootnote 