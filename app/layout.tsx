import type { Metadata } from "next";
import { Raleway, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils"
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { createClient } from "@/utils/supabase/server";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { getUser } from "./action";

const raleway = Inter({
  subsets: ["latin"],
  // weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  // style: ['normal']
})
export const metadata: Metadata = {
  title: "Devvyx",
  description: "Number 1 hub for React devs and talent experts",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient()

  const user = await getUser()
  const isLoggedIn = Boolean(user)



  return (
    <html lang="en" className={GeistSans.className}
      // style={{
      //   fontFamily: raleway.style.fontFamily
      // }}
    >
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",

      )}>
         <a className='sr-only' href="https://jobby.ge"></a>
        <Navbar isLoggedIn={isLoggedIn}  />
        <main className="min-h-screen flex">
          {children}
        </main>
        <Toaster />
        <Footer />
      </body>
    </html>
  );
}
