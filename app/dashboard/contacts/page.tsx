
import { Input } from '@/components/ui/input'
import React, { Suspense, useEffect, useState } from 'react'
import { Textarea } from "@/components/ui/textarea"
import { Button } from '@/components/ui/button'
import { LuGithub, LuGitlab, LuLinkedin, LuTwitter, LuGlobe } from "react-icons/lu";
import { CiGlobe } from "react-icons/ci";
import { Globe, Linkedin, Save } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast'
import { getProfileData } from '@/app/action'
import ContactsView from './_components/view'


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

const Contacts = async () => {
    const profileData = await getProfileData()


    return (
        < >
            <ContactsView profileData={profileData} />
        </ >
    )
}

export default Contacts