'use client'

import ChooseType from '@/components/sections/signup/ChooseType'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { AccountType } from '@/types/general'
import { BriefcaseBusiness, UserRoundSearch } from 'lucide-react'
import React, { useState } from 'react'

const Signup = () => {
    const [wizardStep, setWizardStep] = useState(0)
    const [accountType, setAccountType] = useState<AccountType | null>(null)

    return (
        <main className='min-h-screen w-full pt-[20vh] bg-zinc-100'>
            <ChooseType accountType={accountType} setAccountType={setAccountType} />


        </main>
    )
}

export default Signup