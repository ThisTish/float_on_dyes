import { APP_NAME } from "@/lib/constants"
import { Instagram, Mail } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { TbBrandBluesky } from 'react-icons/tb'
import Links from "./shared/lists/Links"
import { PAGE_LINKS } from "@/lib/constants/page-links"
import { Button } from "./ui/button"
import ContactForm from "./shared/contactForm/Form"
import payments from "@/lib/constants/payments"
import { AnimatedDiv } from "./ui/AnimatedDiv"
import { FaShippingFast } from "react-icons/fa"



const Footer = () => {
	const currentYear = new Date().getFullYear()


	return (
		<footer className="w-full border-t bg-lightGreen pt-12">
			<div className="wrapper space-y-12 lg:flex lg:justify-between lg:space-y-0">

				<div className="space-y-12 md:flex md:justify-between md:space-y-0 lg:grid lg:grid-cols-2 lg:justify-normal">
					{/* Left Side */}
					<div className="space-y-12 text-white">
						<div className="flex items-center justify-end gap-3 lg:grid">
							<img
								src='/images/logo.png'
								alt={`${APP_NAME} logo`}
								width={55}
								height={55}
							/>
							<div className="space-y-1 text-end lg:text-start">
								<span className="text-2xl font-semibold text-black md:text-lg lg:text-xl">{APP_NAME}</span>
								<p className="text-pretty text-sm md:text-base lg:text-lg">Because dyed discs fly better!</p>
							</div>
						</div>

						{/* Socials */}
						<div className="space-y-1">
							<Link href={'/contact'} className="footer-header">Contact Us</Link>
							<ul className="flex space-x-3">
								<li>
									<a href="https://www.instagram.com/floatondyes/" target="blank">
										<Instagram />
									</a>
								</li>
								<li>
									<a href="">
										<TbBrandBluesky size={25} />
									</a>
								</li>
								<li className="flex items-end gap-2">
									<a href='mailto: info@floatondyes.com' aria-valuetext="info@floatondyes.com">
										<Mail />
									</a>
								</li>
							</ul>
							<a className="text-xs md:text-sm" href='mailto: info@floatondyes.com'>
								info@floatondyes.com
							</a>
						</div>

					</div>

					{/* Right side/Middle */}
					<div className="space-y-3 text-end text-white">

						{/* Site Links */}
						<div className="space-y-1">
							<p className="footer-header">Site Links</p>
							<ul className="items-center space-y-2 text-end">

								{PAGE_LINKS.map((link, index) => (
									<li className="text-sm" key={index}>
										<Links href={link.href} name={link.name} />
									</li>
								)
								)}
								<li className="text-sm">
									<Links href={'/cart'} name={'Cart'} />
								</li>
							</ul>
						</div>

						{/* Tracking */}
						<Button variant={'cta'} className="px-2 text-xs">
							Track Order
							<AnimatedDiv variant={'cta'} animation={'pulse'}>
								<FaShippingFast />
							</AnimatedDiv>
						</Button>

						{/* Policies */}
						<div className="text-xs text-black">
							<p><u>Privacy Policy</u></p>
							<p><u>Return Policy</u></p>
						</div>
					</div>
				</div>

				{/* Form */}
				<div className="min-w-64 space-y-1 text-primary-foreground lg:w-96">
					<p className="footer-header">Contact Form</p>
					<ContactForm />
				</div>



				{/* footer of footer */}
			</div>
			{/* Payments */}
			<div className="wrapper justify-end space-y-1 text-end">
				<p className="footer-header">We accept</p>
				<ul className="flex items-center justify-end space-x-1 text-3xl text-primary-foreground">
					{payments.map((payment) => (
						<li key={payment.name}>
							<payment.icon />
						</li>
					))}

				</ul>
			</div>
			<div >
				<hr className="m-3" />
				<div className="grid items-center justify-center px-5 text-sm sm:flex sm:justify-between">

					<p >{currentYear} {APP_NAME}. All rights reserved.</p>
					<p className="text-white">Website created by <a href="https://tish-sirface-portfolio.netlify.app/" target="blank" className="text-primary-foreground"><strong>Tish Sirface</strong></a></p>
				</div>
			</div>



		</footer>
	)
}

export default Footer