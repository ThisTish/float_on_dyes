const Tooltip = ({ children }: { children: React.ReactNode }) => {
	return (
		<div
			className="relative group hover:cursor-pointer"
		>
			{children}
			<div
				className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 w-max px-2 py-1 text-white text-xs font-light bg-darkBlue opacity-0 scale-50 transition-all duration-500 group-hover:opacity-100 group-hover:scale-100"
			>
				Light/Dark
			</div>
		</div>
	);
}

export default Tooltip;