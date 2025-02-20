import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import React from "react"
import Link from "next/link"
import Image from "next/image"
import { APP_NAME } from "@/lib/constants"
import Providers from "./Providers"


interface AuthCardProps {
	cardTitle: string
	cardDescription?: string
	children: React.ReactNode
	showProviders?: boolean
	otherLinkSpan: string
	otherLinkLabel: string
	otherLinkHref: string
}

const AuthCard = ({ cardTitle, cardDescription, children, showProviders, otherLinkSpan, otherLinkLabel, otherLinkHref }: AuthCardProps) => {
	return (
		<Card className="p-5 bg-lightGreen dark:bg-card">
			<CardHeader className="inline-flex flex-row px-10 gap-10">
				<Link href={'/'} className="flex ">
					<Image
						src={'/images/logo.svg'}
						width={50}
						height={50}
						alt={`${APP_NAME} logo`}
						priority
					/>
				</Link>
				<div className="flex flex-col items-center">
					<CardTitle className="text-2xl">
						{cardTitle}
					</CardTitle>
					<CardDescription>
						{cardDescription}
					</CardDescription>
				</div>
			</CardHeader>
			<CardContent>
				{children}
			</CardContent>

			{/* todo set up providers, and providers component(timeCatcher-Socials) */}
			{showProviders
				? (
					<Providers />
				) : null
			}
			<CardFooter className="text-sm flex flex-col items-start mt-3">
				{cardTitle === 'Sign In' && (
					<Link href={'/reset-password'} className="font-semibold ">
						Forgot Password?
					</Link>
				)}
				<div>
				<span>{otherLinkSpan}</span>
				<Link href={otherLinkHref} target="_self" className="text-base font-semibold">{otherLinkLabel}</Link>

				</div>
			</CardFooter>


		</Card>
	)
}

export default AuthCard