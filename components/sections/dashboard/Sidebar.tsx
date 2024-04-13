'use client'

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
    ReceiptText
} from "lucide-react"
import { Badge } from "@/components/ui/badge"

import BecomeEmployerOffer from "@/components/sections/dashboard/BecomeEmployerOffer"
import { redirect, usePathname } from "next/navigation"
import classNames from 'classnames'


const Sidebar = () => {
    const path = usePathname()

    const tabs = [
        {
            title: 'General',
            href: 'general',
            isActive: path === '/dashboard/general',
            icon: <Home className="h-4 w-4" />
        },
        {
            title: 'Preferences',
            href: 'preferences',
            isActive: path === '/dashboard/preferences',
            icon: <Settings2 className="h-4 w-4" />
        },
        {
            title: 'Contacts',
            href: 'contacts',
            isActive: path === '/dashboard/contacts',
            icon: <LinkIcon className="h-4 w-4" />
        },
        {
            title: 'Billing',
            href: 'billing',
            isActive: path === '/dashboard/billing',
            icon: <ReceiptText className="h-4 w-4" />
        }
    ]

    return (
        <div className="  border-r bg-muted/40 w-1/6 min-w-[250px]  max-w-xs">
            <div className="flex h-full max-h-screen flex-col pt-4">

                <div className="flex-1">
                    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                        {tabs.map(({isActive, href, icon, title}) => (
                            <Link
                                href={href}
                                className={classNames("flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary", {
                                    'bg-muted': isActive
                                })}
                            >
                                {icon}
                                {title}
                            </Link>
                        ))}
 

                    </nav>
                </div>
                <div className="mt-auto p-4">
                    <BecomeEmployerOffer />
                </div>

            </div>
        </div>
    )
}

export default Sidebar