'use client'

import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'
import { Check, Minus, Plus } from 'lucide-react'
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


const Developers = () => {
    const [isRolesExpanded, setIsRolesExpanded] = useState()
    const [countryOptions, setCountryOptions] = useState<string[]>([])

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
        getCountryOptions()

    }, [])

    return (
        <div className='container py-32 min-h-screen '>

            <div className="flex gap-4 ">
                {/* Filters */}
                <section className="flex flex-col w-1/4">
                    <Separator className='mb-6' />
                    <div className="role-levels flex flex-col gap-2">
                        <div className="flex justify-between text-zinc-400">
                            <p className='text-sm font-medium'>Role levels</p>
                            <Minus />
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

                    <div className="flex justify-between text-zinc-400">
                        <p className='text-sm font-medium'>Country</p>
                        <Minus />
                    </div>
                    <div className="px-4 py-5 flex items-center sm:gap-4 sm:px-0">
                         
                        <Select  >
                            <SelectTrigger className='flex-1 h-9 drop-shadow-sm' >
                                {/* <SelectValue placeholder={profile.country ? profile.country : "Select country"} /> */}
                                <SelectValue placeholder={ "Select country"} />
                            </SelectTrigger>
                            <SelectContent >
                                <Command   >
                                    <CommandInput className='h-9' placeholder="Search" />
                                    <CommandList>
                                        <CommandEmpty  >No results found.</CommandEmpty>
                                        <CommandGroup  >
                                            {countryOptions.map(c => {
                                                // const isSelected = profile.country === c
                                                const isSelected = true
                                                return (
                                                    <CommandItem
                                                        key={c}
                                                        value={c}
                                                        // onSelect={(e) => handleFieldChange(e, "country")}
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
                <section className="flex flex-col w-3/4">

                </section>
            </div>
        </div>
    )
}

export default Developers