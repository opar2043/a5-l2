import React from "react";
import { Film, User, TrendingUp, DollarSign } from "lucide-react";
import Link from "next/link";
import { userRoute } from "@/src/app/components/service/users";
import { moviesRoute } from "@/src/app/components/service/movie";

export default async function AdminDashboardPage() {
  // Fetch stats natively on the server
  const usersData = await userRoute.getUsers().catch(() => ([]));
  const moviesData = await moviesRoute.getMovies().catch(() => ([]));
  
  const uList = Array.isArray(usersData) ? usersData : usersData?.data || [];
  const mList = Array.isArray(moviesData) ? moviesData : moviesData?.data || [];
  
  const totalUsers = uList.length;
  const totalMovies = mList.length;

  const stats = [
    { label: "Total Movies", value: totalMovies.toString(), icon: Film, color: "text-[#D96C2C]", bg: "bg-[#D96C2C]/10" },
    { label: "Active Users", value: totalUsers.toString(), icon: User, color: "text-blue-600", bg: "bg-blue-100" },
    { label: "Total Revenue", value: "$45,231", icon: DollarSign, color: "text-emerald-600", bg: "bg-emerald-100" },
    { label: "Trending", value: "+24%", icon: TrendingUp, color: "text-purple-600", bg: "bg-purple-100" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both text-black">
      {/* Header Section */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-black">
          Welcome back, Admin!
        </h1>
        <p className="text-gray-500 text-lg">
          Here is what's happening in your CineVerse catalog today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div 
              key={stat.label} 
              className="bg-white border border-gray-200 rounded-md p-6 shadow-sm hover:border-gray-300 transition-colors duration-300 flex flex-col justify-between"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-md ${stat.bg}`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-black mb-1">{stat.value}</h3>
                <p className="text-gray-500 font-medium">{stat.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions / Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4">
        {/* Main Content Area */}
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-md p-6 shadow-sm min-h-[400px]">
          <h2 className="text-xl font-bold text-black mb-6">Recent Movie Additions</h2>
          <div className="flex flex-col items-center justify-center h-[200px] text-gray-400">
            <Film className="w-12 h-12 mb-4 opacity-50 text-gray-300" />
            <p className="font-medium text-gray-500">You haven't added any movies this week.</p>
          </div>
        </div>

        {/* Sidebar Mini Area */}
        <div className="bg-white border border-gray-200 rounded-md p-6 shadow-sm">
          <h2 className="text-xl font-bold text-black mb-6">Quick Actions</h2>
          <div className="space-y-3">
            <Link href="/dashboard/admin/movies" className="flex items-center gap-3 w-full bg-gray-50 border border-gray-200 hover:bg-gray-100 hover:border-gray-300 text-black p-4 rounded-md transition-colors group">
              <div className="bg-[#D96C2C]/10 text-[#D96C2C] p-2 rounded-md group-hover:scale-110 transition-transform">
                <Film className="w-5 h-5" />
              </div>
              <span className="font-medium">Add New Movie</span>
            </Link>
            <Link href="/dashboard/admin/users" className="flex items-center gap-3 w-full bg-gray-50 border border-gray-200 hover:bg-gray-100 hover:border-gray-300 text-black p-4 rounded-md transition-colors group">
              <div className="bg-blue-100 text-blue-600 p-2 rounded-md group-hover:scale-110 transition-transform">
                <User className="w-5 h-5" />
              </div>
              <span className="font-medium">Manage Users</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
