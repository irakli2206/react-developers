'use client'

import ChooseType from '@/components/sections/signup/ChooseType'
import { AccountTypeT } from '@/types/general'
import { BriefcaseBusiness, UserRoundSearch } from 'lucide-react'
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { FaGoogle } from "react-icons/fa";
import Image from "next/image"
import { createClient } from '@/utils/supabase/server'
import { z } from 'zod'
import { SigninSchema, SignupSchema } from '@/utils/form/schemas'
import { useFormState, useFormStatus } from 'react-dom'
import { signin } from './action'


export type ValidationDataT = z.inferFlattenedErrors<
    typeof SigninSchema
// { message: string; errorCode: string }
>

const initialState: { validationData: ValidationDataT } = {
    validationData: {
        formErrors: [],
        fieldErrors: {}
    }
}

const Signin = () => {
    const [state, signinAction] = useFormState(signin, initialState)
    const { pending } = useFormStatus();

    console.log(state.validationData)
    const fieldErrors = state.validationData.fieldErrors


    return (
        <div className="w-full flex  min-h-full">
            <div className="flex items-center justify-center pb-12 flex-1">
                <div className="mx-auto grid w-[350px] gap-6">
                    <div className="grid gap-2 text-center">
                        <h1 className="text-3xl font-bold ">Sign in</h1>
                        <p className="text-balance text-muted-foreground">
                            Enter your email below to login to your account
                        </p>
                    </div>
                    <form action={signinAction} className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                placeholder="m@example.com"
                            />
                            {fieldErrors.email && <p className='text-xs text-destructive'>{fieldErrors.email[0]}</p>}
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">Password</Label>
                                <Button variant='link' asChild className='p-0 h-fit'>
                                    <Link
                                        href="/forgot-password"
                                        className="ml-auto text-sm "
                                    >
                                        Forgot your password?
                                    </Link>
                                </Button>

                            </div>
                            <Input id="password" type="password" name="password" />
                            {fieldErrors.password && <p className='text-xs text-destructive'>{fieldErrors.password[0]}</p>}
                        </div>
                        <Button type="submit" className="w-full" disabled={pending} aria-disabled={pending}>
                            Sign in
                        </Button>
                        <Button variant="outline" className="w-full">
                            Sign in with Google
                        </Button>
                    </form>
                    <div className=" text-center text-sm">
                        Don't have an account?{" "}
                        <Button variant='link' className='p-0 h-fit' asChild>
                            <Link href="/signup" >
                                Sign up
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
            <div className="hidden lg:flex flex-col justify-center gap-16 flex-1 bg-gradient-to-b from-blue-100/80 via-red-50 to-white overflow-hidden rounded-tl-[7.5%]">
                <div className="flex flex-col gap-4 min-w-[300px] w-3/4 mx-auto pt-16">
                    <p className='font-semibold text-xl'>Thanks to ReactDevelopers, we've spared ourselves hours of sorting through numerous unqualified or below-par candidates.</p>
                    <p className="text-gray-500 font-medium ">- Sneed's Feed and Seed</p>
                </div>

                <div className="relative w-full h-full  ">
                    <Image
                        src="/stripe-2.png"
                        alt=""
                        // sizes="(max-width: 1200px) 100vw, 80vw"
                        height={500}
                        width={1200}
                        quality={100}
                        priority
                        className="absolute  rounded-xl right-0 top-0 drop-shadow-lg translate-x-[12%]"
                    />

                </div>


            </div>
  
            {/* <div className="hidden lg:flex flex-col justify-center gap-16 flex-1 bg-gradient-to-b from-gray-100/80 to-white  overflow-hidden ">

                <div className="flex flex-col gap-4 min-w-[300px] w-3/4 mx-auto pt-16">
                    <p className='font-semibold text-xl'>Thanks to ReactDevelopers, we've spared ourselves hours of sorting through numerous unqualified or below-par candidates.</p>
                    <p className="text-gray-500 font-medium ">- Sneed's Feed and Seed</p>
                </div>

                <div className="relative w-full h-full  ">
                    <Image
                        src="/stripe-2.png"
                        alt=""
                        // sizes="(max-width: 1200px) 100vw, 80vw"
                        height={500}
                        width={1200}
                        quality={100}
                        priority
                        className="absolute  rounded-xl right-0 top-0 drop-shadow-lg translate-x-[12%]"
                    />

                </div>


            </div> */}
        </div>
    )
}

export default Signin