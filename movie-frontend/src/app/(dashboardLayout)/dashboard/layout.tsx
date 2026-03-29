"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Film, LogOut, LayoutDashboard, PlusCircle, Settings, User } from "lucide-react";
import { signOut, useSession } from "@/src/lib/auth-client";
import { toast } from "sonner";
import "../../globals.css";

const sidebarLinks = [
  { name: "Dashboard", href: "/dashboard/admin", icon: LayoutDashboard },
  { name: "Add Movie", href: "/dashboard/admin/movies", icon: PlusCircle },
  { name: "All Movies", href: "/dashboard/admin/all-movies", icon: Film },
  { name: "Users", href: "/dashboard/admin/users", icon: User },
  { name: "Settings", href: "/dashboard/admin/settings", icon: Settings },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const handleLogout = async () => {
    const toastId = toast.loading("Logging out...");
    try {
      await signOut();
      toast.success("Logged out successfully", { id: toastId });
      router.push("/login");
    } catch (error) {
      toast.error("Error logging out", { id: toastId });
    }
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className="bg-white text-black min-h-screen font-sans antialiased overflow-hidden">
        <div className="flex h-screen w-full">
          {/* Sidebar */}
          <aside className="w-64 flex-shrink-0 bg-white border-r border-[#000000]/10 flex flex-col justify-between hidden md:flex">
            <div>
              <div className="h-16 flex items-center px-6 border-b border-[#000000]/10">
                <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-tight text-black hover:text-[#D96C2C] transition-colors">
                  <Film className="w-6 h-6 text-[#D96C2C]" />
                  CineVerse
                </Link>
              </div>
              
              <nav className="p-4 space-y-1">
                {sidebarLinks.map((link) => {
                  const isActive = pathname === link.href;
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-md transition-all font-medium text-sm ${
                        isActive
                          ? "bg-[#D96C2C]/10 text-[#D96C2C]"
                          : "text-gray-600 hover:bg-gray-100 hover:text-black"
                      }`}
                    >
                      <Icon className={`w-5 h-5 ${isActive ? "text-[#D96C2C]" : "text-gray-500"}`} />
                      {link.name}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* User Info & Logout */}
            <div className="p-4 border-t border-[#000000]/10">
              <div className="flex items-center gap-3 px-3 py-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-[#D96C2C] flex items-center justify-center font-bold text-white shadow-sm">
                  {isPending ? "?" : session?.user?.name?.charAt(0) || "U"}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-black truncate max-w-[120px]">
                    {isPending ? "Loading..." : session?.user?.name || "Admin User"}
                  </span>
                  <span className="text-xs text-gray-500 truncate max-w-[120px]">
                    {session?.user?.email || "admin@example.com"}
                  </span>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md transition-colors"
              >
                <LogOut className="w-5 h-5 text-red-600" />
                Sign Out
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 flex flex-col overflow-hidden bg-gray-50 relative">
            <header className="h-16 flex items-center justify-between px-6 border-b border-[#000000]/10 bg-white md:hidden">
              <Link href="/dashboard/admin" className="flex items-center gap-2 text-lg font-bold text-black">
                <Film className="w-5 h-5 text-[#D96C2C]" />
                CineVerse
              </Link>
              <button
                onClick={handleLogout}
                className="text-red-600 hover:text-red-500 transition-colors"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </header>

            {/* Scrollable Content Area */}
            <div className="flex-1 overflow-y-auto p-4 md:p-8">
              <div className="mx-auto max-w-6xl w-full">
                {children}
              </div>
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}