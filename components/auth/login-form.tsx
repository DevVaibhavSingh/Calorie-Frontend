"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2 } from "lucide-react"
import { loginSchema, type LoginFormData } from "@/lib/validations"
import { apiClient } from "@/lib/api"
import { useAuthStore } from "@/lib/store"
import { toast } from "sonner" // Import Sonner's toast

export default function LoginForm() {
  const [error, setError] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const setAuth = useAuthStore((state) => state.setAuth)
  const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true)
    setError("")

    try {
      const response = await apiClient.login(data)
      console.log("Login response:", response.user)
      setAuth(response.user, response.access_token)
      if(response.user) {
        setIsAuthenticated(true);
        toast.success("Logged in Successfully", {
          position: "top-center", // Customize the position
          duration: 3000, // Optional: Set how long the toast should stay visible
          style: {
            backgroundColor: "green", // Custom green background for success
            color: "white", // Ensure text is readable
          },
        })
        // Set Token in Cookie
      }
      console.log(useAuthStore.getState().isAuthenticated);
      router.push("/dashboard")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Welcome Back</CardTitle>
        <CardDescription>Sign in to your account to continue</CardDescription>
      </CardHeader>
      {/* Give username and password */}
      <div className="text-center text-sm text-muted-foreground mb-4">
        <p className="mb-2">Username: vaibhavsingh@abc.io </p>
        <p>Password: 12345678</p>
      </div>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" {...register("email")} disabled={isLoading} />
            {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" {...register("password")} disabled={isLoading} />
            {errors.password && <p className="text-sm text-red-600">{errors.password.message}</p>}
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Sign In
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
