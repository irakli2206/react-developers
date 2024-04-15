'use client'

import { Input } from '@/components/ui/input'
import React, { Suspense, use, useEffect, useState } from 'react'
import { Textarea } from "@/components/ui/textarea"
import { Button } from '@/components/ui/button'
import { useFormState, useFormStatus } from 'react-dom'
import { createClient } from '@/utils/supabase/client'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Check, CheckIcon, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
    Calculator,
    Calendar,
    CreditCard,
    Settings,
    Smile,
    User,
} from "lucide-react"

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command"
import { skills } from '@/data/data'
import Loading from '../loading'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useToast } from '@/components/ui/use-toast'
import { getProfileData } from '@/app/action'

const supabase = createClient()

const General = () => {
    const [loading, setLoading] = useState(true)
    const { toast } = useToast()

    const [profile, setProfile] = useState<any>({})

    const [countryOptions, setCountryOptions] = useState<string[]>([])
    const [skillOptions, setSkillOptions] = useState<string[]>(skills)


    const getProfile = async () => {
        try {
            const formattedProfileData = await getProfileData()
            setProfile(formattedProfileData)
        } finally {
            setLoading(false)
        }

    }

    const getCountryOptions = async () => {
        try {
            const countries = await fetch("https://restcountries.com/v3.1/all?fields=name")
            const countriesData = await countries.json()
            const countryNames = countriesData.map((c: any) => c.name.common).sort((a: any, b: any) => a - b)
            setCountryOptions(countryNames)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getProfile()
        getCountryOptions()

    }, [])


    const handleFieldChange = (value: string, fieldName: keyof typeof profile) => {
        const isFieldArray = Array.isArray(profile[fieldName])
        if (isFieldArray) {
            let uniques = [...profile[fieldName]]
            if (uniques.includes(value)) uniques = uniques.filter(e => e != value)
            else uniques.push(value)
            uniques = Array.from(new Set(uniques))

            setProfile((prevState: any) => ({
                ...prevState,
                [fieldName]: uniques
            }))

        }
        else setProfile((prevState: any) => ({
            ...prevState,
            [fieldName]: value
        }))
    }

    const handleSave = async () => {
        try {
            const { error, status } = await supabase.from('profiles').update(profile).eq('id', profile.id)
            toast({
                title: "Success",
                description: "Your profile details have been updated",
                duration: 3000,
            })
        } catch (e) {
            toast({
                title: "Oops",
                description: JSON.stringify(e),
                duration: 3000,
            })
        }

    }


    if (loading) return <Loading />

    return (

        <div

            className='w-full'>
            <div className="flex justify-between">
                <div className="">
                    <h3 className="text-base font-semibold leading-7 text-gray-900">General Information</h3>
                    <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Before you begin applying, shortly introduce yourself to potential employers</p>
                </div>
                <Button onClick={handleSave} type='submit' size='sm' className='rounded-full mt-auto  '>Save changes</Button>
            </div>
            <div className="mt-4 border-t border-gray-200">
                <dl className="divide-y divide-gray-200">
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
                            value={profile.title}
                            onChange={(e) => handleFieldChange(e.target.value, 'title')}
                        />
                    </div>
                    <div className="px-4 py-5 flex items-center sm:gap-4 sm:px-0">
                        <div className='flex flex-col gap-1 flex-1 text-sm'>
                            <dt className="  font-medium leading-6 text-gray-900">Country</dt>
                            <dd className="  text-zinc-500 ">Country where you are currently located</dd>
                        </div>
                        <Select  >
                            <SelectTrigger className='flex-1 h-9 drop-shadow-sm' >
                                <SelectValue placeholder={profile.country ? profile.country : "Select country"} />
                            </SelectTrigger>
                            <SelectContent >
                                <Command   >
                                    <CommandInput className='h-9' placeholder="Search" />
                                    <CommandList>
                                        <CommandEmpty  >No results found.</CommandEmpty>
                                        <CommandGroup  >
                                            {countryOptions.map(c => {
                                                const isSelected = profile.country === c
                                                return (
                                                    <CommandItem
                                                        key={c}
                                                        value={c}
                                                        onSelect={(e) => handleFieldChange(e, "country")}
                                                        className='justify-between'
                                                    >

                                                        <span>{c}</span>
                                                        {isSelected && <Check className="mr-2 h-4 w-4" />}
                                                    </CommandItem>
                                                )
                                            })}

                                        </CommandGroup>

                                    </CommandList>
                                </Command>

                            </SelectContent>
                        </Select>
                        {/* <Input className='flex-1 h-9 drop-shadow-sm' type="text" placeholder="John Doe"
                            value={profile.country}
                            onChange={(e) => handleFieldChange(e.target.value, 'country')}
                        /> */}
                    </div>

                    <div className="px-4 py-5 flex items-center sm:gap-4 sm:px-0">
                        <div className='flex flex-col gap-1 flex-1 text-sm'>
                            <dt className="  font-medium leading-6 text-gray-900">Skills</dt>
                            <dd className="  text-zinc-500 ">Your tech stack</dd>
                        </div>
                        <Select  >
                            <SelectTrigger className='flex-1 h-9 drop-shadow-sm' >
                                <SelectValue placeholder={(profile.skills && profile.skills.length) ? `${profile.skills.length} skills selected` : "Select skills"} />
                            </SelectTrigger>
                            <SelectContent  >
                                <Command  >
                                    <CommandInput className='h-9' placeholder="Search" />
                                    {profile.skills && <CommandList>
                                        <CommandEmpty  >No results found.</CommandEmpty>
                                        <CommandGroup  >
                                            {skillOptions.map(skill => {
                                                const isSelected = profile.skills.includes(skill)
                                                return (
                                                    <CommandItem
                                                        key={skill}
                                                        value={skill}
                                                        onSelect={(e) => handleFieldChange(e, "skills")}
                                                        className='justify-between'
                                                    >

                                                        <span>{skill}</span>
                                                        {isSelected && <Check className="mr-2 h-4 w-4" />}
                                                    </CommandItem>
                                                )
                                            })}

                                        </CommandGroup>

                                    </CommandList>}
                                </Command>

                            </SelectContent>
                        </Select>
                    </div>
                    {/* <div className="px-4 py-5 flex items-center sm:gap-4 sm:px-0">
                            <div className='flex flex-col gap-1 flex-1 text-sm'>
                                <dt className="  font-medium leading-6 text-gray-900">Avatar</dt>
                                <dd className="  text-zinc-500 ">An image to identify you easier</dd>
                            </div>
                            <Input className='flex-1 h-9 drop-shadow-sm' type="text" placeholder="John Doe" />
                        </div> */}
                    <div className="px-4 py-5 flex  sm:gap-4 sm:px-0">
                        <div className='flex flex-col gap-1 flex-1 text-sm'>
                            <dt className="  font-medium leading-6 text-gray-900">Bio</dt>
                            <dd className="  text-zinc-500 ">A few words about you</dd>
                        </div>
                        <Textarea className='flex-1 drop-shadow-sm' placeholder="Tell us about yourself"
                            value={profile.bio || ""}
                            onChange={(e) => handleFieldChange(e.target.value, 'bio')}
                        />
                    </div>
                </dl>
            </div>
        </div>
    )
}

export default General