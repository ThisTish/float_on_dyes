import { cn } from "@/lib/utils";

const Tooltip = ({ children, label, position, className }: { children: React.ReactNode, label: string, position?: string, className?: string }) => {
	return (
		<div
			className={`relative group hover:cursor-pointer ${position === 'bottom' ? 'bottom' : ''}`}
		>
			{children}
			<div
				className={cn(`absolute bottom-full group-[.bottom]:top-full h-6 left-1/2 transform -translate-x-1/2 mb-1 w-max px-2 py-1 text-white text-xs font-light bg-darkBlue opacity-0 scale-50 transition-all duration-500 group-hover:opacity-100 group-hover:scale-100`, className)}
			>
				{label}
			</div>
		</div>
	);
}

export default Tooltip;