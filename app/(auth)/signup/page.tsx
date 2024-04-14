'use client'

import ChooseType from '@/components/sections/signup/ChooseType'
import { AccountType } from '@/types/general'
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
import { useRouter } from 'next/navigation'
import { useFormState, useFormStatus } from 'react-dom'
import { signup } from './action'
import { z } from 'zod'
import { SignupSchema } from '@/utils/form/schemas'

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

const Signup = () => {
    const [wizardStep, setWizardStep] = useState(0)
    const [accountType, setAccountType] = useState<AccountType | null>(null)
    const [state, signupAction] = useFormState(signup, initialState)
    const { pending } = useFormStatus();
    const router = useRouter()

    console.log('state', state.validationData)
    const fieldErrors = state.validationData.fieldErrors

    return (
        <div className="w-full flex  min-h-full">
            <div className="flex items-center justify-center pb-24 flex-1">
                <div className="mx-auto grid w-[350px] gap-6">
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
                                <Link
                                    href="/forgot-password"
                                    className="ml-auto inline-block text-sm underline"
                                >
                                    Forgot your password?
                                </Link>
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
                            Sign in with Google
                        </Button>
                    </form>
                    <div className="mt-4 text-center text-sm">
                        Already have an account?{" "}
                        <Link href="signin" className="underline">
                            Sign in
                        </Link>
                    </div>
                </div>
            </div>
            <div className="hidden bg-muted lg:block flex-1 ">
                <Image
                    src="/cosmos.png"
                    alt="Image"
                    width="1920"
                    height="1080"
                    // fill={true}
                    className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
            </div>
        </div>
    )
}

export default Signup