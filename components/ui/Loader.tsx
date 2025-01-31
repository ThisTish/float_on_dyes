const Loader = () => {
	return (
		<>
			<div className="loading text-primary text-center">
				<span className="l opacity-0 animate-loading delay-200">L</span>
				<span className="o opacity-0 animate-loading delay-300">o</span>
				{/* <span className="a opacity-0 animate-loading delay-[400ms]">a</span>
				<span className="d opacity-0 animate-loading delay-500">d</span>
				<span className="i opacity-0 animate-loading delay-[600ms]">i</span>
				<span className="n opacity-0 animate-loading delay-700">n</span>
				<span className="g opacity-0 animate-loading delay-[800ms]">g</span>
				<span className="d1 opacity-0 animate-loading-dot delay-[900ms]">.</span>
				<span className="d2 opacity-0 animate-loading-dot delay-1000">.</span>
				<span className="d2 opacity-0 animate-loading-dot delay-[1100ms]">.</span> */}
				<div className="load relative  w-32 h-16 py-2">
					<div className="progress absolute size-12 bg-transparent rounded-full animate-loading-disc delay-1000"></div>
					<div className="progress absolute left-1/4 size-12 bg-transparent rounded-full animate-loading-disc delay-1300"></div>
					<div className="progress absolute left-1/2 size-12 bg-transparent rounded-full animate-loading-disc delay-1700"></div>
					<div className="progress absolute left-3/4 size-12 bg-transparent rounded-full animate-loading-disc delay-2000"></div>
				</div>
			</div>
		</>
	)
}

export default Loader




