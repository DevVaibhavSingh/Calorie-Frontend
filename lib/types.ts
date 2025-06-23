export interface User {
  id: string
  first_name?: string
  last_name?: string
  email: string
}

export interface AuthResponse {
  token: string
  user: User
  access_token: string
}

export interface RegisterData {
  first_name: string
  last_name: string
  email: string
  password: string
}

export interface LoginData {
  email: string
  password: string
}

export interface CalorieRequest {
  dish_name: string
  number_of_servings: number
}

export interface CalorieData {
  dish_name: string
  servings: number
  calories_per_serving: number
  protein?: number
  carbs?: number
  fat?: number
  servingSize?: string
  total_calories?: number
}

export interface CalorieResponse {
  success: boolean
  data: CalorieData[]
  message?: string
  cache?: boolean
}
