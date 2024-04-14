import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { Separator } from './ui/separator'

const Footer = () => {
    return (
        <footer className='w-full border-t'>
            <div className='container  border-zinc-200 py-16 '>
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
            <Separator  />
            <div className="py-4 container  border-zinc-200 flex justify-between">
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