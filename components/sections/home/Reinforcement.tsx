'use client'

import { Separator } from '@/components/ui/separator'
import React, { useState } from 'react'
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"


const Reinforcement = () => {
    const developerTabContent = [
        {
            title: "Employment",
            description: "Discover opportunities, excel in a rewarding career, embrace professional growth."
        },
        {
            title: "Freelance",
            description: "Unlock your potential, freelance with freedom, flexibility, and fulfillment."
        },
        {
            title: "On-site",
            description: "Immerse in on-site roles, collaborate closely, thrive in team environments."
        },
        {
            title: "Remote",
            description: "Embrace remote work, excel from anywhere, enjoy flexibility, connection."
        },
    ]

    const employerTabContent = [
        {
            title: "Startups and Small Businesses",
            description: "Access top talent without hefty recruitment costs, crucial for growth phases."
        },

        {
            title: "Mid-sized Enterprises",
            description: "Streamline hiring, scale efficiently with direct access to qualified candidates."
        },
        {
            title: "Large Corporations",
            description: "Simplify recruitment, source specialized talent, optimize workforce diversity and flexibility."
        },
        {
            title: "Remote and Distributed Teams",
            description: "Embrace remote work, excel from anywhere, enjoy flexibility, connection."
        },

    ]

    const [isHovered, setIsHovered] = useState(true)


    return (
        <div className='max-w-7xl container py-32 flex flex-col items-center gap-4'>
            <h1 className='text-4xl xl:text-4xl font-semibold'>For any type of developer, for teams of all sizes</h1>

            <div className="flex  mt-4">
                <Tabs defaultValue="developer" className="">
                    <TabsList className="grid grid-cols-2 w-[300px] md:w-[500px] mx-auto">

                        <TabsTrigger value="developer">Developer</TabsTrigger>
                        <TabsTrigger value="employer">Employer</TabsTrigger>
                    </TabsList>
                    <TabsContent value="developer">
                        <div className="grid grid-cols-1 sm:grid-cols-2  gap-12 mt-12">
                            {developerTabContent.map(({ title, description }, i, arr) => {
                                return (
                                    <div className='flex'>
                                        <div className="flex flex-col gap-2">
                                            <h3 className="font-medium text-xl text-black ">{title}</h3>
                                            <p className='text-muted-foreground font-light text-lg'>{description}</p>
                                        </div>
                                        {/* <Separator orientation='vertical' className='ml-8' /> */}
                                    </div>
                                )
                            })}
                        </div>

                    </TabsContent>
                    <TabsContent value="employer">
                        <div className="grid grid-cols-1 sm:grid-cols-2  gap-12 mt-12">
                            {employerTabContent.map(({ title, description }, i, arr) => {
                                return (
                                    <div className='flex'>
                                        <div className="flex flex-col gap-2">
                                            <div className="flex justify-between items-end">
                                                <h3 className="font-medium text-xl text-black">{title}</h3>
                                                {title.includes('Startups') && <p className="text-primary pr-2">Popular</p>}
                                            </div>
                                            <p className='text-muted-foreground text-light text-lg'>{description}</p>
                                        </div>
                                        {/* <Separator orientation='vertical' className='ml-8' /> */}
                                    </div>
                                )
                            })}
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}

export default Reinforcement