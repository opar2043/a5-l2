"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Film,
  LogOut,
  LayoutDashboard,
  PlusCircle,
  Settings,
  User,
  ShieldCheck,
  MessageSquareText,
  Heart,
} from "lucide-react";
import { signOut } from "@/src/lib/auth-client";
import { toast } from "sonner";
import { userRoute } from "../../components/service/users";

interface DashboardSidebarProps {
  user: {
    name?: string;
    email?: string;
    role?: string;
  };
  children: React.ReactNode;
}

export default function DashboardSidebar({
  user,
  children,
}: DashboardSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  // ✅ FIX: handle admin state properly in client component
  const [isAdmin, setIsAdmin] = useState(false);
  console.log(!isAdmin)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const users = await userRoute.getUsers();
        const loginUser = users.find(
          (u: any) => u.email === user.email
        );
        setIsAdmin(loginUser?.role === "ADMIN");
      } catch (error) {
        console.error("Failed to fetch users");
      }
    };

    if (user?.email) {
      fetchUser();
    }
  }, [user?.email]);

  const allLinks = [
    // Admin Links
    {
      name: "Dashboard",
      href: "/dashboard/admin",
      icon: LayoutDashboard,
      adminOnly: true,
    },
    {
      name: "Moderation",
      href: "/dashboard/admin/moderation",
      icon: ShieldCheck,
      adminOnly: true,
    },
    {
      name: "Add Movie",
      href: "/dashboard/admin/movies",
      icon: PlusCircle,
      adminOnly: true,
    },
    {
      name: "All Movies",
      href: "/dashboard/admin/all-movies",
      icon: Film,
      adminOnly: true,
    },
    {
      name: "Users",
      href: "/dashboard/admin/users",
      icon: User,
      adminOnly: true,
    },

    // User Links
    {
      name: "My Reviews",
      href: "/dashboard/user/reviews",
      icon: MessageSquareText,
    },
    {
      name: "Watchlist",
      href: "/dashboard/user/watchlist",
      icon: Heart,
    },
    {
      name: "Settings",
      href: "/dashboard/admin/settings",
      icon: Settings,
    },
  ];

  const sidebarLinks = allLinks.filter(
    (link) => !link.adminOnly || !isAdmin
  );

  const handleLogout = async () => {
    const toastId = toast.loading("Logging out...");
    try {
      await signOut();
      toast.success("Logged out successfully", { id: toastId });
      router.push("/login");
      router.refresh();
    } catch (error) {
      toast.error("Error logging out", { id: toastId });
    }
  };

  return (
    <div className="flex h-screen w-full">
      {/* Sidebar (Desktop) */}
      <aside className="w-64 shrink-0 bg-white border-r border-[#000000]/10 flex flex-col justify-between hidden md:flex">
        <div>
          <div className="h-16 flex items-center px-6 border-b border-[#000000]/10">
            <Link
              href="/"
              className="flex items-center gap-2 text-xl font-bold tracking-tight text-black hover:text-[#D96C2C] transition-colors"
            >
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
                  <Icon
                    className={`w-5 h-5 ${
                      isActive ? "text-[#D96C2C]" : "text-gray-500"
                    }`}
                  />
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
              {user?.name?.charAt(0) || "U"}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-black truncate max-w-[120px]">
                {user?.name || "Viewer"}
              </span>
              <span className="text-xs text-gray-500 truncate max-w-[120px]">
                {user?.email || "user@example.com"}
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

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden bg-gray-50 relative">
        {/* Mobile Header */}
        <header className="h-16 flex items-center justify-between px-6 border-b border-[#000000]/10 bg-white md:hidden">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-lg font-bold text-black"
          >
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
          <div className="mx-auto max-w-6xl w-full">{children}</div>
        </div>
      </main>
    </div>
  );
}