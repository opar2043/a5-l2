"use client";

import DashboardNavigation from "@/components/Layout/DashboardNavigation";
import { useState } from "react";

import { FiMenu } from "react-icons/fi";

const DashboardShell = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white ">
      {/* Mobile Header */}
      <div className="md:hidden flex justify-between items-center p-4 border-b">
        <h2 className="font-semibold text-lg">Dashboard</h2>
        <button onClick={() => setOpen(!open)} className="text-2xl">
          <FiMenu />
        </button>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div
          className={`bg-white border-r w-64 p-4 fixed md:static top-0 left-0 h-full z-50 transform transition-transform duration-300 ${
            open ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0`}
        >
          <DashboardNavigation />
        </div>

        {/* Overlay */}
        {open && (
          <div
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-black/30 md:hidden"
          />
        )}

        {/* Main Content */}
        <div className="flex-1 p-8 md:ml-0">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardShell;