'use client'

import React, { HTMLAttributes, ReactNode, useEffect, useRef, useState } from 'react'
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
    Bookmark,
    RocketIcon,
    UserRoundX
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
import { PanelOnCollapse, PanelOnExpand, PanelOnResize } from 'react-resizable-panels'
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"


type ResizablePanelWrapperProps = {
    children: ReactNode
    className?: string | undefined;
    collapsedSize?: number | undefined;
    collapsible?: boolean | undefined;
    defaultSize?: number | undefined;
    id?: string | undefined;
    maxSize?: number | undefined;
    minSize?: number | undefined;
    onCollapse?: PanelOnCollapse | undefined;
    onExpand?: PanelOnExpand | undefined;
    onResize?: PanelOnResize | undefined;
    order?: number | undefined;
    style?: object | undefined;
    tagName?: keyof HTMLElementTagNameMap | undefined;
}

const ResizablePanelWrapper = ({
    children,
    className,
    ...props
}: ResizablePanelWrapperProps) => {
    return (
        <>
            <ResizablePanel minSize={15} onResize={(e) => { }} defaultSize={17.5} maxSize={20} className="hidden xl:block bg-muted/40 ">
                {children}
            </ResizablePanel>

            {/* <ResizablePanel minSize={15} onResize={(e) => { }} defaultSize={15} maxSize={17.5} className="hidden lg:block xl:hidden bg-muted/40 ">
                {children}
            </ResizablePanel>

            <ResizablePanel minSize={20} onResize={(e) => { }} defaultSize={20} maxSize={25} className="hidden md:block lg:hidden bg-muted/40 ">
                {children}
            </ResizablePanel> */}

            <div className='w-[60px] md:w-1/5 block xl:hidden bg-muted/40 border-r'>
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
            href: '/dashboard/general',
            isActive: path === '/dashboard/general',
            icon: <Home className="h-4 w-4" />
        },
        {
            title: 'Preferences',
            href: '/dashboard/preferences',
            isActive: path === '/dashboard/preferences',
            icon: <Settings2 className="h-4 w-4" />
        },
        {
            title: 'Contacts',
            href: '/dashboard/contacts',
            isActive: path === '/dashboard/contacts',
            icon: <LinkIcon className="h-4 w-4" />
        },
        {
            title: 'Billing',
            href: '/dashboard/billing',
            isActive: path === '/dashboard/billing',
            icon: <ReceiptText className="h-4 w-4" />
        },
        {
            title: 'Bookmarks',
            href: '/dashboard/bookmarks',
            isActive: path === '/dashboard/bookmarks',
            icon: <Bookmark className="h-4 w-4" />,
            disabled: true,
            tooltipContent: 'Coming soon'
        }
    ]



    return (
        <ResizablePanelWrapper>
            <div className="flex w-full h-full flex-col pt-4">

                <div className="flex-1">
                    <nav className="grid items-start px-2 text-[0px] md:text-sm font-medium lg:px-4">
                        {tabs.map(({ isActive, href, icon, title, tooltipContent, disabled }) => (
                            <TooltipProvider key={title}>
                                <Tooltip>
                                    <TooltipTrigger className={classNames('', {
                                        'cursor-not-allowed': disabled
                                    })}>
                                        <Link

                                            href={href}
                                            className={classNames("flex justify-center gap-0 md:justify-start md:gap-3  items-center  rounded-md px-3 py-2 text-zinc-600 transition-all hover:text-primary", {
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
                <div className="mt-auto p-2 lg:p-4 hidden md:flex flex-col gap-4">
                    {
                        (profile?.account_type === 'developer' && !profile?.available) && <Alert variant={'destructive'}>
                            <UserRoundX className="h-4 w-4" />
                            <AlertTitle className='font-semibold'>You're unavailable!</AlertTitle>
                            <AlertDescription>
                                If you want your profile to become public, set your preference settings accordingly.
                            </AlertDescription>
                        </Alert>
                    }

                    {
                        profile?.account_type === 'developer' && <BecomeEmployerOffer accountType={profile.account_type} />
                    }

                </div>

            </div>
        </ResizablePanelWrapper>
    )
}

export default Sidebar