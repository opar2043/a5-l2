import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import api from "@/src/app/components/service/api";

export default function LoginPage() {

  async function loginAction(formData: FormData) {
    "use server";
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      // Since the custom Express backend doesn't have a /login route yet, 
      // we securely fetch users directly on the Next.js server to verify the login
      const res = await api.get("/users");
      const users = res.data?.data || [];
      
      const user = users.find((u: any) => u.email === email && u.password === password);

      if (user) {
        // Issue secure HTTP-only cookie via Next.js directly
        const cookieStore = await cookies();
        cookieStore.set("auth_session", user.id, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/"
        });
      } else {
        console.error("Invalid credentials.");
        return; // In production return an error string to UI
      }
    } catch (error) {
      console.error("Login verification failed", error);
      return;
    }

    // Success, redirect safely to Admin interface
    redirect("/dashboard/admin");
  }

  return (
    <div className="min-h-screen bg-gray-50 text-black flex justify-center items-center p-4">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-md p-8 shadow-sm">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight mb-2 text-black">Welcome Back</h1>
          <p className="text-gray-500">Sign in to your CineVerse account.</p>
        </div>

        <form action={loginAction} className="space-y-5">
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

