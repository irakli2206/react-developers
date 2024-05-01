'use client'

import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'
import { Check, Minus, Plus, Search, UserSearch } from 'lucide-react'
import React, { useEffect, useMemo, useState } from 'react'
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
import DeveloperList from './DeveloperList'
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
import classNames from 'classnames'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Profile } from '@/types/database.types'
import { getFilteredProfiles } from '@/app/action'
import Link from 'next/link'
import { FaVuejs } from "react-icons/fa";
import { Slider } from '@/components/ui/slider'
import countries from '@/data/countryData.json'
import languages from '@/data/languageData.json'
import { skills } from '@/data/data'
import { FiltersT } from './view'
import countryData from '@/data/countryData.json'

type Props = {
    isEmployer: boolean
    filters: FiltersT
    changeFilter: (filterName: keyof FiltersT, newValue: any) => void
    hourlyRateLabel: number
    setHourlyRateLabel: (e: number) => void
    experienceLabel: number
    setExperienceLabel: (e: number) => void
}

const Filters = ({ isEmployer, filters, changeFilter, hourlyRateLabel, setHourlyRateLabel, experienceLabel, setExperienceLabel }: Props) => {
    const handleSelectCountry = (newCountryInput: string) => {
        if (filters.countryInput === newCountryInput) changeFilter('countryInput', '')
        else changeFilter('countryInput', newCountryInput)
    }


    return (
        <TooltipProvider>
            <Tooltip >
                <TooltipTrigger asChild>
                    <section className={classNames("hidden md:flex flex-col h-fit w-1/4 opacity-100 [&>*]:pointer-events-auto !cursor-allowed sticky top-14", {
                        "!opacity-50 [&>*]:!pointer-events-none cursor-not-allowed ": !isEmployer
                    })}>
                        <div className="flex justify-between  text-muted-foreground">
                            <p className='text-sm font-medium'>Primary skill</p>


                        </div>

                        <div className="px-4 py-3 flex items-center sm:gap-4 sm:px-0">

                            <Select  >
                                <SelectTrigger className='flex-1 h-9 drop-shadow-sm' >
                                    {/* <SelectValue placeholder={profile.country ? profile.country : "Select country"} /> */}
                                    <SelectValue placeholder={filters.countryInput || "Select skill"} />
                                </SelectTrigger>
                                <SelectContent >
                                    <Command   >
                                        <CommandInput className='h-9' placeholder="Search"

                                        />
                                        <CommandList>
                                            <CommandEmpty  >No results found.</CommandEmpty>
                                            <CommandGroup  >
                                                {["React", "Vue.js", "Angular", "Node.js", "Django", "Flask", "Java", ".NET"].map(skill => {
                                                    // const isSelected = profile.country === c
                                                    const isSelected = filters.primarySkill === skill
                                                    return (
                                                        <CommandItem
                                                            key={skill}
                                                            value={skill}
                                                            onSelect={(e) => handleSelectCountry(e)}
                                                            className='justify-between'
                                                        >

                                                            <span>{skill}</span>
                                                            {isSelected && <Check className="mr-2 h-4 w-4" />}
                                                        </CommandItem>
                                                    )
                                                })}

                                            </CommandGroup>

                                        </CommandList>
                                    </Command>

                                </SelectContent>
                            </Select>

                        </div>
                        <Separator className='my-4' />
                        <div className="role-levels flex flex-col gap-2">
                            <div className="flex justify-between text-muted-foreground">
                                <p className='text-sm font-medium'>Role levels</p>


                            </div>

                            <>
                                <div className="flex mt-2 gap-2 items-center space-x-2">

                                    <Checkbox id="junior"
                                        checked={filters.selectedRoles.includes('junior')}
                                        onCheckedChange={(e) => {
                                            if (e === true) {
                                                changeFilter('selectedRoles', [...filters.selectedRoles, 'junior'])

                                            } else changeFilter('selectedRoles', [...filters.selectedRoles].filter(role => role !== 'junior'))
                                        }}
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
                                        checked={filters.selectedRoles.includes('mid')}
                                        onCheckedChange={(e) => {
                                            if (e === true) {
                                                changeFilter('selectedRoles', [...filters.selectedRoles, 'mid'])

                                            } else changeFilter('selectedRoles', [...filters.selectedRoles].filter(role => role !== 'mid'))
                                        }}
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
                                        checked={filters.selectedRoles.includes('senior')}
                                        onCheckedChange={(e) => {
                                            if (e === true) {
                                                changeFilter('selectedRoles', [...filters.selectedRoles, 'senior'])

                                            } else changeFilter('selectedRoles', [...filters.selectedRoles].filter(role => role !== 'senior'))
                                        }}
                                    />
                                    <label
                                        htmlFor="senior"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Senior
                                    </label>
                                </div>
                            </>



                        </div>
                        <Separator className='my-4' />

                        <div className="flex justify-between  text-muted-foreground">
                            <p className='text-sm font-medium'>Country</p>


                        </div>

                        <div className="px-4 py-3 flex items-center sm:gap-4 sm:px-0">

                            <Select  >
                                <SelectTrigger className='flex-1 h-9 drop-shadow-sm' >
                                    {/* <SelectValue placeholder={profile.country ? profile.country : "Select country"} /> */}
                                    <SelectValue placeholder={filters.countryInput || "Select country"} />
                                </SelectTrigger>
                                <SelectContent >
                                    <Command   >
                                        <CommandInput className='h-9' placeholder="Search"

                                        />
                                        <CommandList>
                                            <CommandEmpty  >No results found.</CommandEmpty>
                                            <CommandGroup  >
                                                {countryData.map(c => {
                                                    // const isSelected = profile.country === c
                                                    const isSelected = filters.countryInput === c.name.common
                                                    return (
                                                        <CommandItem
                                                            key={c.name.common}
                                                            value={c.name.common}
                                                            onSelect={(e) => handleSelectCountry(e)}
                                                            className='justify-between'
                                                        >

                                                            <span>{c.name.common}</span>
                                                            {isSelected && <Check className="mr-2 h-4 w-4" />}
                                                        </CommandItem>
                                                    )
                                                })}

                                            </CommandGroup>

                                        </CommandList>
                                    </Command>

                                </SelectContent>
                            </Select>

                        </div>
                        <Separator className='my-4' />
                        <div className="role-levels flex flex-col gap-2">
                            <div className="flex gap-2 flex-col lg:flex-row justify-between text-muted-foreground">
                                <p className='text-sm font-medium'>Hourly rate</p>
                                <p className='text-sm'>{`up to $${hourlyRateLabel}`}</p>

                            </div>

                            <div className='flex gap-2'>

                                <Slider
                                    defaultValue={[filters.hourlyRate]}
                                    value={[hourlyRateLabel]}
                                    max={200}
                                    step={5}
                                    onValueChange={(e) => setHourlyRateLabel(e[0])}
                                    onValueCommit={(e) => changeFilter('hourlyRate', e[0])}
                                    className='py-2'
                                // {...props}
                                />
                            </div>



                        </div>
                        <Separator className='my-4' />
                        <div className="role-levels flex flex-col gap-2">
                            <div className="flex gap-2 flex-col lg:flex-row justify-between text-muted-foreground">
                                <p className='text-sm font-medium'>Experience</p>
                                <p className='text-sm'>{`at least ${experienceLabel} years`}</p>

                            </div>

                            <div className='flex gap-2'>

                                <Slider
                                    defaultValue={[filters.experience]}
                                    value={[experienceLabel]}
                                    max={20}
                                    step={0.5}
                                    onValueChange={(e) => setExperienceLabel(e[0])}
                                    onValueCommit={(e) => changeFilter('experience', e[0])}
                                    className='py-2'
                                // {...props}
                                />
                            </div>



                        </div>
                        <Separator className='my-4' />

                        <div className="role-levels flex flex-col gap-2">
                            <div className="flex justify-between text-muted-foreground">
                                <p className='text-sm font-medium'>Languages</p>
                            </div>

                            <Select  >
                                <SelectTrigger className='flex-1 h-9 drop-shadow-sm' >
                                    <SelectValue placeholder={(filters.languages && filters.languages.length) ? `${filters.languages.length} languages selected` : "Select languages"} />
                                </SelectTrigger>
                                <SelectContent  >
                                    <Command  >
                                        <CommandInput className='h-9' placeholder="Search" />
                                        {filters.languages && <CommandList>
                                            <CommandEmpty  >No results found.</CommandEmpty>
                                            <CommandGroup  >
                                                {languages.map((language: any) => {
                                                    let languageName = language.name
                                                    const isSelected = filters.languages.includes(languageName)
                                                    return (
                                                        <CommandItem
                                                            key={languageName}
                                                            value={languageName}
                                                            onSelect={(e) => {
                                                                if (isSelected) changeFilter('languages', filters.languages.filter(l => l !== languageName))
                                                                else changeFilter('languages', [...filters.languages, languageName])
                                                            }}
                                                            className='justify-between'
                                                        >

                                                            <span>{languageName}</span>
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

                        <Separator className='my-4' />

                        <div className="role-levels flex flex-col gap-2">
                            <div className="flex justify-between text-muted-foreground">
                                <p className='text-sm font-medium'>Skills</p>
                            </div>

                            <Select  >
                                <SelectTrigger className='flex-1 h-9 drop-shadow-sm' >
                                    <SelectValue placeholder={(filters.skills && filters.skills.length) ? `${filters.skills.length} skills selected` : "Select skills"} />
                                </SelectTrigger>
                                <SelectContent  >
                                    <Command  >
                                        <CommandInput className='h-9' placeholder="Search" />
                                        {filters.skills && <CommandList>
                                            <CommandEmpty  >No results found.</CommandEmpty>
                                            <CommandGroup  >
                                                {skills.map((skill: string) => {
                                                    const isSelected = filters.skills.includes(skill)
                                                    return (
                                                        <CommandItem
                                                            key={skill}
                                                            value={skill}
                                                            onSelect={(e) => {
                                                                if (isSelected) changeFilter('skills', filters.skills.filter(l => l !== skill))
                                                                else changeFilter('skills', [...filters.skills, skill])
                                                            }}
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
                    </section>
                </TooltipTrigger>
                <TooltipContent hidden={isEmployer} >
                    <p>Become an employer to access search filters</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

export default Filters