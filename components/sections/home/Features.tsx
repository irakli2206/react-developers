'use client'

import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { Separator } from '@/components/ui/separator'

const Features = () => {
    const savedThings = ["time", "effort", "money"]
    const cardData = [
        {
            title: "Time",
            description: "By using our platform instead of the traditional resume-sifting method, you improve your efficiency",
            src: '/save-time.png'
        },
        {
            title: "Effort",
            description: "Let's be honest, none of us likes going one resume to another in desperate hopes of finding the right choice",
            src: '/save-effort.png'
        },
        {
            title: "Money",
            description: "No longer do you need to waste money posting on 5 different job boards, we offer you a simpler and neater alternative",
            src: '/save-money.png'
        },
    ]

    const [currentThing, setCurrentThing] = useState("time")
    console.log(currentThing)
    return (
        <div className='max-w-7xl container py-32 flex flex-col gap-4'>
            <div className="flex flex-col gap-2 text-4xl xl:text-5xl font-semibold relative">
                <h1 className=' '>We save you </h1>
                {savedThings.map((s, i) => {

                    return (
                        <motion.p key={s} className='underline text-primary absolute left-56 xl:left-[300px]'
                            initial={{
                                opacity: 0
                            }}
                            animate={{
                                y: [-20, 0, 0, 20],
                                opacity: [0, 1, 1, 0]
                            }}

                            transition={{
                                duration: 4,
                                delay: i * 4,
                                repeat: Infinity,
                                repeatType: 'loop',
                                repeatDelay: 8,
                                times: [0, 0.05, 0.95, 1]
                            }}
                        >{s}</motion.p>
                    )
                })}
                <p className='text-muted-foreground font-light text-lg w-1/2'>Ditch conventional job boards. Discover the perfect candidates tailored to your needs, without sifting through stacks of resumes that don't meet your criteria.</p>

            </div>

            <div className="flex gap-4 justify-between mt-12">
 
                {cardData.map(({ title, description, src }) => {

                    return (
                        <div className="flex flex-col w-[350px] rounded-lg border shadow border-border">
                            <Image
                                src={src}
                                alt=''
                                width={700}
                                height={1}
                                className='rounded-md h-[200px] object-cover object-center'
                            />
                            <Separator />
                            <div className="flex flex-col gap-2 text-center px-4 py-10">
                                <h1 className='font-semibold text-2xl'>{title}</h1>
                                <p className='text-muted-foreground'>{description}</p>
                            </div>
                        </div>
                    )
                })}
            </div>

        </div>
    )
}

export default Features