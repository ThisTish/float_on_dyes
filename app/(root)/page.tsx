import { auth } from "@/auth"
import FeaturedDiscs from "@/components/landing/FeaturedDiscs"
import Hero from "@/components/landing/Hero"
import { redirect } from "next/navigation"

const HomePage = async () => {

  const session = await auth()
  if(!session?.user) redirect('/coming-soon')

  return (
    <div>
      <Hero />
      <FeaturedDiscs />
    </div>
  )
}
export default HomePage
