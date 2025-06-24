"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/lib/store"
import CalorieSearchForm from "@/components/calorie/calorie-search-form"
import CalorieResult from "@/components/calorie/calorie-result"
import MealTable from "@/components/calorie/MealTable"
import { apiClient } from "@/lib/api"

export default function DashboardPage() {
  const [darkMode, setDarkMode] = useState(false)
  const { isAuthenticated } = useAuthStore()
  const [loading, setLoading] = useState(true)
  const router = useRouter()

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
  ]

  // Check for saved theme preference or system preference on load
  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode") === "true"
    const systemPreference = window.matchMedia("(prefers-color-scheme: dark)").matches
    setDarkMode(savedDarkMode || systemPreference)
  }, [])

  // Update theme based on darkMode state
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("darkMode", "true")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("darkMode", "false")
    }
  }, [darkMode])

  const fetchUserData = async () => {
    try {
      // Call the 'me' API to fetch user data
      const userData = await apiClient.me()
   
      if (userData) {
        
      }
      // setUser(userData) // Store the user data in your global state
      // setIsAuthenticated(true) // Mark as authenticated
    } catch (error) {
      // Handle error: user is not authenticated or token is invalid
      console.error("Failed to fetch user data", error)
      // setUser(null) // Clear user data on error
      // setIsAuthenticated(false) // Mark as not authenticated
      router.push("/login") // Redirect to login if not authenticated
    } finally {
      setLoading(false) // Stop loading after the request finishes
    }
  }

  useEffect(() => {
    fetchUserData()
  }, [isAuthenticated]); // Only run this effect when isAuthenticated changes

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="border-t-4 border-blue-500 border-solid rounded-full w-16 h-16 animate-spin"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null // User is redirected to login if not authenticated
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">Calorie Tracker</h1>
            <p className="text-muted-foreground">Search for dish calories and track your nutrition information</p>
          </div>

          {/* Dark Mode Toggle Button */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-3 bg-gray-700 text-white text-sm rounded-full shadow-lg"
          >
            {darkMode ? "Light" : "Dark"} Mode {darkMode ? "🌞" : "🌙"}
          </button>
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
