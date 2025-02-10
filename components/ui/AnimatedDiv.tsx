import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { forwardRef, HTMLAttributes } from "react";

const divVariants = cva(
	"p-2 content-center ease-linear duration-300 rounded-full",
	{
		variants: {
			variant: {
				default: "group-hover:text-primary-foreground group-hover:bg-primary",
				destructive: "group-hover:text-primary-foreground group-hover:bg-lightCta",
				outline: "group-hover:text-accent group-hover:bg-primary-foreground",
				secondary: "group-hover:text-brightBlue group-hover:bg-primary-foreground",
				ghost: " group-hover:bg-transparent",
				link: " group-hover:bg-transparent",
				cta: "group-hover:text-white group-hover:bg-lightCta",
				icon: "group-hover:text-primary-foreground group-hover:bg-lightCta",
			},
			size: {
				default: "p-2",
				sm: "p-1",
				lg: "p-3 ml-3",
				icon: "p-0",

			},
			animation: {
				default: "",
				rotate: "group-hover:rotate-45",
				rotateFull: "group-hover:rotate-180",
				scale: " group-hover:scale-125 group-hover:transition-all group-hover:duration-700",
				show: "absolute left-10 translate-x-full opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100 group-hover:bg-transparent group-hover:text-black ",
				pulse: "group-hover:animate-pulse group-hover:transition-all group-hover:duration-900 ",
				ping: "group-hover:animate-ping group-hover:transition-all group-hover:duration-900 ",
				hide: "bg-transparent group-hover:opacity-0 group-hover:transition-all group-hover:duration-1000 ",
				
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