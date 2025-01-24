import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { forwardRef, HTMLAttributes } from "react";

const divVariants = cva(
	"p-2 content-center ease-linear duration-300 rounded-full",
	{
		variants: {
			variant: {
				default: "group-hover:text-white group-hover:bg-primary",
				destructive: "group-hover:text-white group-hover:bg-lightCta",
				outline: "group-hover:text-white group-hover:bg-lightCta",
				secondary: "group-hover:text-white group-hover:bg-lightCta",
				ghost: "group-hover:text-white group-hover:bg-lightCta",
				link: "group-hover:text-white group-hover:bg-lightCta",
				cta: "group-hover:text-white group-hover:bg-lightCta",
				icon: "group-hover:text-white group-hover:bg-lightCta",
			},
			size: {
				default: "p-2",
				sm: "p-1",
				lg: "p-3",
				icon: "p-2",

			},
			animation: {
				default: "",
				rotate: "group-hover:rotate-45",
				scale: "group-hover:scale-125",
				// not proper
				show: "absolute right-5 transform translate-x-full opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100",
				// not working at all
				shake: "animate-ping",
			}
		},
		defaultVariants:{
			variant: "default",
			size: "default",
			animation: "default"
		}
	}
)

export interface DivProps
	extends React.DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
	VariantProps<typeof divVariants> { }

const AnimatedDiv = forwardRef<HTMLDivElement, DivProps>(
	({ className, variant, size, animation, ...props }, ref) => {
		return (
			<div
				ref={ref}
				className={cn(divVariants({ variant, size, className, animation }))}
				{...props}
			>
				{props.children}
			</div>
		)
	}
)
AnimatedDiv.displayName = "AnimatedDiv"

export { AnimatedDiv, divVariants }