'use client'

import { Input } from '@/components/ui/input'
import React, { useEffect, useState } from 'react'
import { Textarea } from "@/components/ui/textarea"
import { Button } from '@/components/ui/button'
import { LuGithub, LuGitlab, LuLinkedin, LuTwitter, LuGlobe } from "react-icons/lu";
import { CiGlobe } from "react-icons/ci";
import { Globe, Linkedin, Save } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast'
import { clearCache, getProfileData } from '@/app/action'
import { createClient } from '@/utils/supabase/client'
import { Profile } from '@/types/database.types'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

const supabase = createClient()

const contactsData = [
    {
        label: 'LinkedIn',
        name: 'linkedin_url',
        icon: <Linkedin className='absolute top-2.5 left-4 w-4 h-4 text-zinc-400 fill-gray-200 z-50' />,
    },
    {
        label: 'Github',
        name: 'github_url',
        icon: <LuGithub className='absolute top-2.5 left-4 w-4 h-4 text-zinc-400 fill-gray-200 z-50' />,
    },
    {
        label: 'Gitlab',
        name: 'gitlab_url',
        icon: <LuGitlab className='absolute top-2.5 left-4 w-4 h-4 text-zinc-400 fill-gray-200 z-50' />,
    },
    {
        label: 'Website',
        name: 'website_url',
        icon: <Globe className='absolute top-2.5 left-4 w-4 h-4 text-zinc-400 fill-gray-200 z-50' />,
    },
    {
        label: 'Twitter',
        name: 'twitter_url',
        icon: <LuTwitter className='absolute top-2.5 left-4 w-4 h-4 text-zinc-400 fill-gray-200 z-50' />,
    },
]

type Props = {
    profileData: Profile
}

const formSchema = z.object({
    linkedin_url: z.string().url('Invalid URL').optional().or(z.literal('')),
    github_url: z.string().url('Invalid URL').optional().or(z.literal('')),
    gitlab_url: z.string().url('Invalid URL').optional().or(z.literal('')),
    website_url: z.string().url('Invalid URL').optional().or(z.literal('')),
    twitter_url: z.string().url('Invalid URL').optional().or(z.literal('')),
})

export type ContactsFormValues = z.infer<typeof formSchema>

const ContactsView = ({ profileData }: Props) => {
    const [profile, setProfile] = useState(profileData)

    const { toast } = useToast()


    const form = useForm<ContactsFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            linkedin_url: profile.linkedin_url ?? "",
            github_url: profile.github_url ?? "",
            gitlab_url: profile.gitlab_url ?? "",
            website_url: profile.website_url ?? "",
            twitter_url: profile.twitter_url ?? "",
        },
    })


    const isFormSubmitting = form.formState.isSubmitting

    const onSubmit = async (values: ContactsFormValues) => {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
        try {
            const { data, error } = await supabase.from('profiles').update(values).eq('id', profile!.id)
            toast({
                title: "Success",
                description: "Your profile details have been updated",
                duration: 3000,
            })
            if (error) throw Error(error.message)

            clearCache('/')

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
        < Form {...form} >
            <form action={form.handleSubmit(onSubmit) as any} className='w-full'>
                <div className="flex justify-between">
                    <div className="">
                        <h3 className="text-base font-semibold leading-7 text-gray-900">Contact Links</h3>
                        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Make it possible for talent experts to get in touch with you</p>
                    </div>
                    <Button type='submit' size='sm' className='rounded-full mt-auto' >
                        Save changes</Button>
                </div>
                <div className="mt-4 border-t border-gray-200">

                    <dl className="divide-y divide-gray-200">

                        <div className="flex flex-col  divide-y">
                            {contactsData.map(({ icon, label, name }) => {
                                return (
                                    <FormField
                                        control={form.control}
                                        name={name as any}
                                        render={({ field }) => (
                                            <FormItem className='px-4 py-5 flex items-center sm:gap-4 sm:px-0'>
                                                <FormLabel className=' flex-1 text-sm font-medium leading-6 text-gray-900' >{label}</FormLabel>
                                                <div className="flex flex-col gap-1 flex-1 !mt-0">
                                                    <FormControl className='w-full'>

                                                        <div className='relative '>
                                                            <Input className='pl-10 h-9 drop-shadow-sm relative z-50 bg-transparent' type="text" placeholder=""

                                                                //@ts-ignore

                                                                {...field}
                                                            />
                                                            {icon}
                                                        </div>


                                                        {/* <Input
                                                        // id="email"
                                                        // name="email"
                                                        // placeholder="m@example.com"
                                                        // value={email}
                                                        // onChange={(e) => setEmail(e.target.value)}
                                                        {...field}
                                                    /> */}
                                                    </FormControl>
                                                    <FormMessage className='!mt-1 ml-auto' />
                                                </div>
                                            </FormItem>
                                        )}
                                    />
                                )
                            })}

                            {/* {contactsData.map(({ icon, label, name }) => {

                                return (
                                    <div key={name} className="px-4 py-5 flex items-center sm:gap-4 sm:px-0">
                                        <div className='flex flex-col gap-1 flex-1 text-sm'>
                                            <dt className="  font-medium leading-6 text-gray-900">{label}</dt>
                                        </div>
                                        <div className='flex-1 relative'>
                                            <Input className='pl-10 h-9 drop-shadow-sm relative z-50 bg-transparent' type="text" placeholder=""
                                                value={profile[name as keyof Profile] as string}
                                                //@ts-ignore
                                                onChange={(e) => setProfile(prevState => ({ ...prevState, [name]: e.target.value }))}
                                            />
                                            {icon}
                                        </div>
                                    </div>
                                )
                            })} */}
                        </div>




                    </dl>
                </div>
            </form>
        </Form >
    )
}

export default ContactsView