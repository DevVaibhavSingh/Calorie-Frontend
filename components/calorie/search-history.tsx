"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
import { History, Trash2 } from "lucide-react"
import { useCalorieStore } from "@/lib/store"

export default function SearchHistory() {
  const { searchHistory, clearHistory, setCurrentResult } = useCalorieStore((state) => ({
    searchHistory: state.searchHistory,
    clearHistory: state.clearHistory,
    setCurrentResult: state.setCurrentResult,
  }));
  

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <History className="h-5 w-5" />
          Recent Searches
        </CardTitle>
        <Button variant="outline" size="sm" onClick={clearHistory} className="text-red-600 hover:text-red-700">
          <Trash2 className="h-4 w-4 mr-1" />
          Clear
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {searchHistory.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 cursor-pointer transition-colors"
              onClick={() => setCurrentResult(item)}
            >
              <div>
                <div className="font-medium">{item?.dish_name}</div>
                {/* <div className="text-sm text-muted-foreground">
                  {item?.calories} calories
                  {item?.servings && item.servings !== 1 && ` (${item?.servings} servings)`}
                  {item?.servingSize && ` per ${item.servingSize}`}
                </div> */}
              </div>
              {/* <Badge variant="secondary">{item?.calories} cal</Badge> */}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
