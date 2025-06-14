import ContactForm from "@/components/emails/ContactForm"
import Banner from "@/components/header/Banner"

const ContactPage = () => {
	return (
		<main className="space-y-10">
			<Banner title="Contact" subtitle="Us" url="/images/dyebed.jpg" />
			<ContactForm  />
		</main>
	)
}

export default ContactPage