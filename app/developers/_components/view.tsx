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
import Filters from './Filters'

type Props = {
    profileData: Profile | null
    profilesData: Profile[]
    countriesData: string[]
    isEmployer: boolean
}

export type FiltersT = {
    searchInput: string
    countryInput: string
    selectedRoles: string[]
    hourlyRate: number
    experience: number
    languages: string[]
    skills: string[]
    primarySkill: string

}

const DevelopersView = ({ profileData, profilesData, countriesData, isEmployer }: Props) => {
    const [profiles, setProfiles] = useState<Profile[]>(profilesData)

    const [filters, setFilters] = useState<FiltersT>({
        searchInput: "",
        countryInput: "",
        selectedRoles: [],
        hourlyRate: 200,
        experience: 0,
        languages: [],
        skills: [],
        primarySkill: ""
    })

    const [hourlyRateLabel, setHourlyRateLabel] = useState(filters.hourlyRate)

    const [experienceLabel, setExperienceLabel] = useState(filters.experience)

    useEffect(() => {
        setHourlyRateLabel(filters.hourlyRate)
        setExperienceLabel(filters.experience)
    }, [filters.experience, filters.hourlyRate])

    const changeFilter = (filterName: keyof FiltersT, newValue: any) => {
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
        const filteredData = await getFilteredProfiles(filters.countryInput, filters.selectedRoles, filters.searchInput, filters.hourlyRate, filters.experience, filters.languages, filters.skills, filters.primarySkill)
        setProfiles(filteredData)
    }

    useEffect(() => {
        //Filter only if any filter is selected
        if (filters.countryInput || filters.selectedRoles.length || filters.hourlyRate || filters.experience || filters.languages.length || filters.skills.length || filters.primarySkill) {
            getFilteredData()
        }


    }, [filters])

    const handleFilter = async () => {
        await getFilteredData()
    }



    const handleClearFilters = async () => {
        setFilters({
            searchInput: "",
            countryInput: "",
            selectedRoles: [],
            hourlyRate: 200,
            experience: 0,
            languages: [],
            skills: [],
            primarySkill: ""
        })
        const filteredData = await getFilteredProfiles("", [], "", 200, 0, [], [], "")

        setProfiles(filteredData)
    }

    // console.log(filters)
    return (
        <div className='w-full'>

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

                    {/* <div className="hidden lg:flex px-8 py-4 rounded-lg border border-border flex-col gap-4"  >
                        <FaVuejs size={40} className='text-green-500' />
                        <div className="flex flex-col gap-2">
                            <h1 className='text-xl  font-semibold'>Looking for VueJS developers?</h1>
                            <p>Check out <Button variant='link' className='p-0 text-base text-green-500' asChild><Link href='https://vue-developers.com' target='_blank'>vue-developers.com</Link></Button> to find top VueJS talent.</p>
                        </div>
                    </div> */}
                </div>}

                <div className="flex gap-8 ">

                    <Filters
                        changeFilter={changeFilter}
                        experienceLabel={experienceLabel}
                        filters={filters}
                        hourlyRateLabel={hourlyRateLabel}
                        isEmployer={isEmployer}
                        setExperienceLabel={setExperienceLabel}
                        setHourlyRateLabel={setHourlyRateLabel}
                    />
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
                                        <Button variant='ghost' onClick={handleClearFilters}> Clear filters</Button>
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