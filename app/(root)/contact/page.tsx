import ContactForm from "@/components/emails/ContactForm"
import Banner from "@/components/header/Banner"
import { Facebook, Instagram, Mail } from "lucide-react"
import Link from "next/link"
import { TbBrandBluesky, TbBrandFacebook } from "react-icons/tb"

const ContactPage = () => {
	return (
		<main className="space-y-10">
			<Banner title="Contact" subtitle="Us" url="/images/dyebed.jpg" />
			<ContactForm />


			<hr className="mx-auto w-2/3 border border-darkBlue" />
			<section className="mx-auto w-fit text-balance p-10">
				<div className="space-y-1">
					<ul className="flex justify-between">
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
			</section>
		</main>
	)
}

export default ContactPage