import CustomerReviews from "@/components/landing/CustomerReviews"
import FeaturedDiscs from "@/components/landing/FeaturedDiscs"
import Hero from "@/components/landing/Hero"
import SearchArea from "@/components/landing/SearchArea"

const HomePage = async () => {

  return (
    <main>
      <Hero />
      <FeaturedDiscs />
      <SearchArea />
      <CustomerReviews />
    </main>
  )
}
export default HomePage
