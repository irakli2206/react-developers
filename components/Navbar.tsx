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


const Navbar = () => {
    return (
        <header className="fixed w-full z-50 top-0 flex h-16 items-center gap-4 border-b bg-white/20 backdrop-blur-md px-4 md:px-6">
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
                            href="developers"
                            className="text-muted-foreground hover:text-foreground"
                        >
                            Developers
                        </Link>
                        <Link
                            href="pricing"
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
                    href="developers"
                    className="text-zinc-700 transition-colors hover:text-foreground"
                >
                    Developers
                </Link>
                <Link
                    href="pricing"
                    className="text-zinc-700 transition-colors hover:text-foreground"
                >
                    Pricing
                </Link>
            </div>
            <div className="flex items-center gap-4 ml-auto md:gap-2 lg:gap-3">
                <Button asChild size='sm' className='rounded-full group drop-shadow-sm hover:drop-shadow-none' variant="outline">
                    <Link href="/signin">Sign in</Link>
                </Button>
                <Button size='sm' className='rounded-full group drop-shadow-sm hover:drop-shadow-none p-0' >
                    <Link href="/signup" className='flex items-center px-3'>Sign Up <ArrowRight size='16px' className='ml-1' /></Link>

                </Button>
                {/* <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="secondary" size="icon" className="rounded-full">
                            <CircleUser className="h-5 w-5" />
                            <span className="sr-only">Toggle user menu</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Settings</DropdownMenuItem>
                        <DropdownMenuItem>Support</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Logout</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu> */}
            </div>
        </header>
    )
}

export default Navbar