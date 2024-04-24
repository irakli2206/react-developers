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
import { updatePassword } from '../action'


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

const SigninView = () => {
    const [newPassword, setNewPassword] = useState("")
    const handleUpdatePassword = async () => {
        await updatePassword(newPassword)
    }


    return (
        <div className="w-full flex  min-h-full">
            <div className="flex items-center justify-center pb-12 flex-1">
                <div className="mx-auto grid w-[350px] gap-6">
                    <h1 className='text-3xl font-semibold mb-4'>Update your password</h1>

                    <div className="grid gap-2">
                        <Label htmlFor="email">New password</Label>
                        <Input
                            id="password"
                            name="password"
                            type='password'
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        {/* {fieldErrors.email && <p className='text-xs text-destructive'>{fieldErrors.email[0]}</p>} */}
                    </div>

                    <Button onClick={handleUpdatePassword} >
                        Update Password
                    </Button>
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

export default SigninView