import AnotherButton from "@/components/ui/buttons/CtaButton";
import { Button } from "@/components/ui/button"
import SubmitButton from "@/components/ui/buttons/SubmitButton";
import CtaButton from "@/components/ui/buttons/CtaButton";
import LoginLogoutButton from "@/components/ui/buttons/LoginLogoutButton";
import { MessageCircle } from "lucide-react";

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
    {name: "cta", style: "bg-lightCta text-white before:bg-white hover:text-lightCta shadow-xl "},
  ]

  type ButtonVariantKeys =
    "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";

  return (
    <main className="h-auto space-y-3 mt-32 gap-2">
      <h1 className="h1-bold">hey ho</h1>
      <div className="flex flex-wrap gap-3">
      {buttonVariants.map((buttonVariant, index) => (
        <>
          <Button key={index} variant={`${buttonVariant.name as ButtonVariantKeys}`}>
            <p >{buttonVariant.name}</p>

          </Button>
        </>
      ))}
      </div>
      <div className="space-y-3">




        <SubmitButton />

        <div className="flex gap-3">
          <button className="group flex items-center justify-center gap-3 shadow-xl text-lg  lg:font-semibold relative overflow-hidden z-10 p-2 before:absolute before:w-full before:transition-all before:duration-700 before:-left-full before:rounded-full before:-z-10 before:aspect-square before:hover:w-full before:hover:left-0 before:hover:scale-150 before:hover:duration-700 px-4

    before:bg-darkGreen hover:text-white bg-secondary border">
            Contact
            <div className="p-1 content-center ease-linear duration-300 rounded-full  
            group-hover:bg-white group-hover:border-none group-hover:text-primary  
          group-hover:scale-x-125 group-hover:scale-y-125">
              <MessageCircle size={16} />
            </div>
          </button>

          <CtaButton />
        </div>

        <LoginLogoutButton />

        {/* <CtaButton > <span>Go to shop</span> <ArrowRightIcon /></CtaButton> */}
      </div>
    </main>
  )
}
export default HomePage;
