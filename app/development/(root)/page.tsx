import Hero from "@/components/landing/Hero"
import { Card } from "@/components/ui/card"


const HomePage = async () => {

  throw new Error('This is a test error')

  return (
    <main className="h-auto">
      <Hero />

      <Card>
        
      </Card>

    </main>
  )
}
export default HomePage
