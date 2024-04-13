import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'

const Footer = () => {
    return (
        <footer>
            <div className='w-full  border-t border-zinc-200 py-16 px-[15%]'>
                <div className="flex flex-col gap-2">
                    <p className='text-sm font-semibold'>React Developers</p>
                    <ul className='flex flex-col gap-2'>
                        <li>
                            <Button asChild variant='link' className='p-0 font-light'>
                                <Link href='pricing'>Pricing</Link>
                            </Button>
                        </li>
                    </ul>
                </div>

            </div>
            <div className="py-4 px-[15%] w-full border-t border-zinc-200 flex justify-between">
                <p className='font-light  text-zinc-500 text-sm'>Copyright © 2024. All rights reserved.</p>

                <div className='flex items-center gap-1 text-sm'>
                    <p>Website created by</p>
                    <Button asChild variant='link' className='p-0 h-fit font-bold '>
                        <Link target='_blank' href='https://gravette.dev'>Gravette</Link>
                    </Button>
                </div>
            </div>

        </footer>
    )
}

export default Footer