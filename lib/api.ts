const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL
console.log("API_BASE_URL:", API_BASE_URL)
class ApiClient {
  getAuthHeaders(): Record<string, string> {
    const token = localStorage.getItem("auth_token")
    return token
      ? { Authorization: `Bearer ${token}` }
      : {};
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || "Registration failed")
    }

    return response.json()
  }

  async login(data: LoginData): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || "Login failed")
    }

    return response.json()
  }

  async getCalories(dishName: string, servings: number): Promise<CalorieResponse> {
    const response = await fetch(`${API_BASE_URL}/get-calories/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...this.getAuthHeaders(),
      },
      body: JSON.stringify({
        dish_name: dishName,
        servings: servings,
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || "Failed to get calorie data")
    }

    return response.json()
  }

  async getMealHistory(): Promise<CalorieResponse[]> {
    const response = await fetch(`${API_BASE_URL}/my-dishes/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...this.getAuthHeaders(),
      },
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || "Failed to fetch meal history")
    }

    return response.json()
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
