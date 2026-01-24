"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { signInWithGoogle, authClient } from "@/lib/auth-client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  // Check if user is already logged in
  useEffect(() => {
    const checkSession = async () => {
      try {
        const data = await authClient.getSession()
        if (data.data?.user) {
          router.push("/console/verify")
        }
      } catch (error) {
        console.error("Error checking session:", error)
      }
    }
    
    checkSession()
    
    // Also check on focus (in case session was updated in another tab)
    const handleFocus = () => {
      checkSession()
    }
    window.addEventListener('focus', handleFocus)
    
    return () => {
      window.removeEventListener('focus', handleFocus)
    }
  }, [router])

  const handleGoogleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    try {
      const result = await signInWithGoogle()
      
      // If successful, wait a bit then check session and redirect
      if (result && !result.error) {
        // Wait for session to be established
        setTimeout(async () => {
          try {
            const sessionData = await authClient.getSession()
            if (sessionData.data?.user) {
              router.push("/console/verify")
              // Force a page reload to ensure all components get the new session
              window.location.href = "/console/verify"
            }
          } catch (err) {
            console.error("Error getting session after login:", err)
          }
        }, 1000)
      }
    } catch (err: any) {
      console.error("Google login error:", err)
      setError(err?.message || "Failed to login with Google. Please check your Google OAuth configuration.")
      setLoading(false)
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <FieldGroup>
              {error && (
                <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                  {error}
                </div>
              )}
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" required />
              </Field>
              <Field>
                <div className="flex flex-col gap-3">
                  <Button type="submit" className="w-full">Login</Button>
                  <Button 
                    variant="outline" 
                    type="button"
                    onClick={handleGoogleLogin}
                    disabled={loading}
                    className="w-full"
                  >
                    {loading ? "Loading..." : "Login with Google"}
                  </Button>
                </div>
                <FieldDescription className="text-center mt-4">
                  Don&apos;t have an account? <a href="#">Sign up</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
