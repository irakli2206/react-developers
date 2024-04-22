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
import Bg from 'public/white-waves.jpg'

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
        <div className="w-full flex  min-h-full relative">
            {/* <div className="absolute w-full h-full top-0 left-0 opcaity-30">
                <div className="absolute w-full h-full bg-blue-400/50"></div>
                <Image
                    src={Bg}
                    alt="Image"
                    width="1920"
                    height="1080"
                    // fill={true}
                    className="h-full w-full opacity-20"
                />
            </div> */}

            <div className="flex items-center justify-center pb-12 flex-1 relative z-50 ">
                <div className="mx-auto grid w-[350px] gap-6 border border-border p-8 box-content rounded-xl bg-white/10 backdrop-blur-lg">
                    <div className="grid gap-4 text-center">
                        <div className="flex flex-col gap-2">
                            <h1 className="text-2xl font-bold ">Sign in</h1>
                            <p className="text-balance text-muted-foreground">
                                Enter your email below to login to your account
                            </p>
                        </div>

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
                                <Link
                                    href="/forgot-password"
                                    className="ml-auto inline-block text-sm underline"
                                >
                                    Forgot your password?
                                </Link>
                            </div>
                            <Input id="password" type="password" name="password" />
                            {fieldErrors.password && <p className='text-xs text-destructive'>{fieldErrors.password[0]}</p>}
                        </div>
                        <Button type="submit" className="w-full" disabled={pending} aria-disabled={pending}>
                            Sign in
                        </Button>
                        {/* <Button variant="outline" className="w-full">
                            Sign in with Google
                        </Button> */}
                    </form>
                    <div className="mt-4 text-center text-sm">
                        Don't have an account?{" "}
                        <Link href="/signup" className="underline">
                            Sign up
                        </Link>
                    </div>
                </div>
            </div>
            {/* <div className="hidden bg-muted lg:block flex-1 ">
                <Image
                    src="/cosmos.png"
                    alt="Image"
                    width="1920"
                    height="1080"
                    // fill={true}
                    className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
            </div> */}
        </div>
    )
}

export default Signin