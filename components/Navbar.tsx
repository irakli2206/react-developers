'use client'

import React from 'react'
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

type Props = {
    isLoggedIn: boolean
}

const Navbar = ({ isLoggedIn  }: Props) => {
    const pathname = usePathname()
    const router = useRouter()
    const supabase = createClient()

    const handleSignout = async() => {
        await supabase.auth.signOut()
        router.refresh()
    }
 
    return (
        <>
            <header className="fixed w-full  z-50 top-0 flex h-16 items-center border-b border-border/40  backdrop-blur bg-background/60 px-4 md:px-6">
                <div className="container flex">
                    <Sheet>
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
                        <SheetContent side="left">
                            <nav className="grid gap-6 text-lg font-medium">
                                <Link
                                    href="#"
                                    className="flex items-center gap-2 text-lg font-semibold"
                                >
                                    <Package2 className="h-6 w-6" />
                                    <span className="sr-only">Acme Inc</span>
                                </Link>
                                <Link
                                    href="/developers"
                                    className="text-muted-foreground hover:text-foreground"
                                >
                                    Developers
                                </Link>
                                <Link
                                    href="/pricing"
                                    className="text-muted-foreground hover:text-foreground"
                                >
                                    Pricing
                                </Link>

                            </nav>
                        </SheetContent>
                    </Sheet>
                    <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                        <Link
                            href="/"
                            className="flex items-center gap-2 text-lg font-semibold md:text-base"
                        >
                            < FaReact className="h-8 w-8" />

                            <span className="sr-only">Acme Inc</span>
                        </Link>


                    </nav>
                    <div className=" flex gap-8 items-center ml-auto text-sm">
                        <Link
                            href="/developers"
                            className="text-zinc-700 font-medium transition-colors hover:text-foreground"
                        >
                            Developers
                        </Link>
                        <Link
                            href="/pricing"
                            className="text-zinc-700 font-medium transition-colors hover:text-foreground"
                        >
                            Pricing
                        </Link>
                    </div>

                    {isLoggedIn ?
                        <div className="flex items-center gap-4 ml-auto md:gap-2 lg:gap-3">
                            <Button size='sm' className='rounded-full group drop-shadow-sm hover:drop-shadow-none' variant="outline"
                                onClick={() => handleSignout()}
                            >
                                Sign out
                            </Button>
                            <Button size='sm' className='rounded-full group drop-shadow-sm hover:drop-shadow-none p-0' >
                                <Link href="/dashboard" className='flex items-center px-3'>Dashboard <ArrowRight size='16px' className='ml-1' /></Link>

                            </Button>

                        </div>
                        :
                        <div className="flex items-center gap-4 ml-auto md:gap-2 lg:gap-3">
                            <Button asChild size='sm' className='rounded-full group drop-shadow-sm hover:drop-shadow-none' variant="outline">
                                <Link href="/signin">Sign in</Link>
                            </Button>
                            <Button size='sm' className='rounded-full group drop-shadow-sm hover:drop-shadow-none p-0' >
                                <Link href="/signup" className='flex items-center px-3'>Sign up <ArrowRight size='16px' className='ml-1' /></Link>

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