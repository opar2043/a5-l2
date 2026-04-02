'use client'
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/src/lib/auth-client";

export default function RegisterPage() {
  
  // async function registerAction(formData: FormData) {
  //   "use server";
  //   const name = formData.get("name") as string;
  //   const email = formData.get("email") as string;
  //   const password = formData.get("password") as string;
    
  //   try {
  //     // Direct pass-through to custom backend logic
  //     await api.post("/users", { name, email, password });
  //   } catch (error) {
  //      console.error("Failed to register", error);
  //      // In a production app you'd return the error to the form state
  //   }
    
  //   // Redirect to login upon successful creation
  //   redirect("/login");
  // }

  const router = useRouter();

  async function registerAction(e : any){
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    const users ={
      name,
      email,
      password
    }
     console.log(users)

     try {
      // const res = await api.post("/users", users);
      // console.log(res.data);

      const { data, error } = await authClient.signUp.email({
        email: users.email,
        password: users.password,
        name: users.name,
        callbackURL: "/login"
      });

      if (error) {
        toast.error(error.message || "Failed to register");
        return;
      }

      toast.success("User registered successfully");
      router.push("/login");
     } catch (error : any) {
      console.error("Register error:", error);
      toast.error(error.response?.data?.message || error.message || "Something went wrong");
     } 
  }

  return (
    <div className="min-h-screen bg-gray-50 text-black flex justify-center items-center p-4">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-md p-8 shadow-sm">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight mb-2 text-black">Create an account</h1>
          <p className="text-gray-500">Enter your info to join the CineVerse.</p>
        </div>

        <form onSubmit={registerAction} className="space-y-5">
          {/* Name Field */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Name</label>
            <input 
              name="name"
              required
              placeholder="John Doe" 
              className="w-full px-3 py-2 bg-white border border-gray-300 text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D96C2C] focus:border-transparent rounded-md"
            />
          </div>

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
            <label className="text-sm font-medium text-gray-700">Password</label>
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
            Sign Up
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link href="/login" className="text-[#D96C2C] hover:text-[#b85b25] font-medium">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}

