"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/lib/store"
import CalorieSearchForm from "@/components/calorie/calorie-search-form"
import CalorieResult from "@/components/calorie/calorie-result"
// import SearchHistory from "@/components/calorie/search-history"
import MealTable from "@/components/calorie/MealTable"

export default function DashboardPage() {
  const meals = [
    {
      dish_name: "Chicken",
      servings: 2,
      calories_per_serving: 376.0,
      total_calories: 752.0,
      source: "USDA FoodData Center",
      datetime: "2025-06-22 14:30",
      protein: 62,
      carbs: 5,
      fat: 18,
    },
    // Add more meal entries as needed
  ];
  
  const { isAuthenticated } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Calorie Tracker</h1>
          <p className="text-muted-foreground">Search for dish calories and track your nutrition information</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-6">
            <CalorieSearchForm />
            {/* <SearchHistory /> */}
          
          </div>
          <div>
            <CalorieResult />
          </div>
        </div>
        <MealTable meals={meals} />
      </div>
    </div>
  )
}
