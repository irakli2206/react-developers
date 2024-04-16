import DeveloperCard from '@/components/sections/DeveloperCard'
import { devData } from '@/data/data'
import React from 'react'

const DeveloperList = () => {

    return (
        <div className='flex flex-col gap-4 w-full'>
            {devData.map((dev) => {

                return (
                    <DeveloperCard
                        {...dev}
                    />
                )
            })}
        </div>
    )
}

export default DeveloperList