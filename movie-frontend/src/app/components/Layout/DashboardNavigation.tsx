"use client";

import Link from "next/link";
import { ElementType } from "react";
import { AiFillShopping as OrderIcon } from "react-icons/ai";
import { MdPerson2 as ProfileIcon } from "react-icons/md";
import { MdOutlineRateReview as ReviewIcon } from "react-icons/md";
import { IoMdHome as HomeIcon } from "react-icons/io";
import { GiShoppingBag as AllOrdersIcon } from "react-icons/gi";
import { MdInventory as StockIcon } from "react-icons/md";

// ✅ Match Prisma Role
type Role = "ADMIN" | "USER";

const DashboardNavigation = () => {
  // 🔥 Replace with real session later
  const user = { role: "ADMIN" as Role };

  return (
    <div className="space-y-4">
      {user.role === "USER" && <UserNavigation />}
      {user.role === "ADMIN" && <AdminNavigation />}
    </div>
  );
};


// ✅ USER (Customer)
const UserNavigation = () => (
  <>
    <Navigator route="/" Icon={HomeIcon} label="Home" />
    <Navigator route="/dashboard/user/my-orders" Icon={OrderIcon} label="My Orders" />
    <Navigator route="/dashboard/user/my-reviews" Icon={ReviewIcon} label="My Reviews" />
    <Navigator route="/dashboard/user/profile" Icon={ProfileIcon} label="Profile" />
  </>
);


// ✅ ADMIN
const AdminNavigation = () => (
  <>
    <Navigator route="/" Icon={HomeIcon} label="Home" />
    <Navigator route="/dashboard/admin/movies" Icon={StockIcon} label="Manage Movies" />
    <Navigator route="/dashboard/admin/reviews" Icon={ReviewIcon} label="Manage Reviews" />
    <Navigator route="/dashboard/admin/users" Icon={AllOrdersIcon} label="All Users" />
    <Navigator route="/dashboard/admin/profile" Icon={ProfileIcon} label="Profile" />
  </>
);


// ✅ Reusable Navigator
const Navigator = ({
  route,
  Icon,
  label,
}: {
  route: string;
  Icon: ElementType;
  label: string;
}) => {
  return (
    <Link
      href={route}
      className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-primary/10 transition-all group"
    >
      <Icon className="text-xl group-hover:translate-x-1 transition" />
      <span className="text-sm font-medium">{label}</span>
    </Link>
  );
};

export default DashboardNavigation;