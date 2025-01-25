
const ComingSoonPage = () => {
	return (
		<main
			className="
				coming-soon group max-w-8xl mask mask-cover lg:mx-auto p-2 md:p-5 md:px-10 w-full h-dvh relative
				before:absolute before:inset-0 before:bg-[url(/dyebed.jpg)] before:bg-center before:-z-10 before:[clip-path:path('M0 432.7C-8.7 367.3 -17.4 301.9 -38 312.7C-58.5 323.5 -90.8 410.6 -99.6 403.9C-108.3 397.2 -93.4 296.9 -106.4 280.5C-119.3 264.1 -160 331.7 -186.4 355.1C-212.7 378.4 -224.6 357.4 -236.3 342.4C-248 327.3 -259.5 318.2 -273.9 309.1C-288.3 300.1 -305.6 291.2 -307.6 272.5C-309.7 253.9 -296.5 225.6 -302.9 209C-309.2 192.5 -335.1 187.6 -317.9 166.8C-300.6 146.1 -240.2 109.4 -264.6 100.4C-289 91.3 -398.1 110 -420.1 103.5C-442 97.1 -376.8 65.7 -364.3 44.2C-351.9 22.8 -392.3 11.4 -432.7 0L0 0Z')
			"
		>
			<div className="bg-emerald-500/55 backdrop-blur-sm space-y-5 w-fit h-auto p-10 text-primary-foreground">
				<h1 className="text-3xl sm:text-6xl md:text-8xl items-center flex font-black">Coming Soon</h1>
				<p className="text-xl text-primary font-semibold">Currently dipping some discs...</p>
			</div>
		</main>
	)
}

export default ComingSoonPage