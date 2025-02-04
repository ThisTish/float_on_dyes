import Hero from "@/components/landing/Hero"
import ProductCard from "@/components/shared/product/ProductCard"

import { getLatestProducts } from "@/lib/actions/product.actions"


const HomePage = async () => {
  const products = await getLatestProducts()

  return (
    <div className="flex flex-col">
      <Hero />
      <section className="mt-[40rem]"> {/* Add margin-top to separate from Hero */}
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>


    </div>
  )
}
export default HomePage
