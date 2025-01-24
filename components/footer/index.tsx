import { APP_DESCRIPTION, APP_NAME } from "@/lib/constants"
import { Instagram, Mail, } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { BlueSkyIcon, LogosAmex, LogosMastercard, LogosPaypal, LogosVisa } from "../shared/icons"
import { LiaCcDiscover } from "react-icons/lia";
import { BiLogoVenmo } from "react-icons/bi"
import Links from "../shared/lists/Links"
import PAGE_LINKS from "@/lib/constants/page-links"
import { Button } from "../ui/button"
import ContactForm from "../shared/contactForm/Form"



const Footer = () => {
	const currentYear = new Date().getFullYear()


	return (
		<footer className="w-full border-t bg-darkGreen">
			<div className="wrapper flex-between">

				{/* Left Side */}
				<div className="grid gap-7 text-white w-1/2 md:w-1/6">
					<Image
						src='/logo.png'
						alt={`${APP_NAME} logo`}
						width={55}
						height={55}
					/>
					<div className="space-y-1">
						<span className="font-bold md:text-lg lg:text-xl">{APP_NAME}</span>
						<p className="text-pretty text-sm md:text-base lg:text-lg">Because dyed discs fly better!</p>
					</div>

					{/* Socials */}
					<div className="space-y-1">
						<Link href={'/contact'} className="text-lg text-black font-semibold tracking-wide">Contact Us</Link>
						<ul className="flex space-x-2">
							{/* make component to map over */}
							<li>
								<a href="https://www.instagram.com/floatondyes/" target="blank">
									<Instagram />
								</a>
							</li>
							<li>
								<a href="">
									<div className="w-6">
										<BlueSkyIcon />

									</div>
								</a>
							</li>
							<li>
								<a href='mailto: info@floatondyes.com' aria-valuetext="info@floatondyes.com">
									<Mail />
								</a>
							</li>
						</ul>
						<a className="text-xs md:text-sm" href='mailto: info@floatondyes.com'>
							info@floatondyes.com
						</a>
					</div>

					{/* Payments */}
					<div className="space-y-1">
						<p className="text-sm text-black font-semibold tracking-wide">We accept</p>
						<ul className="flex space-x-2 items-center">

							{/* Could make an array and map over with tool tips involved */}
							<li>
								<LogosVisa />
							</li>
							<li>
								<LogosMastercard />
							</li>
							<li>
								<LogosAmex />
							</li>
							<li>
								<LiaCcDiscover size={23} />
							</li>

							<li>
								<BiLogoVenmo />
							</li>
							<li>
								<LogosPaypal />
							</li>
						</ul>
					</div>
				</div>

				{/* Right side/Middle */}
				<div className="text-end space-y-3 text-white w-1/2 md:w-1/6">

					{/* Site Links */}
					<div className="space-y-1">
						<p className="text-lg text-black font-semibold ">Site Links</p>
						<ul className="space-y-2 items-center text-end">

							{PAGE_LINKS.map((link, index) => (
								<li className="text-sm" key={index}>
									<Links href={link.href} name={link.name} />
								</li>
							)
							)}
						</ul>
					</div>

					{/* Tracking */}
					<Button variant={'destructive'} className="text-xs px-1">Track Your Order</Button>

					{/* Policies */}
					<div className="text-xs text-black">
						<p><u>Privacy Policy</u></p>
						<p><u>Return Policy</u></p>
					</div>
				</div>


			</div>

			<div className="grid items-center justify-center gap-7 mt-5">
				{/* Form */}

				<ContactForm />
				<div >
					<hr  className="m-3"/>
					<p>{currentYear} {APP_NAME}. All rights reserved.</p>
					<p className="text-center text-white">Website created by <a href="https://tish-sirface-portfolio.netlify.app/" target="blank" className="text-lightBlue">Tish Sirface</a></p>
				</div>
			</div>



		</footer>
	)
}

export default Footer