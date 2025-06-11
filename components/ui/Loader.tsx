const Loader = () => {
	return (
		<>
			<div className="loading border border-black text-center text-xl font-semibold text-primary md:text-2xl lg:text-4xl">
				<span className="ml-3 animate-loading opacity-0 md:ml-5">L</span>
				<span className="animate-loading opacity-0 delay-200">o</span>
				<span className="animate-loading opacity-0 delay-400">a</span>
				<span className="animate-loading opacity-0 delay-600">d</span>
				<span className="animate-loading opacity-0 delay-800">i</span>
				<span className="animate-loading opacity-0 delay-1000">n</span>
				<span className="animate-loading opacity-0 delay-1200">g</span>
				<div className="md:py relative h-16 w-32 py-2 md:w-48 md:py-4 lg:w-64 lg:py-8">
					<div className="absolute size-12 animate-loading-disc rounded-full bg-transparent md:size-16 lg:size-20"></div>
					<div className="absolute left-1/4 size-12 animate-loading-disc rounded-full bg-transparent delay-300 md:size-16 lg:size-20"></div>
					<div className="absolute left-1/2 size-12 animate-loading-disc rounded-full bg-transparent delay-500 md:size-16 lg:size-20"></div>
					<div className="absolute left-3/4 size-12 animate-loading-disc rounded-full bg-transparent delay-700 md:size-16 lg:size-20"></div>
				</div>
			</div>
		</>
	)
}

export default Loader




