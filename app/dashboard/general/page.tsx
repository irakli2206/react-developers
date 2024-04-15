'use client'

import { Input } from '@/components/ui/input'
import React, { use, useEffect, useState } from 'react'
import { Textarea } from "@/components/ui/textarea"
import { Button } from '@/components/ui/button'
import { useFormState, useFormStatus } from 'react-dom'
import { updateGeneralInfo } from './action'
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

const supabase = createClient()

const General = () => {

    const [profile, setProfile] = useState<any>({})

    const [countryOptions, setCountryOptions] = useState<string[]>([])

    const getProfile = async () => {
        const { data: userData, error: userError } = await supabase.auth.getUser()
        const { data: profileData }: any = await supabase.from('profiles').select('*').eq('id', userData.user?.id)

        const formattedProfileData = { ...profileData[0] }
        if (!formattedProfileData.skills) formattedProfileData.skills = []

        setProfile(formattedProfileData)
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

    console.log(countryOptions)



    const handleFieldChange = (value: string, fieldName: keyof typeof profile) => {
        const isFieldArray = Array.isArray(profile[fieldName])
        if (isFieldArray) setProfile((prevState: any) => ({
            ...prevState,
            [fieldName]: [...prevState[fieldName], value]
        }))
        else setProfile((prevState: any) => ({
            ...prevState,
            [fieldName]: value
        }))
    }

    const handleSave = async () => {
        const { data, error, status } = await supabase.from('profiles').update(profile).eq('id', profile.id)
        console.log(status)
    }

    console.log(profile)

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
                            value={profile.title}
                            onChange={(e) => handleFieldChange(e.target.value, 'title')}
                        />
                    </div>
                    <div className="px-4 py-5 flex items-center sm:gap-4 sm:px-0">
                        <div className='flex flex-col gap-1 flex-1 text-sm'>
                            <dt className="  font-medium leading-6 text-gray-900">Country</dt>
                            <dd className="  text-zinc-500 ">Country where you are currently located</dd>
                        </div>
                        <Select onValueChange={(e) => handleFieldChange(e, "country")}>
                            <SelectTrigger className='flex-1 h-9 drop-shadow-sm' >
                                <SelectValue placeholder={profile.country ? profile.country : "Select country"} />
                            </SelectTrigger>
                            <SelectContent >
                                <Command  >
                                    <CommandInput className='h-9' placeholder="Type a command or search..." />
                                    <CommandList>
                                        <CommandEmpty  >No results found.</CommandEmpty>
                                        <CommandGroup  >
                                            {countryOptions.map(c => {
                                                const isSelected = profile.country === c
                                                return (
                                                    <CommandItem
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
                        <Popover   >
                            <PopoverTrigger asChild>
                                <button type="button" role="combobox" aria-controls="radix-:R2ejtt7qcq:" aria-expanded="false" aria-autocomplete="none" dir="ltr" data-state="closed" className="flex w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&amp;>span]:line-clamp-1 flex-1 h-9 drop-shadow-sm"><span className='pointer-events-none'>Mayotte</span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-chevron-down h-4 w-4 opacity-50" aria-hidden="true"><path d="m6 9 6 6 6-6"></path></svg></button>
                                {/* <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={open}
                                    className="w-[200px] justify-between"
                                >
                                    {"Select framework..."}
                                    <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button> */}
                            </PopoverTrigger>
                            <PopoverContent className="w-[200px] p-0">
                                <Command>
                                    <CommandInput placeholder="Search framework..." />
                                    <CommandEmpty>No framework found.</CommandEmpty>
                                    <CommandGroup>
                                        {countryOptions && countryOptions.map((framework: string) => (
                                            <CommandItem
                                                key={framework}
                                                value={framework}
                                            // onSelect={(currentValue) => {
                                            //     setValue(currentValue === value ? "" : currentValue)
                                            //     setOpen(false)
                                            // }}
                                            >
                                                <Check
                                                    className={cn(
                                                        "mr-2 h-4 w-4",
                                                        // value === framework.value ? "opacity-100" : "opacity-0"
                                                    )}
                                                />
                                                {framework}
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </Command>
                            </PopoverContent>
                        </Popover>
                        {/* <Select value={profile.country} onValueChange={(e) => handleFieldChange(e, "skills")}>
                            <SelectTrigger className='flex-1 h-9 drop-shadow-sm' >
                                <SelectValue placeholder="Select skills" />
                            </SelectTrigger>
                            <SelectContent >
                                {countryOptions.map(c => {
                                    return <SelectItem value={c} >
                                        {c}
                                    </SelectItem>
                                })}
                            </SelectContent>
                        </Select> */}
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
                        <Textarea className='flex-1 drop-shadow-sm' placeholder="Tell us about yourself"
                            value={profile.bio}
                            onChange={(e) => handleFieldChange(e.target.value, 'bio')}
                        />
                    </div>
                </dl>
            </div>
        </div>
    )
}

export default General