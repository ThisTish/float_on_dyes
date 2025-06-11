
const float = "Float".split("")
const on = "On  ".split("")
const dyes = "Dyes".split("")

const Title = () => {
	return (
		<h1 className="flex w-1/2 flex-col justify-around gap-3 text-5xl text-darkBlue dark:text-lightBlue md:text-6xl lg:gap-7 lg:text-7xl">
			<div className="flex h-10 gap-1" >
				{float.map((character, i) => (
					<span
						className={`animate-float transition`}
						style={{ animationDelay: `${i * 0.3}s` }}
					>
						{character}
					</span>
				))}
			</div>
			<div className="flex h-10 gap-1">
				{on.map((character, i) => (
					<span
						className={`animate-float transition`}
						style={{ animationDelay: `${i + 1 * 0.3}s` }}
					>
						{character}
					</span>
				))}
			</div>
			<div className="flex h-10 gap-1">
				{dyes.map((character, i) => (
					<span
						className={`animate-float transition`}
						style={{ animationDelay: `${i + 2 * 0.3}s` }}
					>
						{character}
					</span>
				))}
			</div>
		</h1>
	)
}

export default Title