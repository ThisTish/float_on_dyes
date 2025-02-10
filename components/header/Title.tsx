import FloatingLetter from "./FloatingLetter"

const float = "Float".split("")
const on = "On  ".split("")
const dyes = "Dyes".split("")

const Title = () => {
	return (
		<h1 className="flex flex-col gap-5 w-1/2 text-5xl text-darkBlue dark:text-lightBlue md:text-6xl lg:text-7xl lg:gap-7">
			<div className="flex h-10 relative tracking-tighter" >
				{float.map((letter, index) => (
					<FloatingLetter key={index} letter={letter} />
				))}
			</div>
			<div className="flex gap-1 h-10 relative ">
				{on.map((letter, index) => (
					<FloatingLetter key={index} letter={letter} />
				))}
			</div>
			<div className="flex gap-1 h-10 relative ">
				{dyes.map((letter, index) => (
					<FloatingLetter key={index} letter={letter} />
				))}
			</div>
		</h1>
	)
}

export default Title