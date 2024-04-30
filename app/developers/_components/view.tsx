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

type Props = {
    profileData: Profile | null
    profilesData: Profile[]
    countriesData: string[]
    isEmployer: boolean
}

type Filters = {
    searchInput: string
    countryInput: string
    selectedRoles: string[]
    hourlyRate: number
    experience: number
    languages: string[]

}

const DevelopersView = ({ profileData, profilesData, countriesData, isEmployer }: Props) => {
    const [profiles, setProfiles] = useState<Profile[]>(profilesData)

    const [filters, setFilters] = useState<Filters>({
        searchInput: "",
        countryInput: "",
        selectedRoles: [],
        hourlyRate: 200,
        experience: 0,
        languages: []
    })

    const [hourlyRateLabel, setHourlyRateLabel] = useState(filters.hourlyRate)

    const [experienceLabel, setExperienceLabel] = useState(filters.experience)

    const changeFilter = (filterName: keyof Filters, newValue: any) => {
        setFilters((prevState) => (
            {
                ...prevState,
                [filterName]: newValue
            }
        ))
    }

    const profilesCount = useMemo(() => {
        return profiles.length
    }, [profiles])


    const getFilteredData = async () => {
        const filteredData = await getFilteredProfiles(filters.countryInput, filters.selectedRoles, filters.searchInput, filters.hourlyRate, filters.experience, filters.languages)
        setProfiles(filteredData)
    }

    useEffect(() => {

        getFilteredData()

    }, [filters.countryInput, filters.selectedRoles, filters.hourlyRate, filters.experience, filters.languages])

    const handleFilter = async () => {
        await getFilteredData()
    }

    const handleSelectCountry = (newCountryInput: string) => {
        if (filters.countryInput === newCountryInput) changeFilter('countryInput', '')
        else changeFilter('countryInput', newCountryInput)
    }

    const handleClearFilters = async () => {
        changeFilter('countryInput', '')
        changeFilter('searchInput', '')
        changeFilter('selectedRoles', [])
        console.log('search', filters.searchInput)
        const filteredData = await getFilteredProfiles("", [], "", 200, 0)
        setProfiles(filteredData)
    }

    console.log(filters)
    return (
        <div>

            <div className='max-w-7xl container py-32 min-h-screen '>

                {!isEmployer && <div className='flex justify-between mb-12'>
                    <div className="flex flex-col gap-2 ">
                        <h1 className='text-4xl font-semibold'>Meet the developers</h1>
                        <p className='text-muted-foreground text-lg font-light'>Find your company's perfect match in an instant</p>

                        <div className="flex gap-4 mt-4 flex-col sm:flex-row">
                            <Button asChild className='rounded-full'>
                                <Link href='/pricing'>Access filters</Link>
                            </Button>
                            {!profileData && <Button variant='outline' asChild className='rounded-full'>
                                <Link href='/signup'>Create an account</Link>
                            </Button>}

                        </div>
                    </div>

                    <div className="hidden lg:flex px-8 py-4 rounded-lg border border-border flex-col gap-4"  >
                        <FaVuejs size={40} className='text-green-500' />
                        <div className="flex flex-col gap-2">
                            <h1 className='text-xl  font-semibold'>Looking for VueJS developers?</h1>
                            <p>Check out <Button variant='link' className='p-0 text-base text-green-500' asChild><Link href='https://vue-developers.com' target='_blank'>vue-developers.com</Link></Button> to find top VueJS talent.</p>
                        </div>
                    </div>
                </div>}

                <div className="flex gap-4 ">
                    {/* Filters */}
                    <TooltipProvider>
                        <Tooltip >
                            <TooltipTrigger asChild>
                                <section className={classNames("hidden md:flex flex-col h-fit w-1/4 opacity-100 [&>*]:pointer-events-auto !cursor-allowed sticky top-14", {
                                    "!opacity-50 [&>*]:!pointer-events-none cursor-not-allowed ": !isEmployer
                                })}>
                                    <Separator className='mb-4' />
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
                                                            {countriesData.map(c => {
                                                                // const isSelected = profile.country === c
                                                                const isSelected = filters.countryInput === c
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

                                    </div>
                                    <Separator className='my-4' />
                                    <div className="role-levels flex flex-col gap-2">
                                        <div className="flex justify-between text-muted-foreground">
                                            <p className='text-sm font-medium'>Hourly rate</p>
                                            <p className='text-sm'>{`up to $${hourlyRateLabel}`}</p>

                                        </div>

                                        <div className='flex gap-2'>

                                            <Slider
                                                defaultValue={[filters.hourlyRate]}
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
                                        <div className="flex justify-between text-muted-foreground">
                                            <p className='text-sm font-medium'>Experience</p>
                                            <p className='text-sm'>{`${experienceLabel} years`}</p>

                                        </div>

                                        <div className='flex gap-2'>

                                            <Slider
                                                defaultValue={[filters.experience]}
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
                                </section>
                            </TooltipTrigger>
                            <TooltipContent hidden={isEmployer} >
                                <p>Become an employer to access search filters</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <section className="flex flex-col gap-4 w-full lg:w-3/4">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <form action={handleFilter} className={classNames("flex gap-2 w-full items-center opacity-100 [&>*]:pointer-events-auto cursor-allowed", {
                                        "!opacity-50 [&>*]:!pointer-events-none cursor-not-allowed": !isEmployer
                                    })}>
                                        <div className='flex-1 flex relative max-w-[250px]'>
                                            <Input className='pl-10  drop-shadow-sm relative z-50 bg-transparent' type="text" placeholder="Mid React Developer"
                                                value={filters.searchInput}
                                                onChange={e => changeFilter('searchInput', e.target.value)}
                                            />
                                            <Search className='absolute top-2.5 left-4 w-4 h-4 text-zinc-400 fill-gray-200' />
                                        </div>
                                        <Button type='submit'> Search</Button>

                                        <p className="hidden md:block ml-auto text-sm font-medium self-end text-primary">{profilesCount} developers found</p>
                                    </form>
                                </TooltipTrigger>
                                <TooltipContent hidden={isEmployer}>
                                    <p>Become an employer to access search filters</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <DeveloperList isEmployer={isEmployer} profilesData={profiles} handleClearFilters={handleClearFilters} />
                    </section>
                </div>
            </div>


        </div>
    )
}

export default DevelopersView