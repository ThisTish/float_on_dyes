import Image from "next/image"

const ComingSoonPage = () => {
	return (
		<main
			className="
				max-w-8xl lg:mx-auto p-2 md:p-5 md:px-10 w-full h-dvh relative bg-[url(/dyebed.jpg)] bg-center -z-10"
				style={{ maskImage: "url(/ink-swoop.gif)", maskSize: "cover", maskPosition: "center" }}
		>

			<div className="bg-emerald-500/55 backdrop-blur-sm space-y-5 w-fit h-auto p-10 text-primary-foreground">
				<h1 className="text-3xl sm:text-6xl md:text-8xl items-center flex font-black">Coming Soon</h1>
				<p className="text-xl text-primary font-semibold">Currently dipping some discs...</p>
			</div>
			<a 
			className="absolute bottom-1 right-1 text-xs font-light"
			href="https://www.vecteezy.com/free-videos/transition">Transition Stock Videos by Vecteezy</a>
		</main>
	)
	 
}

export default ComingSoonPage