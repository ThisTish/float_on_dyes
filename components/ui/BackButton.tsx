"use client"

import { ArrowDownLeft } from "lucide-react"
import { AnimatedDiv } from "./AnimatedDiv"
import { Button } from "./button"
import { TbArrowBack } from "react-icons/tb"

const BackButton = ({ size }: { size: "default" | "icon" | "sm" | "lg"}) => {


	return (
		<Button variant={'destructive'} size={size} onClick={() => window.history.back()} className="px-3 gap-3">
			<AnimatedDiv size={size} variant={'destructive'} animation={'rotate'}><TbArrowBack /></AnimatedDiv>
			Go Back
		</Button>
	)
}

export default BackButton