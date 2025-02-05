import Hero from "@/components/landing/Hero"
import ProductCard from "@/components/shared/product/ProductCard"

import { getLatestProducts } from "@/lib/actions/product.actions"


const HomePage = async () => {
  const products = await getLatestProducts()

  return (
    <div>

      <Hero />
      
      <section className="mt-[40rem] flex flex-wrap justify-center gap-2 p-2">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>


    </div>
  )
}
export default HomePage
