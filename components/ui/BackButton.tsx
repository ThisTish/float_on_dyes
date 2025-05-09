"use client"

import { AnimatedDiv } from "./AnimatedDiv"
import { Button } from "./button"
import { TbArrowBack } from "react-icons/tb"

const BackButton = ({ size }: { size: "default" | "icon" | "sm" | "lg" }) => {


	return (
		<Button variant={'destructive'} size={size} onClick={() => window.history.length > 1 ? window.history.back() : window.close()} className="gap-3 px-3">
			<AnimatedDiv size={size} variant={'destructive'} animation={'rotate'}><TbArrowBack /></AnimatedDiv>
			Go Back
		</Button>
	)
}

export default BackButton