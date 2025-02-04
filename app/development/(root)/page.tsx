import Hero from "@/components/landing/Hero"
import ProductCard from "@/components/shared/product/ProductCard"

import { getLatestProducts } from "@/lib/actions/product.actions"


const HomePage = async () => {
  const products = await getLatestProducts()
  console.log(typeof(products[0].price))

  return (
    <div>

      <Hero />
      
      <section className="mt-[40rem]">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>


    </div>
  )
}
export default HomePage
