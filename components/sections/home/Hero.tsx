import React from 'react'
import { Button } from '../../ui/button'
import { CirclePlus, UsersRound } from 'lucide-react'

const Hero = () => {
    return (
        <section className='py-32'>
            <main className='max-w-screen-lg flex flex-col align-center'>

                <h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-6xl text-center'>
                    Premier platform linking React developers and employers.
                </h1>
                <p className="mt-6 text-lg text-zinc-500 text-center">
                    Linking React Pros with Dream Jobs: Where Talent Meets Opportunity

                </p>

                <div className='flex mt-10 gap-8 w-fit m-auto'>
                    <Button className='rounded-full drop-shadow-sm hover:drop-shadow-none' size='lg' variant='outline'><CirclePlus size='20px' className='mr-2' />Add your profile</Button>
                    <Button className='rounded-full drop-shadow-sm' size='lg'><UsersRound size='20px' className='mr-2' /> See the developers</Button>
                </div>
            </main>
        </section>
    )
}

export default Hero