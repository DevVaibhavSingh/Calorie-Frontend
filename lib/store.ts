import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { User, CalorieData } from "./types"

interface AuthState {
  user: User | null
  access_token: string | null
  isAuthenticated: boolean
  setAuth: (user: User, token: string) => void
  setIsAuthenticated: (isAuthenticated: boolean) => void
  logout: () => void
}

interface CalorieState {
  searchHistory: CalorieData[]
  currentResult: CalorieData | null
  isLoading: boolean
  setCurrentResult: (result: CalorieData) => void
  addToHistory: (result: CalorieData) => void
  setLoading: (loading: boolean) => void
  clearHistory: () => void
}

interface mealHistory {
  mealHistory: object | null
  isLoading: boolean
  setMeal: (MealData: object) => void
  setLoading: (loading: boolean) => void
  clearHistory: () => void
}

export const useHistoryStore = create<mealHistory>()(
  persist(
    (set) => ({
      mealHistory: null,
      isLoading: false,
      setMeal: (MealData) => {
        set({ mealHistory: MealData })
      },
      setLoading: (loading: boolean) => set({ isLoading: loading }),
      clearHistory: () => set({ mealHistory: null }),
    }),
    {
      name: "meal-history-storage",
    }
  )
)

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      access_token: null,
      isAuthenticated: false,
      setAuth: (user, token) => {
        localStorage.setItem("auth_token", token)
        set({ user, access_token: token, isAuthenticated: true })
      },
      setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
      logout: () => {
        localStorage.removeItem("auth_token")
        set({ user: null, access_token: null, isAuthenticated: false })
      },
    }),
    {
      name: "auth-storage",
    },
  ),
)

export const useCalorieStore = create<CalorieState>((set, get) => ({
  searchHistory: [],
  currentResult: null,
  isLoading: false,
  setCurrentResult: (result) => set({ currentResult: result }),
  addToHistory: (result) => {
    const history = get().searchHistory
    const exists = history.find((item) => item.dish_name.toLowerCase() === result.dish_name.toLowerCase())
    if (!exists) {
      set({ searchHistory: [result, ...history.slice(0, 9)] }) // Keep last 10 searches
    }
  },
  setLoading: (loading) => set({ isLoading: loading }),
  clearHistory: () => set({ searchHistory: [] }),
}))
