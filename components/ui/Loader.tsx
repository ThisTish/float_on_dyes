const Loader = () => {
	return (
		<>
			<div className="loading text-primary text-center text-xl font-semibold md:text-2xl lg:text-4xl">
				<span className="l opacity-0 animate-loading ml-3 delay-200 md:ml-5">L</span>
				<span className="o opacity-0 animate-loading delay-400">o</span>
				<span className="a opacity-0 animate-loading delay-600">a</span>
				<span className="d opacity-0 animate-loading delay-800">d</span>
				<span className="i opacity-0 animate-loading delay-1000">i</span>
				<span className="n opacity-0 animate-loading delay-1200">n</span>
				<span className="g opacity-0 animate-loading delay-1400">g</span>
				<div className="load relative w-32 h-16 py-2 md:w-48 md:py md:py-4 lg:w-64 lg:py-8">
					<div className="progress absolute size-12 bg-transparent rounded-full animate-loading-disc delay-1000 md:size-16 lg:size-20"></div>
					<div className="progress absolute left-1/4 size-12 bg-transparent rounded-full animate-loading-disc delay-1300 md:size-16 lg:size-20"></div>
					<div className="progress absolute left-1/2 size-12 bg-transparent rounded-full animate-loading-disc delay-1700 md:size-16 lg:size-20"></div>
					<div className="progress absolute left-3/4 size-12 bg-transparent rounded-full animate-loading-disc delay-2000 md:size-16 lg:size-20"></div>
				</div>
			</div>
		</>
	)
}

export default Loader




