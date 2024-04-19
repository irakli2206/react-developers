import React from 'react'
import { Button } from '../../ui/button'
import { CirclePlus, UserRoundPlus } from 'lucide-react'
import Link from 'next/link'

const Hero = () => {
    return (
        <section className='pt-20 flex justify-center items-center'>
            <main className='max-w-screen-lg flex flex-col align-center justify-center'>
                <div className="rounded-full bg-zinc-100 ring-1 px-4 py-1 text-sm  ring-zinc-200 text-zinc-700 w-fit mx-auto mb-6 cursor-pointer hover:ring-zinc-300 transition 
                shadow-[inset_0px_0px_6px_-4px_rgba(0,0,0,0)] hover:shadow-[inset_0px_0px_6px_-4px_rgba(0,0,0,0.5)]">
                    <p>Early access: give yourself an unfair advantage. <div className="font-semibold text-zinc-700 inline cursor-pointer relative"><span className="absolute inset-0" aria-hidden="true"></span>Read more <span aria-hidden="true">→</span></div></p>
                </div>
                <h1 className='scroll-m-20 text-4xl font-bold tracking-tight lg:text-6xl text-center'>
                    Premier platform linking React developers and employers.
                </h1>
                <p className="mt-4 text-xl text-zinc-500 text-center">
                    Linking React Pros with Dream Jobs: Where Talent Meets Opportunity

                </p>

                <div className='flex mt-10 gap-6 w-fit m-auto'>
                    <Button className='rounded-full drop-shadow-sm hover:drop-shadow-none'  variant='outline'><CirclePlus  size='20px' className='mr-2 text-zinc-800' />Add your profile</Button>
                    <Button className='rounded-full drop-shadow-sm' asChild >
                        <Link href='pricing' ><UserRoundPlus size='20px' className='mr-2' /> Start Hiring</Link>
                    </Button>
                </div>
            </main>
        </section>
    )
}

export default Hero