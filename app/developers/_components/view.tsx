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


type Props = {
    profileData: Profile | null
    profilesData: Profile[]
    countriesData: string[]
    isEmployer: boolean
}

const DevelopersView = ({ profileData, profilesData, countriesData, isEmployer }: Props) => {
    const [profiles, setProfiles] = useState<Profile[]>(profilesData)
    const [countryInput, setCountryInput] = useState("")
    const [selectedRoles, setSelectedRoles] = useState<string[]>([])
    const [isRolesExpanded, setIsRolesExpanded] = useState(false)
    const [isCountryExpanded, setIsCountryExpanded] = useState(false)
    const [searchInput, setSearchInput] = useState('')

    const router = useRouter()
    const params = useParams()


    useEffect(() => {
        if (!isRolesExpanded) setSelectedRoles([])
        if (!isCountryExpanded) setCountryInput("")
    }, [isRolesExpanded, isCountryExpanded])



    const getFilteredData = async () => {
        const filteredData = await getFilteredProfiles(countryInput, selectedRoles.length ? selectedRoles : undefined, searchInput)
        setProfiles(filteredData)
    }

    useEffect(() => {
        if (countryInput || selectedRoles.length) {
            getFilteredData()
        }
    }, [countryInput, selectedRoles])

    const handleFilter = async () => {
        await getFilteredData()
    }

    const handleSelectCountry = (newCountryInput: string) => {
        if (countryInput === newCountryInput) setCountryInput("")
        else setCountryInput(newCountryInput)
    }



    return (
        <div>

            <div className='container py-32 min-h-screen '>

                {!isEmployer && <div className='flex justify-between mb-12'>
                    <div className="flex flex-col gap-2 ">
                        <h1 className='text-4xl font-semibold'>Meet the developers</h1>
                        <p className='text-muted-foreground text-lg font-light'>Find your company's perfect match in an instant</p>

                        <div className="flex gap-4 mt-4">
                            <Button asChild className='rounded-full'>
                                <Link href='/pricing'>Start searching</Link>
                            </Button>
                            <Button variant='outline' asChild className='rounded-full'>
                                <Link href='/signup'>Create an account</Link>
                            </Button>
                        </div>
                    </div>

                    <div className="px-8 py-6 rounded-lg border border-border flex flex-col gap-4"  >
                        <FaVuejs size={40} className='text-green-500' />
                        <div className="flex flex-col gap-2">
                            <h1 className='text-xl  font-semibold'>Looking for VueJS developers?</h1>
                            <p>Check out <Button variant='link' className='p-0 text-base text-green-500' asChild><Link href='vue-developers.com'>vue-developers.com</Link></Button> to find top VueJS talent.</p>
                        </div>
                    </div>
                </div>}

                <div className="flex gap-4 ">
                    {/* Filters */}
                    <TooltipProvider>
                        <Tooltip >
                            <TooltipTrigger asChild>
                                <section className={classNames("flex flex-col h-fit w-1/4 opacity-100 [&>*]:pointer-events-auto !cursor-allowed sticky top-14", {
                                    "!opacity-50 [&>*]:!pointer-events-none cursor-not-allowed ": !isEmployer
                                })}>
                                    <Separator className='mb-6' />
                                    <div className="role-levels flex flex-col gap-2">
                                        <div className="flex justify-between text-muted-foreground">
                                            <p className='text-sm font-medium'>Role levels</p>
                                            <Button variant={'link'} asChild size='icon' className='text-muted-foreground'
                                                onClick={() => {
                                                    setIsRolesExpanded(!isRolesExpanded)
                                                }}
                                            >
                                                {isRolesExpanded ? <Minus className='cursor-pointer !w-5 h-auto' /> : <Plus className='cursor-pointer !w-5 h-auto' />}
                                            </Button>

                                        </div>
                                        {
                                            isRolesExpanded ?
                                                <>
                                                    <div className="flex mt-2 gap-2 items-center space-x-2">

                                                        <Checkbox id="junior"
                                                            checked={selectedRoles.includes('junior')}
                                                            onCheckedChange={(e) => {
                                                                if (e === true) {
                                                                    setSelectedRoles([...selectedRoles, 'junior'])
                                                                } else setSelectedRoles([...selectedRoles].filter(role => role !== 'junior'))
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
                                                            checked={selectedRoles.includes('mid')}
                                                            onCheckedChange={(e) => {
                                                                if (e === true) {
                                                                    setSelectedRoles([...selectedRoles, 'mid'])
                                                                } else setSelectedRoles([...selectedRoles].filter(role => role !== 'mid'))
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
                                                            checked={selectedRoles.includes('senior')}
                                                            onCheckedChange={(e) => {
                                                                if (e === true) {
                                                                    setSelectedRoles([...selectedRoles, 'senior'])
                                                                } else setSelectedRoles([...selectedRoles].filter(role => role !== 'senior'))
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
                                                :
                                                null
                                        }


                                    </div>
                                    <Separator className='my-6' />

                                    <div className="flex justify-between  text-muted-foreground">
                                        <p className='text-sm font-medium'>Country</p>
                                        <Button variant={'link'} asChild size='icon' className='text-muted-foreground'
                                            onClick={() => {
                                                setIsCountryExpanded(!isCountryExpanded)
                                            }}
                                        >
                                            {isCountryExpanded ? <Minus className='cursor-pointer !w-5 h-auto' /> : <Plus className='cursor-pointer !w-5 h-auto' />}
                                        </Button>

                                    </div>
                                    {
                                        isCountryExpanded ?
                                            <div className="px-4 py-5 flex items-center sm:gap-4 sm:px-0">

                                                <Select  >
                                                    <SelectTrigger className='flex-1 h-9 drop-shadow-sm' >
                                                        {/* <SelectValue placeholder={profile.country ? profile.country : "Select country"} /> */}
                                                        <SelectValue placeholder={countryInput || "Select country"} />
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
                                            :
                                            null
                                    }

                                </section>
                            </TooltipTrigger>
                            <TooltipContent hidden={isEmployer} >
                                <p>Become an employer to access search filters</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <section className="flex flex-col gap-4 w-3/4 ">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <form action={handleFilter} className={classNames("flex gap-2 w-fit items-center opacity-100 [&>*]:pointer-events-auto cursor-allowed", {
                                        "!opacity-50 [&>*]:!pointer-events-none cursor-not-allowed": !isEmployer
                                    })}>
                                        <div className='flex-1 flex relative max-w-[300px]'>
                                            <Input className='pl-10  drop-shadow-sm relative z-50 bg-transparent' type="text" placeholder="Mid React Developer"
                                                value={searchInput}
                                                onChange={e => setSearchInput(e.target.value)}
                                            />
                                            <Search className='absolute top-2.5 left-4 w-4 h-4 text-zinc-400 fill-gray-200' />
                                        </div>
                                        <Button type='submit'> Search</Button>
                                    </form>
                                </TooltipTrigger>
                                <TooltipContent hidden={isEmployer}>
                                    <p>Become an employer to access search filters</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <DeveloperList isEmployer={isEmployer} profilesData={profiles} />
                    </section>
                </div>
            </div>


        </div>
    )
}

export default DevelopersView