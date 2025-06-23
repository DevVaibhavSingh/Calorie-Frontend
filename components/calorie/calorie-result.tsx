"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Flame, Beef, Wheat, Droplets } from "lucide-react"
import { useCalorieStore } from "@/lib/store"
import { Dialog } from "@headlessui/react";
import { useState } from "react"

export default function CalorieResult() {
  const [isOpen, setIsOpen] = useState(false);
  const currentResult = useCalorieStore((state) => state.currentResult)
  console.log("Current Result:", currentResult)
  if (!currentResult) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Flame className="h-5 w-5 text-orange-500" />
            Calorie Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          Results will be displayed here after searching for a dish.
          <span className="text-6xl text-gray-400 text-center block mt-8 mb-10 opacity-40">
            🥘
            </span>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Flame className="h-5 w-5 text-orange-500" />
          Calorie Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* <span className="text-8xl absolute opacity-10 self-center my-auto mt-14 text-center ml-36">🥘</span> */}

        <div className="rounded-lg bg-white">
          {/* Dish header */}
          <div className="relative mb-3">
            <h3 className="text-lg font-bold text-gray-800">
              Dish: <span className="text-orange-600 ml-1">{currentResult.dish_name}</span>
            </h3>
            <button
              className="absolute top-0 right-0 bg-orange-600 hover:bg-orange-700 text-white text-sm font-medium py-1 px-3 rounded"
            >
              Track Meal
            </button>
          </div>

          {/* Basic Info */}
          <p className="text-base text-gray-700 mb-0">
            <span className="font-medium text-gray-600">Number of servings:</span>
            <span className="text-orange-600 font-semibold"> {currentResult.servings}</span>
          </p>

          <p className="text-base text-gray-700 mb-0">
            <span className="font-medium text-gray-600">Calories per serving:</span>
            <span className="text-orange-600 font-semibold"> {currentResult.calories_per_serving} calories</span>
          </p>

          <p className="text-base text-gray-700 mb-0">
            <span className="font-medium text-gray-600">Serving size:</span>
            <span className="text-orange-600 font-semibold"> 100g</span>
          </p>

          <p className="text-base text-gray-700 mb-3">
            <span className="font-medium text-gray-600">Total Calories:</span>
            <span className="text-orange-600 font-semibold">
              {currentResult.calories_per_serving} × {currentResult.servings} = {currentResult.total_calories}
            </span>
          </p>

          {/* Explore Button */}
          <button
            onClick={() => setIsOpen(true)}
            className="mt-2 bg-black text-sm text-white font-medium py-1 px-4 rounded hover:bg-orange-700 transition"
          >
            Explore macros
          </button>
        </div>

        {/* Modal / Popup **/}
        {isOpen && (
          <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="fixed inset-0 bg-black opacity-30" aria-hidden="true" />
            <div className="bg-white p-6 rounded-lg shadow-lg z-50 w-[90%] max-w-xl">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Macro Details for {currentResult.dish_name}</h2>

              <div className="grid grid-cols-3 gap-4">
                {currentResult.protein && (
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Beef className="h-4 w-4 text-red-500 mr-1" />
                      <Badge variant="secondary">Protein</Badge>
                    </div>
                    <div className="font-semibold">{currentResult.protein}g</div>
                  </div>
                )}
                {currentResult.carbs && (
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Wheat className="h-4 w-4 text-yellow-500 mr-1" />
                      <Badge variant="secondary">Carbs</Badge>
                    </div>
                    <div className="font-semibold">{currentResult.carbs}g</div>
                  </div>
                )}
                {currentResult.fat && (
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Droplets className="h-4 w-4 text-blue-500 mr-1" />
                      <Badge variant="secondary">Fat</Badge>
                    </div>
                    <div className="font-semibold">{currentResult.fat}g</div>
                  </div>
                )}
              </div>

              {/* Close button */}
              <div className="text-right mt-6">
                <button
                  onClick={() => setIsOpen(false)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-1 px-4 rounded"
                >
                  Close
                </button>
              </div>
            </div>
          </Dialog>
        )}
      </CardContent>
    </Card>
  )
}
