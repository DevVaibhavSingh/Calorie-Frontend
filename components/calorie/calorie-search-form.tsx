"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Search } from "lucide-react"
import { calorieSearchSchema, type CalorieSearchFormData } from "@/lib/validations"
import { apiClient } from "@/lib/api"
import { useCalorieStore } from "@/lib/store"
import { CalorieData } from "@/lib/types"

export default function CalorieSearchForm() {
  const [error, setError] = useState<string>("")
  const { isLoading, setLoading, setCurrentResult, addToHistory } = useCalorieStore()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CalorieSearchFormData>({
    resolver: zodResolver(calorieSearchSchema),
    defaultValues: {
      servings: 1,
    },
  })

  const onSubmit = async (data: CalorieSearchFormData) => {
    setLoading(true)
    setError("")

    try {
      const response = await apiClient.getCalories(data.dishName, data.servings)
      
      if (response.success) {
        // response.data already includes servings and other fields
        setCurrentResult(response as CalorieData)
        debugger
        addToHistory(response as CalorieData)
        reset()
      } else {
        setError("Failed to get calorie data")
      }
    } catch (error) {
      // Optional: Handle network or unexpected errors
      setError("An error occurred while fetching calorie data")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="h-5 w-5" />
          Search Dish Calories
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="dishName">Dish Name</Label>
            <Input
              id="dishName"
              placeholder="e.g., Chicken Caesar Salad, Margherita Pizza..."
              {...register("dishName")}
              disabled={isLoading}
            />
            {errors.dishName && <p className="text-sm text-red-600">{errors.dishName.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="servings">Number of Servings</Label>
            <Input
              id="servings"
              type="number"
              step="0.1"
              min="0.1"
              max="20"
              placeholder="1.0"
              {...register("servings", { valueAsNumber: true })}
              disabled={isLoading}
            />
            {errors.servings && <p className="text-sm text-red-600">{errors.servings.message}</p>}
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Get Calorie Information
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
