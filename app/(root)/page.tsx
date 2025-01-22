import BlueSkyIcon from "@/components/shared/icons/BlueSkyIcon";

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

  return (
    <main className="h-auto flex flex-wrap mt-32 gap-2">
      <h1 className="h1-bold">hey ho</h1>
      {cssVariables.map((cssVariable, index) => (
        <>
          <div key={cssVariable.name} className={`${[cssVariable.color]} h3-bold h-fit w-fit border border-border`}>
            <p className=" justify-center content-center z-10 pt-10">{cssVariable.name}</p>

          </div>
        </>
      ))}
    </main>
  )
}
export default HomePage;
