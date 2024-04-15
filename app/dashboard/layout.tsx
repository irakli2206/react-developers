import React from 'react'
import Link from "next/link"
import {
  Bell,
  CircleUser,
  Home,
  Settings2,
  ShoppingCart,
  Users,
  Link as LinkIcon,
  ReceiptText,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"

import BecomeEmployerOffer from "@/components/sections/dashboard/BecomeEmployerOffer"
import { redirect } from "next/navigation"
import Sidebar from '@/components/sections/dashboard/Sidebar'
import { createClient } from '@/utils/supabase/server'


type Props = {
  children: React.ReactNode
}

const DashboardLayout = async ({ children }: Props) => {
  const supabase = createClient()
  const {data, error} = await supabase.auth.getUser()
  const isLoggedIn = Boolean(data.user)

  if(!isLoggedIn) redirect('/signin')

  return (
    <div className='min-h-screen h-screen flex w-full pt-[64px]'>
      <Sidebar />
      <div className="p-8 lg:px-16 lg:py-10 w-full flex relative">
        {children}
      </div>
    </div>
  )
}

export default DashboardLayout