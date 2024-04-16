'use client'

import React, { useRef } from 'react'
import DeveloperCard from '../DeveloperCard'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { Button } from '@/components/ui/button'
import { UsersRound } from 'lucide-react'
import { devData } from '@/data/data'




const OurDevs = () => {
    const plugin = useRef(
        Autoplay({ delay: 2500, stopOnInteraction: false })
    )

    return (
        <section className='py-24'>
            <main className='w-full flex flex-col '>
                <div className="flex justify-between">
                    <h2 className='scroll-m-20 text-3xl font-bold  tracking-tight mb-4'>Our developers</h2>
                    <Button size='sm' variant='outline' className='rounded-full drop-shadow-sm hover:drop-shadow-none'><UsersRound size='16px' className='mr-2' /> View all</Button>
                </div>


                <Carousel className="w-full relative"
                    plugins={[plugin.current]}
                    // onMouseEnter={plugin.current.stop}
                    // onMouseLeave={plugin.current.reset}
                >
                    <CarouselContent>
                        
                            {devData.map((dev, index) => (
                                <CarouselItem key={index} className='flex justify-center basis-1/3'>
                                    <DeveloperCard {...dev} />
                                </CarouselItem>
                            ))}
                        
                    </CarouselContent>
                    <div className='absolute pointer-events-none top-0 w-full h-full z-50 from-white via-transparent to-white bg-gradient-to-r' ></div>

                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </main>
        </section>
    )
}

export default OurDevs