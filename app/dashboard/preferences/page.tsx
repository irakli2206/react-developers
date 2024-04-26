
import React, { Suspense, useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Switch } from "@/components/ui/switch"
import { Separator } from '@/components/ui/separator'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { getProfileData } from '@/app/action'
import { createClient } from '@/utils/supabase/client'
import { useToast } from '@/components/ui/use-toast'
import PreferencesView from './_components/view'



const Preferences = async () => {
    const profileData = await getProfileData()


    return (
        < >
            <PreferencesView profileData={profileData} />
        </ >
    )
}

export default Preferences