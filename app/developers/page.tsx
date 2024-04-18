'use client'

import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'
import { Check, Minus, Plus, Search } from 'lucide-react'
import React, { useEffect, useState } from 'react'
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import DeveloperList from './_components/DeveloperList'
import { Input } from '@/components/ui/input'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Label } from '@/components/ui/label'
import { useParams, useRouter } from 'next/navigation'
import { ProfileT } from '@/types/general'
import { getProfiles } from '../action'
import classNames from 'classnames'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"


const Developers = () => {
    const [profiles, setProfiles] = useState<ProfileT[] | undefined>()
    const [countryInput, setCountryInput] = useState("")
    const [isRolesExpanded, setIsRolesExpanded] = useState(false)
    const [isCountryExpanded, setIsCountryExpanded] = useState(false)
    const [countryOptions, setCountryOptions] = useState<string[]>([])

    const router = useRouter()
    const params = useParams()

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

    const handleGetProfiles = async () => {
        try {
            const profilesData = await getProfiles()
            setProfiles(profilesData)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getCountryOptions()
        handleGetProfiles()
    }, [])

    const handleSelectCountry = (newCountryInput: string) => {
        if (countryInput === newCountryInput) setCountryInput("")
        else setCountryInput(newCountryInput)
    }


    const handleCardClick = () => {
        console.log(params)
        router.push('?user=sadasdasd')
    }


    return (
        <div>

            <div className='container py-32 min-h-screen '>

                <div className="flex gap-4 ">
                    {/* Filters */}
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger  asChild>
                                <section className={classNames("flex flex-col w-1/4", {
                                    "opacity-50 [&>*]:pointer-events-none cursor-not-allowed": true
                                })}>
                                    <Separator className='mb-6' />
                                    <div className="role-levels flex flex-col gap-2">
                                        <div className="flex justify-between text-zinc-500">
                                            <p className='text-sm font-medium'>Role levels</p>
                                            <Minus width={20} className='cursor-pointer' />

                                        </div>
                                        <div className="flex mt-2 gap-2 items-center space-x-2">

                                            <Checkbox id="junior"
                                            />
                                            <label
                                                htmlFor="junior"
                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            >
                                                Junior
                                            </label>
                                        </div>
                                        <div className="flex mt-2 gap-2 items-center space-x-2">

                                            <Checkbox id="mid"
                                            />
                                            <label
                                                htmlFor="mid"
                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            >
                                                Mid
                                            </label>
                                        </div>
                                        <div className="flex mt-2 gap-2 items-center space-x-2">

                                            <Checkbox id="senior"
                                            />
                                            <label
                                                htmlFor="senior"
                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            >
                                                Senior
                                            </label>
                                        </div>
                                    </div>
                                    <Separator className='my-6' />

                                    <div className="flex justify-between  text-zinc-500">
                                        <p className='text-sm font-medium'>Country</p>
                                        <Minus width={20} className='cursor-pointer' />

                                    </div>
                                    <div className="px-4 py-5 flex items-center sm:gap-4 sm:px-0">

                                        <Select  >
                                            <SelectTrigger className='flex-1 h-9 drop-shadow-sm' >
                                                {/* <SelectValue placeholder={profile.country ? profile.country : "Select country"} /> */}
                                                <SelectValue placeholder={countryInput || "Select country"} />
                                            </SelectTrigger>
                                            <SelectContent >
                                                <Command   >
                                                    <CommandInput className='h-9' placeholder="Search" />
                                                    <CommandList>
                                                        <CommandEmpty  >No results found.</CommandEmpty>
                                                        <CommandGroup  >
                                                            {countryOptions.map(c => {
                                                                // const isSelected = profile.country === c
                                                                const isSelected = countryInput === c
                                                                return (
                                                                    <CommandItem
                                                                        key={c}
                                                                        value={c}
                                                                        onSelect={(e) => handleSelectCountry(e)}
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
                                </section>
                            </TooltipTrigger>
                            <TooltipContent >
                                <p>Become an employer to access search filters</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <section className="flex flex-col gap-4 w-3/4">
                        <div className='flex-1 relative max-w-[300px]'>
                            <Input className='pl-10 h-9 drop-shadow-sm relative z-50 bg-transparent' type="text" placeholder="Search"
                            // value={profile[name as keyof ProfileT] as string}
                            // //@ts-ignore
                            // onChange={(e) => setProfile(prevState => ({ ...prevState, [name]: e.target.value }))}
                            />
                            <Search className='absolute top-2.5 left-4 w-4 h-4 text-zinc-400 fill-gray-200' />
                        </div>
                        {profiles ?
                            <DeveloperList profilesData={profiles} onCardClick={() => handleCardClick()} />
                            :
                            null
                        }
                    </section>
                </div>
            </div>


        </div>
    )
}

export default Developers