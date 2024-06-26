'use client'

import React, { useEffect, useState } from 'react'
import Link from "next/link"
import { ArrowRight, CircleUser, Menu, MoveRight, Package2, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { FaReact } from "react-icons/fa";
import { ArrowRightIcon } from '@radix-ui/react-icons'
import { usePathname, useRouter } from 'next/navigation'
import Banner from './ui/banner'
import { createClient } from '@/utils/supabase/client'
import { revalidatePath } from 'next/cache'
import classNames from 'classnames'
import { signout } from '@/app/action'
import Image from 'next/image'

type Props = {
    isLoggedIn: boolean
}

const Navbar = ({ isLoggedIn }: Props) => {
    const pathname = usePathname()
    const router = useRouter()
    const supabase = createClient()

    const [isMenuOpen, setIsMenuOpen] = useState(false)

    useEffect(() => {
        setIsMenuOpen(false)
    }, [pathname])

    const handleSignout = async () => {
        await signout()
        window.location.reload()
    }


    return (
        <>
            <header className="fixed w-full  z-[51] top-0 flex h-14 items-center border-b border-border/40  backdrop-blur bg-background/60 px-2 md:px-0">
                <div className="!max-w-7xl w-full mx-auto md:container flex">
                    <Sheet open={isMenuOpen} onOpenChange={(e) => setIsMenuOpen(e)} >
                        <SheetTrigger asChild>
                            <Button
                                variant="outline"
                                size="icon"
                                className="shrink-0 md:hidden"
                            >
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Toggle navigation menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent className='mt-14' side="left">
                            <nav className="grid gap-6 text-lg font-medium">
                                <Link
                                    href="/"
                                    className={classNames("text-muted-foreground hover:text-foreground", {
                                        "text-foreground": pathname.includes('home')
                                    })}
                                >
                                    Home
                                </Link>
                                <Link
                                    href="/developers"
                                    className={classNames("text-muted-foreground hover:text-foreground", {
                                        "text-foreground": pathname.includes('developers')
                                    })}
                                >
                                    Developers
                                </Link>
                                <Link
                                    href="/pricing"
                                    className={classNames("text-muted-foreground hover:text-foreground", {
                                        "text-foreground": pathname.includes('pricing')
                                    })}
                                >
                                    Pricing
                                </Link>
                                <Link
                                    href="/faq"
                                    className={classNames("text-muted-foreground hover:text-foreground", {
                                        "text-foreground": pathname.includes('faq')
                                    })}
                                >
                                    FAQ
                                </Link>
                            </nav>
                        </SheetContent>
                    </Sheet>
                    <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                        <Link
                            href="/"
                            className="flex items-center gap-2 text-lg font-semibold md:text-base"
                        >
                            {/* < FaReact className="h-8 w-8" /> */}
                            <Image
                                src='/logo.svg'
                                alt=''
                                width={200}
                                height={40}
                                className='h-5 w-auto'
                            />
                            <span className="sr-only">Acme Inc</span>
                        </Link>


                    </nav>
                    <div className="hidden md:flex gap-8 items-center ml-auto text-sm">
                        <Link
                            href="/developers"
                            className={classNames("text-zinc-700 font-medium transition-colors hover:text-blue-500", {
                                "!text-blue-600 !font-semibold ": pathname.includes('developers')
                            })}
                        >
                            Developers
                        </Link>
                        <Link
                            href="/pricing"
                            className={classNames("text-zinc-700 font-medium transition-colors hover:text-blue-500", {
                                "!text-blue-600 !font-semibold ": pathname.includes('pricing')
                            })}
                        >
                            Pricing
                        </Link>
                        <Link
                            href="/faq"
                            className={classNames("text-zinc-700 font-medium transition-colors hover:text-blue-500", {
                                "!text-blue-600 !font-semibold ": pathname.includes('faq')
                            })}
                        >
                            FAQ
                        </Link>
                    </div>

                    {isLoggedIn ?
                        <div className="flex items-center gap-4 ml-auto md:gap-2 lg:gap-3">
                            <Button className='rounded-full group drop-shadow-sm hover:drop-shadow-none' variant="outline"
                                onClick={() => handleSignout()}
                            >
                                Sign out
                            </Button>
                            <Button asChild className='rounded-full group drop-shadow-sm hover:drop-shadow-none ' >
                                <Link href="/dashboard/general" className='flex items-center '>Dashboard <ArrowRight size='16px' className='ml-1' /></Link>

                            </Button>

                        </div>
                        :
                        <div className="flex items-center gap-4 ml-auto md:gap-2 lg:gap-3">
                            <Button asChild className='rounded-full group drop-shadow-sm hover:drop-shadow-none ' variant="outline">
                                <Link href="/signin" className=''>Sign in</Link>
                            </Button>
                            <Button asChild className='rounded-full group drop-shadow-sm hover:drop-shadow-none  ' >
                                <Link href="/signup" className='flex items-center '>Sign up <ArrowRight size='16px' className='ml-1' /></Link>

                            </Button>

                        </div>
                    }


                </div>
                {/* <Banner /> */}

            </header>
        </>
    )
}

export default Navbar