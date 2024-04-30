'use client'

import React, { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Switch } from "@/components/ui/switch"
import { Separator } from '@/components/ui/separator'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { clearCache, getProfileData } from '@/app/action'
import { createClient } from '@/utils/supabase/client'
import { useToast } from '@/components/ui/use-toast'
import { Profile } from '@/types/database.types'
import { useRouter } from "next/navigation";

const supabase = createClient()

type Props = {
    profileData: Profile
}

const PreferencesView = ({ profileData }: Props) => {
    const [profile, setProfile] = useState<Profile>(profileData)
    const router = useRouter()
    const { toast } = useToast()

    //Make sure every necessary field in general tab is filled
    const allowAvailability = () => {
        if (profile.available) {
            if (
                !profile.avatar ||
                !profile.experience_years ||
                !profile.hourly_rate ||
                !profile.skills ||
                !profile.title || 
                !profile.languages ||
                !profile.languages.length
            ) {
                setProfile({ ...profile, available: false })
                toast({
                    title: "Can't become available",
                    description: `You must fill every field in the general information tab before you can toggle your availability`,
                    duration: 5000
                })
            }
        }

    }

    useEffect(() => {
        allowAvailability()
    }, [profile.available])

    const handleSave = async () => {
        try {
            const { data, error } = await supabase.from('profiles').update(profile).eq('id', profile!.id)
            toast({
                title: "Success",
                description: "Your profile details have been updated",
                duration: 3000,
            })
            clearCache('/dashboard', 'layout')
            window.location.reload()
        } catch (e) {
            toast({
                title: "Oops",
                description: JSON.stringify(e),
                duration: 3000,
            })
        }
    }

    // if (!profile) return <Loading />

    return (
        <div className='w-full '>
            <div className="flex justify-between">
                <div className="">
                    <h3 className="text-base font-semibold leading-7 text-gray-900">Account Preferences</h3>
                    <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">You're available for new opportunities and would like to appear in our listings</p>
                </div>
                <Button onClick={handleSave} size='sm' className='rounded-full mt-auto  '>Save changes</Button>
            </div>

            <div className="mt-4 border-y  border-gray-200">
                <dl className=" grid grid-cols-1 lg:grid-cols-2 gap-x-16  ">
                    <div className="px-4 py-4 flex items-center sm:gap-4 sm:px-0">
                        <div className='flex flex-col gap-1 flex-1 text-sm'>
                            <dt className="  font-medium leading-6 text-gray-900">Available</dt>
                            <dd className="  text-zinc-500 ">Are you open to take job offers?</dd>
                        </div>
                        {/* <Input className='flex-1 h-9 drop-shadow-sm' type="text" placeholder="John Doe" /> */}
                        <Switch
                            name='available'
                            checked={profile.available}
                            onClick={() => setProfile(prevState => ({ ...prevState, available: !prevState.available }))}
                        />
                    </div>
                    <div className="px-4 py-4 flex items-center sm:gap-4 sm:px-0">
                        <div className='flex flex-col gap-1 flex-1 text-sm'>
                            <dt className="  font-medium leading-6 text-gray-900">Freelance contracts</dt>
                            <dd className="  text-zinc-500 ">Are you open to freelance contracts?</dd>
                        </div>
                        {/* <Input className='flex-1 h-9 drop-shadow-sm' type="text" placeholder="John Doe" /> */}
                        <Switch
                            checked={profile.freelance}
                            onClick={() => setProfile(prevState => ({ ...prevState, freelance: !prevState.freelance }))}
                        />
                    </div>
                    <div className="px-4 py-4 flex items-center sm:gap-4 sm:px-0">
                        <div className='flex flex-col gap-1 flex-1 text-sm'>
                            <dt className="  font-medium leading-6 text-gray-900">Employment</dt>
                            <dd className="  text-zinc-500 ">Are you open to employment?</dd>
                        </div>
                        <Switch
                            checked={profile.employment}
                            onClick={() => setProfile(prevState => ({ ...prevState, employment: !prevState.employment }))}
                        />
                    </div>

                    <div className="px-4 py-4 flex items-center sm:gap-4 sm:px-0">
                        <div className='flex flex-col gap-1 flex-1 text-sm'>
                            <dt className="  font-medium leading-6 text-gray-900">Remote</dt>
                            <dd className="  text-zinc-500 ">Are you open to work remotely?</dd>
                        </div>
                        <Switch
                            checked={profile.remote}
                            onClick={() => setProfile(prevState => ({ ...prevState, remote: !prevState.remote }))}
                        />
                    </div>
                    <div className="px-4 py-4 flex items-center sm:gap-4 sm:px-0">
                        <div className='flex flex-col gap-1 flex-1 text-sm'>
                            <dt className="  font-medium leading-6 text-gray-900">On site</dt>
                            <dd className="  text-zinc-500 ">Are you open to work on site?</dd>
                        </div>
                        <Switch

                            checked={profile.on_site}
                            onClick={() => setProfile(prevState => ({ ...prevState, on_site: !prevState.on_site }))}
                        />
                    </div>

                </dl>
            </div>
            <div>
                <dl>
                    <div className=" py-4 flex flex-col gap-6">
                        <div className='flex flex-col gap-1 flex-1 text-sm'>
                            <dt className="  font-medium leading-6 text-gray-900">Role level</dt>
                            <dd className="  text-zinc-500 ">Select seniority levels suitable to you</dd>
                        </div>
                        <div className="flex gap-8">
                            <div className="flex items-center space-x-2">
                                <label
                                    htmlFor="junior"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Junior
                                </label>
                                <Checkbox id="junior"
                                    checked={profile && profile.role_levels ? profile.role_levels!.includes('junior') : false}
                                    onCheckedChange={(e) => setProfile(prevState => {
                                        let newData = { ...prevState }
                                        if (e === true) {
                                            newData.role_levels?.push('junior')
                                        }
                                        else newData.role_levels = newData.role_levels?.filter(rl => rl !== 'junior') as string[] | null
                                        return newData
                                    })}
                                />

                            </div>
                            <div className="flex items-center space-x-2">
                                <label
                                    htmlFor="mid"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Mid
                                </label>
                                <Checkbox id="mid"
                                    checked={profile && profile.role_levels ? profile.role_levels!.includes('mid') : false}
                                    onCheckedChange={(e) => setProfile(prevState => {
                                        let newData = { ...prevState }
                                        if (e === true) {
                                            newData.role_levels?.push('mid')
                                        }
                                        else newData.role_levels = newData.role_levels?.filter(rl => rl !== 'mid') as string[] | null
                                        return newData
                                    })}
                                />

                            </div>
                            <div className="flex items-center space-x-2">
                                <label
                                    htmlFor="senior"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Senior
                                </label>
                                <Checkbox id="senior"
                                    checked={profile && profile.role_levels ? profile.role_levels!.includes('senior') : false}
                                    onCheckedChange={(e) => setProfile(prevState => {
                                        let newData = { ...prevState }
                                        if (e === true) {
                                            newData.role_levels?.push('senior')
                                        }
                                        else newData.role_levels = newData.role_levels?.filter(rl => rl !== 'senior') as string[] | null
                                        return newData
                                    })}
                                />

                            </div>
                        </div>

                    </div>
                </dl>
            </div>
        </div>
    )
}

export default PreferencesView