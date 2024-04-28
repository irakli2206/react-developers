
import ChooseType from '@/components/sections/signup/ChooseType'
import { AccountTypeT } from '@/types/general'
import { BriefcaseBusiness, Info, UserRoundSearch } from 'lucide-react'
import React, { Suspense, useState } from 'react'
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
import { redirect, useRouter, useSearchParams } from 'next/navigation'
import { useFormState, useFormStatus } from 'react-dom'
import { signup } from './action'
import { z } from 'zod'
import { SignupSchema } from '@/utils/schemas'
import Loading from '@/app/dashboard/loading'
import SignupView from './_components/view'
import { getUser } from '@/app/action'

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

const Signup = async () => {
    const user = await getUser()

    if (user) redirect('/dashboard/general')

    return (
        < >
            <SignupView />
        </ >
    )
}

export default Signup