import { AnimatedDiv } from "@/components/ui/AnimatedDiv"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, MessageCircle } from "lucide-react"
import Link from "next/link"

const HomePage = async () => {


  return (
    <main className="h-auto">
      <div className="flex flex-col w-full min-h-96 absolute inset-0 bg-[url('/heroLandscape.svg')] bg-cover bg-center bg-no-repeat  ">
        <hgroup className="relative mx-auto my-auto w-20">

          <h1 className="grid text-5xl text-darkBlue dark:text-lightBlue absolute -left-20 -top-40 tracking-tighter leading-9 md:text-6xl lg:text-7xl lg:-left-32">
            <span className="-mb-3 ml-1"><b> F</b>loat</span>
            <span><b>o</b>n</span>
            <span><b>D</b>yes</span>
          </h1>

          <h2 className="text-xl text-primary text-end w-52 p-2 backdrop-blur-sm leading-5 absolute top-11 -right-[4.5rem] text-pretty rounded-full md:w-72 md:-right-[9.5rem] md:top-20 lg:text-2xl lg:w-80 lg:-right-72">
            <p>One of a kind dyes and custom designs for your favorite things...</p>
            <span className="px-1 font-extrabold w-fit text-2xl">Discs</span>
          </h2>
        </hgroup>
        <div className="flex gap-3 justify-end px-5 pb-5 -mt-14 md:pb-8 wrapper">
          <Button
            variant={"default"}
            className="h-8 px-2 tracking-widest text-xs gap-1 md:h-10 md:px-3 md:tracking-wider md:font-semibold md:gap-2"
            asChild
          >
            <Link href="/contact">
              Contact Us
              <AnimatedDiv variant={'secondary'} animation={'scale'}>
                <MessageCircle />
              </AnimatedDiv>
            </Link>
          </Button>

          <Button
            variant={"cta"}
            className="h-8 px-2 tracking-widest text-xs gap-1 md:h-10 md:px-3 md:tracking-wider md:font-semibold md:gap-2"
            asChild
          >
            <Link href="/shop">
              Go to Shop
              <AnimatedDiv variant={'cta'} animation={'rotate'}>
                <ArrowUpRight />
              </AnimatedDiv>
            </Link>
          </Button>
        </div>
      </div>


    </main>
  )
}
export default HomePage
