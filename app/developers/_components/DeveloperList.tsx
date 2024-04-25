import DeveloperCard from '@/components/sections/DeveloperCard'
import { devData } from '@/data/data'
import React from 'react'
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
import { Profile } from '@/types/database.types'


type Props = {
    profilesData: Profile[]
    isEmployer: boolean
}

const DeveloperList = ({  profilesData, isEmployer }: Props) => {
    console.log(profilesData)
    return (
        <div className='flex flex-col gap-4 w-full '>
            
            {profilesData.map((dev) => {

                return (

                    <DeveloperCard
                        key={dev.id}
                        {...dev}
                        isDisabled={false}
                    />


                )
            })}
        </div>
    )
}

export default DeveloperList