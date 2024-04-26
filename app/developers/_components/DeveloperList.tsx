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
import { Frown } from 'lucide-react'
import { Button } from '@/components/ui/button'


type Props = {
    profilesData: Profile[]
    isEmployer: boolean
    handleClearFilters: () => void
}

const DeveloperList = ({ profilesData, isEmployer, handleClearFilters }: Props) => {
    return (
        <div className='flex flex-col gap-4 w-full '>


            {profilesData.length ? profilesData.map((dev) => {

                return (

                    <DeveloperCard
                        key={dev.id}
                        {...dev}
                        isDisabled={false}
                    />


                )
            })
                :
                <div className='flex flex-col items-center gap-2 p-4 border rounded-lg'>
                    <Frown strokeWidth={1} size={40} className='text-gray-400 fill-gray-100' />
                    <p className='text-gray-500 text-xl mb-2'>Looks like no one matches your description</p>
                    <Button onClick={handleClearFilters} >
                        Clear filters
                    </Button>
                </div>
            }
        </div>
    )
}

export default DeveloperList