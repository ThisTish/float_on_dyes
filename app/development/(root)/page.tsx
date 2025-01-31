"use client"

import Loader from "@/components/ui/Loader"
import { useEffect } from "react"

const HomePage = () => {


  return (
    <main className="h-auto space-y-3 mt-32 gap-2">
      <h1 className="h1-bold">hey ho</h1>
      <div className="flex justify-center items-center">
      <Loader />

      </div>
    </main>
  )
}
export default HomePage
