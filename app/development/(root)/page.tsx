import FeaturedDiscs from "@/components/landing/FeaturedDiscs"
import Hero from "@/components/landing/Hero"
import SearchButton from "@/components/ui/SearchButton"

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))


const HomePage = async () => {

  await delay(3000)

  return (
    <div>

      <Hero />
      <FeaturedDiscs />
      <SearchButton />

    </div>
  )
}
export default HomePage
