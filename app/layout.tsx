import type { Metadata } from "next";
import { Raleway } from "next/font/google";
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

const raleway = Raleway({
  subsets: ["latin"],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic']
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
  const queryClient = new QueryClient()

  const { data, error } = await supabase.auth.getUser()
  const isLoggedIn = Boolean(data.user)



  return (
    <html lang="en" className={GeistSans.className}
      // style={{
      //   fontFamily: raleway.style.fontFamily
      // }}
    >
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",

      )}>
        <Navbar isLoggedIn={isLoggedIn}  />
        <main className="min-h-screen">
          {children}
        </main>
        <Toaster />
        <Footer />
      </body>
    </html>
  );
}
