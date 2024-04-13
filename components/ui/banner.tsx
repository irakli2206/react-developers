'use client'

import { X } from 'lucide-react'
import { useState } from 'react'
import { Button } from './button'
import Link from 'next/link'

export default function Banner() {
    const [isVisible, setIsVisible] = useState(true)
    return (
        <>
            {isVisible && <div className="absolute top-[64px] left-0 w-full  flex items-center gap-x-6 overflow-hidden bg-zinc-900 text-white px-6 py-1 sm:px-3.5 sm:before:flex-1">

                <div className="flex flex-wrap items-center gap-x-2 gap-y-2">
                    <p className="text-sm leading-6 ">
                        <strong className="font-semibold">Need Vue developers?</strong>
                        <svg viewBox="0 0 2 2" className="mx-2 inline h-0.5 w-0.5 fill-current" aria-hidden="true">
                            <circle cx={1} cy={1} r={1} />
                        </svg>
                       
                        <u> We've got you covered, check out our partner's platform</u>
                    </p>
                    <Button size='sm' asChild className='bg-zinc-100 rounded-full text-black hover:bg-zinc-700 px-5'>
                        <Link
                            href='https://vue-developers.com/'
                        >Go there <span aria-hidden="true" className='ml-2'>&rarr;</span></Link>
                    </Button>

                </div>
                <div className="flex flex-1 justify-end">
                    <Button
                        onClick={() => setIsVisible(false)}
                    >
                        <X className="h-5 w-5 text-white " aria-hidden="true" />

                    </Button>

                </div>
            </div>}
        </>

    )
}