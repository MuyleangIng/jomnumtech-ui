"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Facebook, Mail, AlertCircle, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface SignUpFormProps {
  onSuccess?: () => void
}

export function SignUpForm({ onSuccess }: SignUpFormProps) {
  const [isEmailForm, setIsEmailForm] = useState(false)
  const [username, setUsername] = useState("")
  // const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  // const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<{
    username?: string
    email?: string
    password?: string
    // confirmPassword?: string
    general?: string
  }>({})

  const router = useRouter()
  const { toast } = useToast()

  // Validate form fields
  const validateForm = () => {
    const newErrors: {
      username?: string
      email?: string
      password?: string
      // confirmPassword?: string
    } = {}

    // Username validation
    if (username.length < 3) {
      newErrors.username = "Username must be at least 3 characters"
    } else if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      newErrors.username = "Username can only contain letters, numbers and underscore"
    }

    // Email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address"
    }

    // Password validation
    if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
    }

    // // Confirm password validation
    // if (password !== confirmPassword) {
    //   newErrors.confirmPassword = "Passwords do not match"
    // }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          // name,
          email,
          password,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        if (data.code === "duplicate_email") {
          setErrors((prev) => ({ ...prev, email: "Email already in use" }))
        } else if (data.code === "duplicate_username") {
          setErrors((prev) => ({ ...prev, username: "Username already taken" }))
        } else {
          throw new Error(data.message || "Something went wrong")
        }
        return
      }

      toast({
        title: "Account created!",
        description: "Please verify your email with the code we sent you",
      })
      // When create success it will close dialog
      if (onSuccess) onSuccess()

      // Redirect to verification page
      router.push(`/register/success?email=${encodeURIComponent(email)}`)
      // router.push(`/register/success?email=${encodeURIComponent(email)}`)
    } catch (error) {
      toast({
        title: "Error creating account",
        description: error instanceof Error ? error.message : "Please try again later",
        variant: "destructive",
      })
      setErrors((prev) => ({ ...prev, general: error instanceof Error ? error.message : "Registration failed" }))
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = () => {
    const clientId = "864319511903-9ppi277qfje6aa3nt2obh0d1tohlro2m.apps.googleusercontent.com"
    const redirectUri = `${window.location.origin}/auth/google/callback`
    const scope = "openid email profile"

    const googleAuthUrl =
        `https://accounts.google.com/o/oauth2/v2/auth?` +
        `client_id=${encodeURIComponent(clientId!)}&` +
        `redirect_uri=${encodeURIComponent(redirectUri)}&` +
        `response_type=code&` +
        `scope=${encodeURIComponent(scope)}&` +
        `access_type=offline`

    window.location.href = googleAuthUrl
  }

  if (isEmailForm) {
    return (
        <form onSubmit={handleEmailSignUp} className="space-y-4 py-2">
          {errors.general && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{errors.general}</AlertDescription>
              </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Choose a username"
                required
                className={errors.username ? "border-red-500" : ""}
            />
            {errors.username && <p className="text-sm text-red-500">{errors.username}</p>}
          </div>

          {/*<div className="space-y-2">*/}
          {/*  <Label htmlFor="name">Full Name</Label>*/}
          {/*  <Input*/}
          {/*      id="name"*/}
          {/*      value={name}*/}
          {/*      onChange={(e) => setName(e.target.value)}*/}
          {/*      placeholder="Enter your name"*/}
          {/*      required*/}
          {/*  />*/}
          {/*</div>*/}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password (min 8 characters)"
                required
                className={errors.password ? "border-red-500" : ""}
            />
            {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
          </div>

          {/*<div className="space-y-2">*/}
          {/*  <Label htmlFor="confirmPassword">Confirm Password</Label>*/}
          {/*  <Input*/}
          {/*      id="confirmPassword"*/}
          {/*      type="password"*/}
          {/*      value={confirmPassword}*/}
          {/*      onChange={(e) => setConfirmPassword(e.target.value)}*/}
          {/*      placeholder="Confirm your password"*/}
          {/*      required*/}
          {/*      className={errors.confirmPassword ? "border-red-500" : ""}*/}
          {/*  />*/}
          {/*  {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword}</p>}*/}
          {/*</div>*/}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
            ) : (
                "Sign up with email"
            )}
          </Button>

          <Button type="button" variant="outline" className="w-full" onClick={() => setIsEmailForm(false)}>
            Back to all options
          </Button>
        </form>
    )
  }

  return (
      <div className="flex flex-col gap-2 py-4">
        <Button
            variant="outline"
            className="flex items-center justify-center gap-2"
            onClick={handleGoogleSignIn}
        >
          <svg viewBox="0 0 24 24" width="16" height="16">
            <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
              <path
                  fill="#4285F4"
                  d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"
              />
              <path
                  fill="#34A853"
                  d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"
              />
              <path
                  fill="#FBBC05"
                  d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"
              />
              <path
                  fill="#EA4335"
                  d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"
              />
            </g>
          </svg>
          Sign up with Google
        </Button>

        <Button
            variant="outline"
            className="flex items-center justify-center gap-2"
            // onClick={() => handleProviderSignUp("facebook")}
            disabled
        >
          <Facebook className="h-4 w-4 text-blue-600" />
          Sign up with Facebook
        </Button>

        <Button variant="outline" className="flex items-center justify-center gap-2" onClick={() => setIsEmailForm(true)}>
          <Mail className="h-4 w-4" />
          Sign up with email
        </Button>
      </div>
  )
}


// "use client"
//
// import type React from "react"
//
// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import { Facebook, Mail } from "lucide-react"
// import { signIn } from "next-auth/react"
//
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { useToast } from "@/components/ui/use-toast"
//
// export function SignUpForm() {
//   const [isEmailForm, setIsEmailForm] = useState(false)
//   const [name, setName] = useState("")
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [isLoading, setIsLoading] = useState(false)
//   const router = useRouter()
//   const { toast } = useToast()
//
//   const handleEmailSignUp = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setIsLoading(true)
//
//     try {
//       const response = await fetch("/api/auth/register", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           name,
//           email,
//           password,
//         }),
//       })
//
//       const data = await response.json()
//
//       if (!response.ok) {
//         throw new Error(data.message || "Something went wrong")
//       }
//
//       toast({
//         title: "Account created!",
//         description: "Please sign in with your new account",
//       })
//
//       // Redirect to sign in
//       router.refresh()
//     } catch (error) {
//       toast({
//         title: "Error creating account",
//         description: error instanceof Error ? error.message : "Please try again later",
//         variant: "destructive",
//       })
//     } finally {
//       setIsLoading(false)
//     }
//   }
//
//   const handleProviderSignUp = (provider: string) => {
//     // Use NextAuth signIn for OAuth providers
//     // This will handle both sign up and sign in
//     signIn(provider, { callbackUrl: "/" })
//   }
//
//   if (isEmailForm) {
//     return (
//       <form onSubmit={handleEmailSignUp} className="space-y-4 py-2">
//         <div className="space-y-2">
//           <Label htmlFor="name">Name</Label>
//           <Input
//             id="name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             placeholder="Enter your name"
//             required
//           />
//         </div>
//         <div className="space-y-2">
//           <Label htmlFor="email">Email</Label>
//           <Input
//             id="email"
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="Enter your email"
//             required
//           />
//         </div>
//         <div className="space-y-2">
//           <Label htmlFor="password">Password</Label>
//           <Input
//             id="password"
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="Create a password"
//             required
//           />
//         </div>
//         <Button type="submit" className="w-full" disabled={isLoading}>
//           {isLoading ? "Creating account..." : "Sign up with email"}
//         </Button>
//         <Button type="button" variant="outline" className="w-full" onClick={() => setIsEmailForm(false)}>
//           Back to all options
//         </Button>
//       </form>
//     )
//   }
//
//   return (
//     <div className="flex flex-col gap-2 py-4">
//       <Button
//         variant="outline"
//         className="flex items-center justify-center gap-2"
//         onClick={() => handleProviderSignUp("google")}
//       >
//         <svg viewBox="0 0 24 24" width="16" height="16">
//           <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
//             <path
//               fill="#4285F4"
//               d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"
//             />
//             <path
//               fill="#34A853"
//               d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"
//             />
//             <path
//               fill="#FBBC05"
//               d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"
//             />
//             <path
//               fill="#EA4335"
//               d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"
//             />
//           </g>
//         </svg>
//         Sign up with Google
//       </Button>
//
//       <Button
//         variant="outline"
//         className="flex items-center justify-center gap-2"
//         onClick={() => handleProviderSignUp("facebook")}
//       >
//         <Facebook className="h-4 w-4 text-blue-600" />
//         Sign up with Facebook
//       </Button>
//
//       <Button variant="outline" className="flex items-center justify-center gap-2" onClick={() => setIsEmailForm(true)}>
//         <Mail className="h-4 w-4" />
//         Sign up with email
//       </Button>
//     </div>
//   )
// }
//
