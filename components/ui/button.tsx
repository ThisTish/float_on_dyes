import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 group relative overflow-hidden z-10 before:absolute before:w-full before:transition-all before:duration-700 before:-left-full before:rounded-full before:-z-10 before:aspect-square before:hover:w-full before:hover:left-0 before:hover:scale-150 before:hover:duration-700 ",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground before:bg-white hover:text-primary shadow-xl",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm before:bg-destructive-foreground hover:text-destructive hover:ring-4 hover:ring-destructive",
        outline:
          "border border-input bg-secondary shadow-xl before:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-darkBlue text-primary-foreground shadow-sm before:bg-brightBlue hover:text-accent-foreground",
        ghost: "before:bg-lightGreen hover:text-popover-foreground",
        link: " text-primary hover:text-darkBlue underline-offset-4 hover:underline hover:underline-darkBlue",
        cta: "bg-lightCta text-white before:bg-white hover:text-secondary-foreground shadow-xl "
      },
      size: {
        default: "h-10 px-3 tracking-wider font-semibold gap-2",
        sm: "h-8 px-2 tracking-widest text-xs gap-1 ",
        lg: "h-12 px-6 text-lg",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const divVariants = cva(
  "p-2 content-center ease-linear duration-300 rounded-full", 
  {
    variants:{
      variant:{
        default: "group-hover:text-white group-hover:bg-primary",
        destructive: "group-hover:text-white group-hover:bg-lightCta",
        cta: "group-hover:text-white group-hover:bg-lightCta",

      }
    }
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
