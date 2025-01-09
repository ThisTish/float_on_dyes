import Image from "next/image";

export default function Home() {
  const colors = [{
    primary: "bg-primary text-secondary",
    secondary: "bg-secondary text-primary",
    darkGreen: "bg-darkGreen text-secondary",
    brightBlue: "bg-brightBlue text-secondary",
    lightBlue: "bg-lightBlue text-primary",
    lightGreen: "bg-lightGreen text-primary",
    darkCta: "bg-darkCta text-secondary",
    lightCta: "bg-lightCta text-primary",
    darkBlue: "bg-darkBlue text-secondary",
  }]
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center bg-gradient-to-t from-darkGreen from-25% via-brightBlue to-75% to-lightBlue justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {colors.map((color, colorIndex) => (
        <div
          key={`color-${colorIndex}`}
          className="grid grid-cols-3 row-start-2 m-20 gap-1 p-10"
        >
          {Object.values(color).map((bgColor, index) => (
            <div
              key={bgColor}
              className={`${bgColor} size-64 border-4 border-primary flex items-center justify-center`}
            >
              {/* <p className={` text-center text-3xl font-bold`}>
                {bgColor.split("-")[1]}
              </p> */}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
