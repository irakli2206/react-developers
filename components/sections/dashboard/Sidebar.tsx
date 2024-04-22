'use client'

import React, { useEffect, useState } from 'react'
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
    Bookmark
} from "lucide-react"
import { Badge } from "@/components/ui/badge"

import BecomeEmployerOffer from "@/components/sections/dashboard/BecomeEmployerOffer"
import { redirect, usePathname } from "next/navigation"
import classNames from 'classnames'
import { Profile, Tables } from '@/types/database.types'
import { getProfileData } from '@/app/action'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { ResizablePanel } from '@/components/ui/resizable'
import * as ResizablePrimitive from "react-resizable-panels"

type Props = React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> & {
    children: React.ReactNode
    withHandle: boolean
}

const ResizablePanelWrapper = ({ children, withHandle, ...props }: Props) => {

    return (
        <>
            <ResizablePanel {...props} className=" bg-muted/40 hidden md:block">
                {children}
            </ResizablePanel>

            <div className='min-w-[100px] md:hidden'>
                {children}
            </div>
        </>

    )
}

const Sidebar = () => {
    const [profile, setProfile] = useState<Profile | null>()
    const path = usePathname()

    useEffect(() => {
        const getProfile = async () => {
            const profileData = await getProfileData()
            setProfile(profileData)
        }
        getProfile()
    }, [])

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
        },
        {
            title: 'Bookmarks',
            href: 'bookmarks',
            isActive: path === '/dashboard/bookmarks',
            icon: <Bookmark className="h-4 w-4" />,
            disabled: true,
            tooltipContent: 'Coming soon'
        }
    ]

    return (
        <ResizablePanel minSize={5} defaultSize={15} maxSize={20} className=" bg-muted/40 ">
            <div className="flex h-full max-h-screen flex-col pt-4">

                <div className="flex-1">
                    <nav className="grid items-start px-2 text-[0px] sm:text-sm font-medium lg:px-4">
                        {tabs.map(({ isActive, href, icon, title, tooltipContent, disabled }) => (
                            <TooltipProvider key={title}>
                                <Tooltip>
                                    <TooltipTrigger className={classNames('', {
                                        'cursor-not-allowed': disabled
                                    })}>
                                        <Link

                                            href={href}
                                            className={classNames("flex  items-center gap-3 rounded-md px-3 py-2 text-zinc-600 transition-all hover:text-primary", {
                                                'bg-blue-100/60 !text-primary': isActive,
                                                'opacity-50 pointer-events-none': disabled
                                            })}
                                        >
                                            {icon}
                                            {title}
                                        </Link>
                                    </TooltipTrigger>
                                    <TooltipContent hidden={!tooltipContent} side='bottom'>
                                        {tooltipContent}
                                    </TooltipContent>

                                </Tooltip>
                            </TooltipProvider>
                        ))}


                    </nav>
                </div>
                <div className="mt-auto p-4">
                    {
                        profile?.account_type === 'developer' && <BecomeEmployerOffer accountType={profile.account_type} />
                    }

                </div>

            </div>
        </ResizablePanel>
    )
}

export default Sidebar