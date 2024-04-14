import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils"
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { createClient } from "@/utils/supabase/server";
import { signout } from "./action";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})
export const metadata: Metadata = {
  title: "React Developers",
  description: "Number 1 hub for React devs and talent experts",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createClient()
  const { data, error } = await supabase.auth.getUser()
  const isLoggedIn = Boolean(data.user)


  return (
    <html lang="en" className={GeistSans.className}>
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",

      )}>
        <Navbar isLoggedIn={isLoggedIn} signout={signout} />
        <div className="min-h-screen">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
