
import ChooseType from '@/components/sections/signup/ChooseType'
import { AccountTypeT } from '@/types/general'
import { BriefcaseBusiness, UserRoundSearch } from 'lucide-react'
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
import { createClient } from '@/utils/supabase/server'
import { z } from 'zod'
import { SigninSchema, SignupSchema } from '@/utils/form/schemas'
import { useFormState, useFormStatus } from 'react-dom'
import { signin } from './action'
import Loading from '@/app/dashboard/loading'
import SigninView from './_components/view'
import { getUser } from '@/app/action'
import { redirect } from 'next/navigation'


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

const Signin = async () => {
    const user = await getUser()

    if (user) redirect('/dashboard/general')


    return (
        < >
            <SigninView />
        </ >
    )
}

export default Signin