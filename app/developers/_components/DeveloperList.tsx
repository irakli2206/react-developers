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


type Props = {
    onCardClick: () => void
}

const DeveloperList = ({ onCardClick }: Props) => {

    return (
        <div className='flex flex-col gap-4 w-full'>
            {devData.map((dev) => {

                return (
                   
                            <DeveloperCard
                                {...dev}
                                isDisabled={false}
                                onCardClick={onCardClick}
                            />
                      

                )
            })}
        </div>
    )
}

export default DeveloperList