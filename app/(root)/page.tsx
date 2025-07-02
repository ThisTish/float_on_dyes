import CustomerReviews from "@/components/landing/CustomerReviews"
import CustomOrders from "@/components/landing/CustomOrders"
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
      <CustomOrders />
    </main>
  )
}
export default HomePage
