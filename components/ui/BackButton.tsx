"use client"

import { ArrowDownLeft } from "lucide-react"
import { AnimatedDiv } from "./AnimatedDiv"
import { Button } from "./button"

const BackButton = ({ size }: { size?: "default" | "icon" | "sm" | "lg" }) => {
	return (
		<Button variant={'destructive'} size={size} onClick={() => window.history.back()}>
			<AnimatedDiv size={size} variant={'destructive'} animation={'rotate'}><ArrowDownLeft /></AnimatedDiv>
			Back
		</Button>
	)
}

export default BackButton