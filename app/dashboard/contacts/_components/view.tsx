'use client'

import { Input } from '@/components/ui/input'
import React, { useEffect, useState } from 'react'
import { Textarea } from "@/components/ui/textarea"
import { Button } from '@/components/ui/button'
import { LuGithub, LuGitlab, LuLinkedin, LuTwitter, LuGlobe } from "react-icons/lu";
import { CiGlobe } from "react-icons/ci";
import { Globe, Linkedin, Save } from 'lucide-react';
import { ProfileT } from '@/types/general';
import { useToast } from '@/components/ui/use-toast'
import { clearCache, getProfileData } from '@/app/action'
import Loading from '../loading'
import { createClient } from '@/utils/supabase/client'
import { Profile } from '@/types/database.types'

const supabase = createClient()

const contactsData = [
    {
        label: 'LinkedIn',
        name: 'linkedin_url',
        icon: <Linkedin className='absolute top-2.5 left-4 w-4 h-4 text-zinc-400 fill-gray-200' />,
    },
    {
        label: 'Github',
        name: 'github_url',
        icon: <LuGithub className='absolute top-2.5 left-4 w-4 h-4 text-zinc-400 fill-gray-200' />,
    },
    {
        label: 'Gitlab',
        name: 'gitlab_url',
        icon: <LuGitlab className='absolute top-2.5 left-4 w-4 h-4 text-zinc-400 fill-gray-200' />,
    },
    {
        label: 'Website',
        name: 'website_url',
        icon: <Globe className='absolute top-2.5 left-4 w-4 h-4 text-zinc-400 fill-gray-200' />,
    },
    {
        label: 'Twitter',
        name: 'twitter_url',
        icon: <LuTwitter className='absolute top-2.5 left-4 w-4 h-4 text-zinc-400 fill-gray-200' />,
    },
]

type Props = {
    profileData: Profile
}

const ContactsView = ({profileData}: Props) => {
    const [profile, setProfile] = useState(profileData)

    const { toast } = useToast()

 

    const handleSave = async () => {
        try {
            const { data, error } = await supabase.from('profiles').update(profile).eq('id', profile!.id)
            toast({
                title: "Success",
                description: "Your profile details have been updated",
                duration: 3000,
            })
            clearCache('/')
        } catch (e) {
            toast({
                title: "Oops",
                description: JSON.stringify(e),
                duration: 3000,
            })
        }
    }
 


    return (
        <div className='w-full'>
            <div className="flex justify-between">
                <div className="">
                    <h3 className="text-base font-semibold leading-7 text-gray-900">Contact Links</h3>
                    <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Make it easier for talent experts to get in touch with you</p>
                </div>
                <Button size='sm' className='rounded-full mt-auto' onClick={handleSave}>
                    Save changes</Button>
            </div>
            <div className="mt-4 border-t border-gray-200">

                <dl className="divide-y divide-gray-200">
                    {contactsData.map(({ icon, label, name }) => {

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
                    })}


                </dl>
            </div>
        </div>
    )
}

export default ContactsView