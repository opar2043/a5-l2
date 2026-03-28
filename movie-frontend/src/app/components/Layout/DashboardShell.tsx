"use client";

import DashboardNavigation from "@/src/app/components/Layout/DashboardNavigation";
import { useState } from "react";
import { FiMenu } from "react-icons/fi";

const DashboardShell = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <div
        className={`bg-white border-r w-64 p-4 fixed md:static top-0 left-0 h-full z-50 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <DashboardNavigation />
      </div>

      {/* Overlay (Mobile) */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/30 md:hidden"
        />
      )}

      {/* Main Area */}
      <div className="flex-1 md:ml-64">
        {/* Mobile Header */}
        <div className="md:hidden flex justify-between items-center p-4 border-b bg-white">
          <h2 className="font-semibold text-lg">Dashboard</h2>
          <button onClick={() => setOpen(!open)} className="text-2xl">
            <FiMenu />
          </button>
        </div>

        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export default DashboardShell;