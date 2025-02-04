import Link from "next/link"

type LinksProps = {
	href?: string,
	name: string,
	children?: React.ReactNode
	className?: string
}

const Links = ({ href, children, name, className }: LinksProps) => {
	return (
		<Link href={href ? href : ''} className={className}>{children ? children : name}</Link>
	)
}

export default Links