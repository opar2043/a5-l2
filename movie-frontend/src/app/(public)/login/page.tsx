'use client'
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/src/lib/auth-client";

export default function LoginPage() {

  const router = useRouter();

  async function loginAction(e : any){
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    const users ={
      email,
      password
    }
     console.log(users)

     try {

      const { data, error } = await authClient.signIn.email({
        email: users.email,
        password: users.password,
        callbackURL: "/login"
      });

      if (error) {
        toast.error(error.message || "Failed to sign in");
        return;
      }

      toast.success("User Login successfully");
      router.push("/dashboard/admin");
     } catch (error : any) {
      console.error("Login error:", error);
      toast.error(error.response?.data?.message || error.message || "Something went wrong");
     } 
  }

  return (
    <div className="min-h-screen bg-gray-50 text-black flex justify-center items-center p-4">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-md p-8 shadow-sm">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight mb-2 text-black">Welcome Back</h1>
          <p className="text-gray-500">Sign in to your CineVerse account.</p>
        </div>

        <form onSubmit={loginAction} className="space-y-5">
          {/* Email Field */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Email Address</label>
            <input 
              name="email"
              type="email" 
              required
              placeholder="name@example.com" 
              className="w-full px-3 py-2 bg-white border border-gray-300 text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D96C2C] focus:border-transparent rounded-md"
            />
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">Password</label>
            </div>
            <input 
              name="password"
              type="password" 
              required
              placeholder="••••••••" 
              className="w-full px-3 py-2 bg-white border border-gray-300 text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D96C2C] focus:border-transparent rounded-md"
            />
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className="w-full bg-[#D96C2C] hover:bg-[#b85b25] text-white font-medium py-2.5 rounded-md transition-colors flex justify-center items-center mt-6"
          >
            Sign In
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <Link href="/register" className="text-[#D96C2C] hover:text-[#b85b25] font-medium">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

