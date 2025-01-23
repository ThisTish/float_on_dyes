import { Button } from "@/components/ui/button"
import CtaButton from "@/components/ui/CtaButton";
import { ArrowBigRightIcon, ArrowRightFromLine, ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { BiRightArrow } from "react-icons/bi";

const HomePage = () => {

  const cssVariables = [
    { name: "background", color: "bg-background" },
    { name: "foreground", color: "bg-foreground" },
    { name: "card", color: "bg-card" },
    { name: "cardForeground", color: "bg-card-foreground" },
    { name: "popover", color: "bg-popover" },
    { name: "popoverForeground", color: "bg-popover-foreground" },
    { name: "primary", color: "bg-primary" },
    { name: "primaryForeground", color: "bg-primary-foreground" },
    { name: "secondary", color: "bg-secondary" },
    { name: "secondaryForeground", color: "bg-secondary-foreground" },
    { name: "muted", color: "bg-muted" },
    { name: "mutedForeground", color: "bg-muted-foreground" },
    { name: "accent", color: "bg-accent" },
    { name: "accentForeground", color: "bg-accent-foreground" },
    { name: "destructive", color: "bg-destructive" },
    { name: "destructiveForeground", color: "bg-destructive-foreground" },
    { name: "border", color: "bg-border" },
    { name: "input", color: "bg-input" },
    { name: "ring", color: "bg-ring" },
    { name: "chart1", color: "bg-chart-1" },
    { name: "chart2", color: "bg-chart-2" },
    { name: "chart3", color: "bg-chart-3" },
    { name: "chart4", color: "bg-chart-4" },
    { name: "chart5", color: "bg-chart-5" },
    { name: "darkGreen", color: "bg-darkGreen" },
    { name: "lightGreen", color: "bg-lightGreen" },
    { name: "darkBlue", color: "bg-darkBlue" },
    { name: "lightBlue", color: "bg-lightBlue" },
    { name: "brightBlue", color: "bg-brightBlue" },
    { name: "lightCta", color: "bg-lightCta" },
    { name: "darkCta", color: "bg-darkCta" },
    { name: "radius", color: "bg-radius" }
  ]
  const buttonVariants = [
    { name: "default", style: "bg-primary text-primary-foreground shadow hover:bg-primary/90" },
    { name: "destructive", style: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90" },
    { name: "outline", style: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground" },
    { name: "secondary", style: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80" },
    { name: "ghost", style: "hover:bg-accent hover:text-accent-foreground" },
    { name: "link", style: "text-primary underline-offset-4 hover:underline" },
  ]

  type ButtonVariantKeys =
    "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";

  return (
    <main className="h-auto space-y-3 mt-32 gap-2">
      <h1 className="h1-bold">hey ho</h1>
      <div className="flex flex-wrap"></div>
      {buttonVariants.map((buttonVariant, index) => (
        <>
          <Button key={buttonVariant.name} variant={`${buttonVariant.name as ButtonVariantKeys}`}>
            <p >{buttonVariant.name}</p>

          </Button>
        </>
      ))}
      <div>
        {/* <button className="cta relative mx-auto py-3 px-5 transition-all duration-75 ease-in-out border-0 bg-transparent cursor-pointer active:scale-95">
          <Link href="/shop">
          <div className="relative text-lg flex flex-col items-center font-semibold pt-3 text-white">
            <span >Go to the shop</span>
            <span ><ArrowRightIcon /></span>
            </div>
            <svg className="relative top-0 ml-2 fill-none stroke-2 transform -translate-x-[-5px] transition-all duration-75 ease-in-out hover:translate-x-5" width="15px" height="10px" viewBox="0 0 13 10">
              <path strokeLinecap="round" strokeLinejoin="round" d="M1,5 L11,5"></path>
              <polyline points="8 1 12 5 8 9"></polyline>
            </svg>
          </Link>
        </button> */}
        <CtaButton > <span>Go to shop</span> <ArrowRightIcon /></CtaButton>
      </div>
    </main>
  )
}
export default HomePage;
