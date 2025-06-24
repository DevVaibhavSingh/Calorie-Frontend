import axios, { AxiosInstance, AxiosResponse } from "axios"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL
console.log("API_BASE_URL:", API_BASE_URL)

class ApiClient {
  private axiosInstance: AxiosInstance

  constructor() {
    // Create axios instance with base URL and common settings
    this.axiosInstance = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        "Content-Type": "application/json",
      },
    })
  }

  // Helper function to get authorization headers
  getAuthHeaders(): Record<string, string> {
    const token = localStorage.getItem("auth_token")
    return token ? { Authorization: `Bearer ${token}` } : {}
  }

  // Register method
  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      const response: AxiosResponse<AuthResponse> = await this.axiosInstance.post(
        "/auth/register",
        data
      )
      return response.data
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Registration failed")
    }
  }

  // Login method
  async login(data: LoginData): Promise<AuthResponse> {
    try {
      const response: AxiosResponse<AuthResponse> = await this.axiosInstance.post(
        "/auth/login",
        data
      )
      return response.data
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Login failed")
    }
  }

  // Get calories method
  async getCalories(dishName: string, servings: number): Promise<CalorieResponse> {
    try {
      const response: AxiosResponse<CalorieResponse> = await this.axiosInstance.post(
        "/get-calories",
        { dish_name: dishName, servings: servings },
        { 
          headers: this.getAuthHeaders(),
          withCredentials: true
        }
      )
      return response.data
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to get calorie data")
    }
  }

  // Get meal history method
  async getMealHistory(): Promise<CalorieResponse[]> {
    try {
      const response: AxiosResponse<CalorieResponse[]> = await this.axiosInstance.get(
        "/my-dishes/",
        { headers: this.getAuthHeaders() }
      )
      return response.data
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to fetch meal history")
    }
  }
}

export const apiClient = new ApiClient()

export interface RegisterData {
  email: string
  password: string
  first_name: string
  last_name: string
}

export interface AuthResponse {
  access_token: string
  user: {
    id: string
    first_name: string
    email: string
  }
}

export interface LoginData {
  email: string
  password: string
}

export interface CalorieResponse {
  calories: number
  cache?: boolean
  success?: boolean
  dish_name?: string
  servings?: number
  calories_per_serving?: number
  protein?: number
  carbs?: number
  fat?: number
  servingSize?: string
  total_calories?: number
}
