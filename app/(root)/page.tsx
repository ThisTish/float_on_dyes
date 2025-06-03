import FeaturedDiscs from "@/components/landing/FeaturedDiscs"
import Hero from "@/components/landing/Hero"
import SearchArea from "@/components/landing/SearchArea"

const HomePage = async () => {

  return (
    <div>
      <Hero />
      <FeaturedDiscs />
      <SearchArea />
    </div>
  )
}
export default HomePage
