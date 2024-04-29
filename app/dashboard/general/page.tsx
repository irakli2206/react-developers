
import { Input } from '@/components/ui/input'
import React, { Suspense, use, useEffect, useState } from 'react'
import { Textarea } from "@/components/ui/textarea"
import { Button } from '@/components/ui/button'
import { useFormState, useFormStatus } from 'react-dom'
import { createClient } from '@/utils/supabase/server'
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
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useToast } from '@/components/ui/use-toast'
import { getCountryList, getProfileData } from '@/app/action'
import GeneralView from './_components/view'
import countries from '@/data/countryData.json'

const General = async () => {
    const profile = await getProfileData()
    const countryOptions = countries.map(c => c.name.common)

    return (
        < >
            <GeneralView profileData={profile} countryOptionsData={countryOptions} />
        </ >
    )
}

export default General