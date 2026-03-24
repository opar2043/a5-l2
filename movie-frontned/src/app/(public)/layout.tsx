import type { Metadata } from "next";
import "../globals.css"
import Navbar from "@/components/Layout/Navbar";
import Footer from "@/components/Layout/Footer";

export const metadata: Metadata = {
  title: "Movies OK",
  description: "Buy Your Ticket",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-full flex flex-col">
        <Navbar />

        {children}
        <Footer />
      </body>
    </html>
  );
}
