
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'
import { Check, Minus, Plus, Search, UserSearch } from 'lucide-react'
import React, { Suspense, useEffect, useMemo, useState } from 'react'
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
import { getFilteredProfiles, getProfileData, getProfiles } from '../action'
import classNames from 'classnames'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Profile } from '@/types/database.types'
import DevelopersView from './_components/view'


const Developers = async () => {

    const profileData = await getProfileData().catch(e => null)

    const countriesData = await fetch("https://restcountries.com/v3.1/all?fields=name").then(res => res.json())
    const countriesNames = countriesData.map(c => c.name.common)

    const profilesData = await getProfiles(10, true)

    const isEmployer = profileData?.account_type === 'employer'


    return (
        <  >
            <DevelopersView profileData={profileData} countriesData={countriesNames} profilesData={profilesData} isEmployer={isEmployer} />
        </ >
    )
}

export default Developers