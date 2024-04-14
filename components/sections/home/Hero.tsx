import React from 'react'
import { Button } from '../../ui/button'
import { CirclePlus, UserRoundPlus } from 'lucide-react'

const Hero = () => {
    return (
        <section className='pt-20 flex justify-center items-center'>
            <main className='max-w-screen-lg flex flex-col align-center justify-center'>

                <h1 className='scroll-m-20 text-4xl font-bold tracking-tight lg:text-6xl text-center'>
                    Premier platform linking React developers and employers.
                </h1>
                <p className="mt-4 text-xl text-zinc-500 text-center">
                    Linking React Pros with Dream Jobs: Where Talent Meets Opportunity

                </p>

                <div className='flex mt-10 gap-6 w-fit m-auto'>
                    <Button className='rounded-full drop-shadow-sm hover:drop-shadow-none'  variant='outline'><CirclePlus  size='20px' className='mr-2 text-zinc-800' />Add your profile</Button>
                    <Button className='rounded-full drop-shadow-sm' ><UserRoundPlus size='20px' className='mr-2' />Start hiring</Button>
                </div>
            </main>
        </section>
    )
}

export default Hero