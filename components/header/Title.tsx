"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const FloatingLetter = ({ text }: { text: string }) => {
	const [positions, setPositions] = useState<{ x: number; y: number }[]>([]);

	useEffect(() => {
		const generatePositions = () =>
			Array.from({ length: text.length }, () => ({
				x: Math.random() * 20 - 10, // Random X offset
				y: Math.random() * 50 - 25, // Random Y offset
			}));

		setPositions(generatePositions());
	}, [text]);

	return (
		<div className="relative h-32 w-full flex items-center justify-center">
			{/* <div className="relative"> */}
				{text.split("").map((char, index) => (
					<motion.span
						key={index}
						initial={{ x: positions[index]?.x, y: positions[index]?.y }}
						animate={{
							x: [0, positions[index]?.x, positions[index]?.x +10],
							y: [0, positions[index]?.y, positions[index]?.y +20],
							opacity: 1,
						}}
						transition={{
							duration: 10,
							repeat: Infinity,
							repeatType: "reverse",
							ease: "easeInOut",
						}}
						className="absolute"
						style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}
					>
						{char}
					</motion.span>
				))}
			{/* </div> */}
		</div>
	);
};

export default FloatingLetter;
