import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group inline-flex items-center justify-center whitespace-nowrap transition-all duration-200 active:translate-x-1 active:translate-y-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring  disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 group relative overflow-hidden z-10 before:absolute before:w-full before:transition-all before:duration-700 before:-left-full before:rounded-full before:-z-10 before:aspect-square before:hover:w-full before:hover:left-0 before:hover:scale-150 before:hover:duration-700 ",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground before:bg-primary-foreground hover:text-primary shadow-xl",
        destructive:
          "bg-destructive text-white shadow-sm before:bg-white hover:text-destructive border border-destructive",
        outline:
          "border border-input bg-darkBlue shadow-xl text-white dark:bg-lightBlue before:bg-white hover:text-darkBlue dark:hover:text-lightBlue hover:border hover:border-darkBlue",
        secondary:
          "bg-darkBlue text-primary-foreground shadow-sm before:bg-brightBlue hover:text-accent-foreground",
        ghost: "before:bg-lightGreen hover:text-popover-foreground",
        link: " text-primary hover:text-primary-darkBlue before:hover:bg-darkBlue before:absolute before:h-2 before:w-3/4 before:bottom-0",
        cta: " bg-lightCta text-white before:bg-white hover:text-black shadow-md ",
        icon: "justify-center w-10 bg-lightCta text-primary-foreground aspect-square transition-all duration-300 ease-out before:bg-white hover:justify-start hover:text-black hover:w-[125px] ",
        chip: "bg-card text-darkBlue border-darkBlue border-[2px] hover:border-t hover:border-b hover:border-primary-foreground focus-visible:border-t focus-visible:border-b focus-visible:border-primary-foreground focus-visible:ring-0",
      },
      size: {
        default: "h-11 px-3 tracking-wider font-semibold gap-2",
        sm: "h-8 px-2 tracking-widest text-xs font-semibold gap-1 ",
        lg: "h-12 px-6 text-lg",
        icon: "size-9 p-2",
        chip: "h-6 px-1 text-xs",

      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
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
