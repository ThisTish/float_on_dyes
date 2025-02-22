import Image from "next/image"

const ComingSoonPage = () => {
	return (
		<main
			className="max-w-8xl lg:mx-auto p-2 md:p-5 md:px-10 w-full h-dvh relative bg-[url(/images/dyebed.jpg)] bg-center -z-10"
			style={{ maskImage: "url(/images/paint.gif)", maskSize: "cover", maskPosition: "center"}}
		>
			<div className="bg-emerald-500/55 backdrop-blur-sm text-black w-fit h-auto p-10 flex flex-col items-center justify-center">
			<div className="w-1/3  max-w-36">
				<Image
				src={'/images/logo.svg'}
				width={150}
				height={150}
				alt="float on dyes logo"
				className="w-full h-auto"
				/>
			</div>
				<h1 className="text-3xl sm:text-6xl md:text-8xl font-extrabold pb-5">Float on Dyes</h1>
				<p className="text-xl font-semibold pb-1 sm:text-2xl md:text-3xl">Coming soon!</p>
				<p className="text-lg text-center text-pretty sm:text-xl md:text-2xl">We are currently <b>designing</b>, <b>dipping</b>, and <b>dying</b> some <b>discs</b>, check back soon...</p>
			</div>
			<a
				className="absolute bottom-1 right-1 text-xs font-light"
				href="https://www.vecteezy.com/free-videos/transition">Transition Stock Videos by Vecteezy</a>
		</main>
	)
}

export default ComingSoonPage