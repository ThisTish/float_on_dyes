import Link from "next/link"

type LinksProps = {
	href: string,
	name: string,
	children?: React.ReactNode
}

const Links = ({ href, children, name }: LinksProps) => {
	return (
		<Link href={href}>{children ? children : name}</Link>
	)
}

export default Links