'use client'

import ChooseType from '@/components/sections/signup/ChooseType'
import { AccountTypeT } from '@/types/general'
import { BriefcaseBusiness, Info, RefreshCw, UserRoundSearch } from 'lucide-react'
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
import { SignupSchema } from '@/utils/schemas'
import { signup } from '../action'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { useToast } from '@/components/ui/use-toast'


const formSchema = z.object({
    firstName: z.string().min(1, "Required field"),
    lastName: z.string().min(1, "Required field"),
    email: z.string().min(1, "Required field").email(),
    password: z.string().min(1, "Required field")
})

export type SignupFormValues = z.infer<typeof formSchema>

const SignupView = () => {

    const params = useSearchParams()
    const isAskAuthVisible = params.get('ask_auth')

    const form = useForm<SignupFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: ""
        },
    })

    const isFormSubmitting = form.formState.isSubmitting

    const { toast } = useToast()



    const onSubmit = async (values: SignupFormValues) => {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        try {
            let data = await signup(values)
            if (data && data.error) throw Error(data.error)
        } catch (e: any) {
            toast({
                title: "Error",
                description: e.message,
                duration: 5000,
                variant: 'destructive'
            })
        }

    }

    return (
        <div className="w-full flex  min-h-full">
            <div className="flex items-center justify-center pb-24 flex-1">
                <div className="mx-auto grid md:w-[350px] px-2 sm:px-0 gap-6">
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
                    < Form {...form} >
                        <form action={form.handleSubmit(onSubmit) as any} className="flex flex-col gap-2">
                            <div className="flex gap-4">
                                <FormField
                                    control={form.control}
                                    name="firstName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className='!text-black ' >First name</FormLabel>
                                            <FormControl className='!mt-1'>
                                                <Input
                                                    placeholder='John'
                                                    // id="email"
                                                    // name="email"
                                                    // placeholder="m@example.com"
                                                    // value={email}
                                                    // onChange={(e) => setEmail(e.target.value)}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage className='!mt-1' />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="lastName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className='!text-black ' >Last name</FormLabel>
                                            <FormControl className='!mt-1'>
                                                <Input
                                                    placeholder='Doe'
                                                    // id="email"
                                                    // name="email"
                                                    // placeholder="m@example.com"
                                                    // value={email}
                                                    // onChange={(e) => setEmail(e.target.value)}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage className='!mt-1' />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className='!text-black ' >Email</FormLabel>
                                        <FormControl className='!mt-1'>
                                            <Input
                                                placeholder='johndoe@gmail.com'
                                                // id="email"
                                                // name="email"
                                                // placeholder="m@example.com"
                                                // value={email}
                                                // onChange={(e) => setEmail(e.target.value)}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className='!mt-1' />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem >
                                        <FormLabel className='!text-black ' >Password</FormLabel>
                                        <FormControl className='!mt-1'>
                                            <Input
                                                type='password'
                                                // id="email"
                                                // name="email"
                                                // placeholder="m@example.com"
                                                // value={email}
                                                // onChange={(e) => setEmail(e.target.value)}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className='!mt-1' />
                                    </FormItem>
                                )}
                            />

                            <Button disabled={isFormSubmitting} type="submit" className="w-full mt-2" >
                            {isFormSubmitting && <RefreshCw className="mr-2 h-4 w-4 animate-spin" />}
                                Sign up
                            </Button>
                        </form>
                    </Form>

                    <div className=" text-center text-sm">
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
                    <p className='font-semibold text-xl'>Thanks to ReactFind, we've spared ourselves hours of sorting through numerous unqualified or below-par candidates.</p>
                    <p className="text-gray-500 font-medium ">- Ancestral Whispers, our first customer</p>
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