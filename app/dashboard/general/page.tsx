'use client'

import { Input } from '@/components/ui/input'
import React, { use, useEffect, useState } from 'react'
import { Textarea } from "@/components/ui/textarea"
import { Button } from '@/components/ui/button'
import { useFormState, useFormStatus } from 'react-dom'
import { updateGeneralInfo } from './action'
import { createClient } from '@/utils/supabase/client'

const supabase = createClient()

const General = () => {

    const [profile, setProfile] = useState<any>()

    useEffect(() => {
        const getProfile = async () => {
            const { data: userData, error: userError } = await supabase.auth.getUser()
            const { data: profileData }: any = await supabase.from('profiles').select('*').eq('id', userData.user?.id)

            console.log(userData)
            setProfile(profileData[0])
        }
        getProfile()
    }, [])


    const handleFieldChange = (value: string, fieldName: keyof typeof profile) => {
        setProfile((prevState: any) => ({
            ...prevState,
            [fieldName]: value
        }))
    }

    const handleSave = async() => {
        const {data, error} = await supabase.from('profiles').update(profile).eq('id', profile.id)
        console.log(error)
    }

    return (
        <div className='w-full'>
            <div className="flex justify-between">
                <div className="">
                    <h3 className="text-base font-semibold leading-7 text-gray-900">General Information</h3>
                    <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Before you begin applying, shortly introduce yourself to potential employers</p>
                </div>
                <Button onClick={handleSave} size='sm' className='rounded-full mt-auto  '>Save changes</Button>
            </div>
            <div className="mt-4 border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                    <div className="px-4 py-5 flex items-center sm:gap-4 sm:px-0">
                        <div className='flex flex-col gap-1 flex-1 text-sm'>
                            <dt className="  font-medium leading-6 text-gray-900">Full name</dt>
                            <dd className="  text-zinc-500 ">Your first and last name</dd>
                        </div>
                        <Input className='flex-1 h-9 drop-shadow-sm' type="text" placeholder="John Doe"
                        value={profile.name}
                        onChange={(e) => handleFieldChange(e.target.value, 'name')}
                        />
                    </div>
                    <div className="px-4 py-5 flex items-center sm:gap-4 sm:px-0">
                        <div className='flex flex-col gap-1 flex-1 text-sm'>
                            <dt className="  font-medium leading-6 text-gray-900">Title</dt>
                            <dd className="  text-zinc-500 ">Summary of your occupation/profession</dd>
                        </div>
                        <Input className='flex-1 h-9 drop-shadow-sm' type="text" placeholder="Senior React Developer"
                        // defaultValue={profileData[0].title}
                        />
                    </div>
                    <div className="px-4 py-5 flex items-center sm:gap-4 sm:px-0">
                        <div className='flex flex-col gap-1 flex-1 text-sm'>
                            <dt className="  font-medium leading-6 text-gray-900">Country</dt>
                            <dd className="  text-zinc-500 ">Country where you are currently located</dd>
                        </div>
                        <Input className='flex-1 h-9 drop-shadow-sm' type="text" placeholder="John Doe" />
                    </div>

                    <div className="px-4 py-5 flex items-center sm:gap-4 sm:px-0">
                        <div className='flex flex-col gap-1 flex-1 text-sm'>
                            <dt className="  font-medium leading-6 text-gray-900">Skills</dt>
                            <dd className="  text-zinc-500 ">Your tech stack</dd>
                        </div>
                        <Input className='flex-1 h-9 drop-shadow-sm' type="text" placeholder="John Doe" />
                    </div>
                    <div className="px-4 py-5 flex items-center sm:gap-4 sm:px-0">
                        <div className='flex flex-col gap-1 flex-1 text-sm'>
                            <dt className="  font-medium leading-6 text-gray-900">Avatar</dt>
                            <dd className="  text-zinc-500 ">An image to identify you easier</dd>
                        </div>
                        <Input className='flex-1 h-9 drop-shadow-sm' type="text" placeholder="John Doe" />
                    </div>
                    <div className="px-4 py-5 flex  sm:gap-4 sm:px-0">
                        <div className='flex flex-col gap-1 flex-1 text-sm'>
                            <dt className="  font-medium leading-6 text-gray-900">Bio</dt>
                            <dd className="  text-zinc-500 ">A few words about you</dd>
                        </div>
                        <Textarea className='flex-1 drop-shadow-sm' placeholder="Tell us about yourself" />
                    </div>
                </dl>
            </div>
        </div>
    )
}

export default General