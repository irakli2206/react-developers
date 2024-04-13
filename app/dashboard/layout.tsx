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


type Props = {
  children: React.ReactNode
}

const DashboardLayout = ({ children }: Props) => {
  return (
    <div className='min-h-screen h-screen flex w-full pt-[64px]'>
      <Sidebar />
      <div className="p-8 w-full flex justify-center">
        {children}
      </div>
    </div>
  )
}

export default DashboardLayout