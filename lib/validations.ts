import { z } from "zod"

export const registerSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
})

export const calorieSearchSchema = z.object({
  dishName: z.string().min(1, "Please enter a dish name"),
  servings: z.number().min(0.1, "Servings must be at least 0.1").max(20, "Maximum 20 servings allowed"),
})

export type RegisterFormData = z.infer<typeof registerSchema>
export type LoginFormData = z.infer<typeof loginSchema>
export type CalorieSearchFormData = z.infer<typeof calorieSearchSchema>
