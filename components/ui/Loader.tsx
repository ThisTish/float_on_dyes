const Loader = () => {
	return (
		<>
			<div className="loading text-primary text-center text-xl font-semibold md:text-2xl lg:text-4xl">
				<span className=" opacity-0 animate-loading ml-3  md:ml-5">L</span>
				<span className=" opacity-0 animate-loading delay-200">o</span>
				<span className=" opacity-0 animate-loading delay-400">a</span>
				<span className=" opacity-0 animate-loading delay-600">d</span>
				<span className=" opacity-0 animate-loading delay-800">i</span>
				<span className=" opacity-0 animate-loading delay-1000">n</span>
				<span className=" opacity-0 animate-loading delay-1200">g</span>
				<div className=" relative w-32 h-16 py-2 md:w-48 md:py md:py-4 lg:w-64 lg:py-8">
					<div className=" absolute size-12 bg-transparent rounded-full animate-loading-disc  md:size-16 lg:size-20"></div>
					<div className=" absolute left-1/4 size-12 bg-transparent rounded-full animate-loading-disc delay-300 md:size-16 lg:size-20"></div>
					<div className=" absolute left-1/2 size-12 bg-transparent rounded-full animate-loading-disc delay-500 md:size-16 lg:size-20"></div>
					<div className=" absolute left-3/4 size-12 bg-transparent rounded-full animate-loading-disc delay-700 md:size-16 lg:size-20"></div>
				</div>
			</div>
		</>
	)
}

export default Loader




