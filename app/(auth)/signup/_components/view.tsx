'use client'

import ChooseType from '@/components/sections/signup/ChooseType'
import { AccountTypeT } from '@/types/general'
import { BriefcaseBusiness, Info, UserRoundSearch } from 'lucide-react'
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
import { useRouter, useSearchParams } from 'next/navigation'
import { useFormState, useFormStatus } from 'react-dom'
import { z } from 'zod'
import { SignupSchema } from '@/utils/form/schemas'
import { signup } from '../action'

export type ValidationDataT = z.inferFlattenedErrors<
    typeof SignupSchema
// { message: string; errorCode: string }
>

const initialState: { validationData: ValidationDataT } = {
    validationData: {
        formErrors: [],
        fieldErrors: {}
    }
}



const SignupView = () => {
    const [state, signupAction] = useFormState(signup, initialState)
    const { pending } = useFormStatus();
    const params = useSearchParams()
    const isAskAuthVisible = params.get('ask_auth')

    console.log('state', state.validationData)
    const fieldErrors = state.validationData.fieldErrors

    return (
        <div className="w-full flex  min-h-full">
            <div className="flex items-center justify-center pb-24 flex-1">
                <div className="mx-auto grid w-[350px] gap-6">
                    {isAskAuthVisible === 'true' &&
                        <div className='border border-blue-200 p-4 bg-blue-50 rounded-lg flex gap-4'>
                            <div>
                                <Info width={20} className='text-blue-500 fill-blue-100' />
                            </div>
                            <div className="flex flex-col">
                                <p className="font-medium mb-1">Please sign up first</p>
                                <p className="text-sm">We're thrilled that you're interested in becoming an employer! To proceed, kindly sign in or create an account.</p>
                            </div>
                        </div>}


                    <div className="grid gap-2 text-center">
                        <h1 className="text-3xl font-bold ">Sign up</h1>
                        <p className="text-balance text-muted-foreground">
                            Enter your information to create an account
                        </p>
                    </div>
                    <form
                        action={signupAction}
                        className="grid gap-4">
                        <div className='flex gap-4'>
                            <div className="flex flex-col flex-1 gap-1">
                                <Label htmlFor="firstname" className='mb-1'>First name</Label>
                                <Input
                                    id="first_name"
                                    name="first_name"
                                    type="text"
                                    placeholder="John"
                                />
                                {fieldErrors?.first_name && <p className='text-xs text-destructive'>{fieldErrors.first_name[0]}</p>}
                            </div>
                            <div className="flex flex-col flex-1 gap-1">
                                <Label htmlFor="lastname" className='mb-1'>Last name</Label>
                                <Input
                                    id="last_name"
                                    name="last_name"
                                    type="text"
                                    placeholder="Doe"
                                />
                                {fieldErrors?.last_name && <p className='text-xs text-destructive'>{fieldErrors.last_name[0]}</p>}
                            </div>
                        </div>
                        <div className="grid gap-1">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                placeholder="m@example.com"
                            />
                            {fieldErrors?.email && <p className='text-xs text-destructive'>{fieldErrors.email[0]}</p>}
                        </div>
                        <div className="grid gap-1">
                            <div className="flex items-center">
                                <Label htmlFor="password" className='mb-1'>Password</Label>

                            </div>
                            <Input id="password" type="password" name="password" />
                            {fieldErrors?.password && <p className='text-xs text-destructive'>{fieldErrors.password[0]}</p>}
                        </div>
                        <Button type="submit" className="w-full" disabled={pending} aria-disabled={pending}
                        // onClick={() => router.push('/dashboard')}
                        >
                            Sign up
                        </Button>
                        <Button variant="outline" className="w-full">
                            Sign up with Google
                        </Button>
                    </form>
                    <div className="mt-4 text-center text-sm">
                        Already have an account?{" "}

                        <Button variant='link' className='p-0 h-fit' asChild>
                            <Link href="/signin" >
                                Sign in
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
        </div>
    )
}

export default SignupView