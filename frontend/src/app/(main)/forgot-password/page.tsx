"use client"

import Link from "next/link"
import { ArrowLeft, Mail } from 'lucide-react'
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ForgotPasswordPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate form submission
    setIsSubmitted(true)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white">Reset Password</h1>
          <p className="mt-2 text-sm text-white/90">
            {isSubmitted 
              ? "Check your email for reset instructions"
              : "Enter your email to receive reset instructions"
            }
          </p>
        </div>

        <Card className="shadow-2xl bg-black border-gray-700 w-full max-w-sm mx-auto">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-semibold text-center text-white">
              {isSubmitted ? "Email Sent!" : "Forgot Password"}
            </CardTitle>
            <CardDescription className="text-center text-white/90">
              {isSubmitted 
                ? "We've sent password reset instructions to your email address."
                : "No worries! Enter your email and we'll send you reset instructions."
              }
            </CardDescription>
          </CardHeader>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} >
              <CardContent className="mb-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white/90">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    required
                  />
                </div>
              </CardContent>

              <CardFooter className="flex flex-col space-y-4">
                <Button type="submit" className="w-full bg-white text-black hover:bg-gray-100">
                  <Mail className="w-4 h-4 mr-2" />
                  Send Reset Instructions
                </Button>

                <Link 
                  href="/login" 
                  className="flex items-center justify-center text-sm text-blue-400 hover:text-blue-300 hover:underline"
                >
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  Back to Sign In
                </Link>
              </CardFooter>
            </form>
          ) : (
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                  <Mail className="h-6 w-6 text-green-600" />
                </div>
                <p className="text-sm text-gray-300 mb-4">
                  If an account with that email exists, you'll receive password reset instructions shortly.
                </p>
                <p className="text-xs text-gray-400">
                  Didn't receive an email? Check your spam folder or try again.
                </p>
              </div>

              <div className="flex flex-col space-y-3">
                <Button 
                  onClick={() => setIsSubmitted(false)}
                  variant="outline"
                  className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/30"
                >
                  Try Different Email
                </Button>
                
                <Link 
                  href="/login" 
                  className="flex items-center justify-center text-sm text-blue-400 hover:text-blue-300 hover:underline"
                >
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  Back to Sign In
                </Link>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  )
}
