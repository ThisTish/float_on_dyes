"use client"

import { motion } from "framer-motion"

const FloatingLetter = ({ letter }: { letter: string }) => {
		const generatePositions = (letter: string) =>
			Array.from({ length: letter.length }, () => ({
				x: Math.random() * 10 - 4,
				y: Math.random() * 40 ,
			}));


	return (
		<div className="relative w-full flex items-center justify-center">
				
					<motion.div
						initial={{ x: 0, y: 0 }}
						animate={{
							x: [0, generatePositions(letter)[0].x, generatePositions(letter)[0].x, generatePositions(letter)[0].x, 0,  generatePositions(letter)[0].x, generatePositions(letter)[0].x ],
							y: [0, generatePositions(letter)[0].y, generatePositions(letter)[0].y , generatePositions(letter)[0].y, 0, generatePositions(letter)[0].y, generatePositions(letter)[0].y],
							opacity: 1,
						}}
						transition={{
							duration: 15,
							repeat: Infinity,
							repeatType: "reverse",
							ease: "easeInOut",
						}}
						className="absolute"
						// style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}
					>
						{letter}
					</motion.div>
		</div>
	);
};

export default FloatingLetter;
