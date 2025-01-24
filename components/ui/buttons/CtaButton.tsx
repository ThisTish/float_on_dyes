import { MoveUpRight } from "lucide-react"


// { text, icon, animation, variation }
const CtaButton = () => {
  return (

    <button className="
    inline-flex hover:under items-center justify-center gap-2 whitespace-nowrap      focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0
    group shadow-xl relative overflow-hidden z-10 before:absolute before:w-full before:transition-all before:duration-700 before:-left-full before:rounded-full before:-z-10 before:aspect-square before:hover:w-full before:hover:left-0 before:hover:scale-150 before:hover:duration-700 
    h-12 px-6 text-lg

  bg-lightCta text-white before:bg-white hover:text-lightCta 
    ">
      Shop
      <div className="p-1 content-center ease-linear duration-300 rounded-full  

            group-hover:text-white group-hover:bg-lightCta 
          group-hover:rotate-45 ">
        <MoveUpRight size={16} />
      </div>
    </button>
  )
}

export default CtaButton
