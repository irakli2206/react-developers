import React from 'react'
import DeveloperCard from '../DeveloperCard'

const OurDevs = () => {
    return (
        <section className='py-24'>
            <main className='max-w-screen-lg flex flex-col '>
                <h2 className='scroll-m-20 text-3xl font-bold  tracking-tight mb-4'>Our developers</h2>
                <div className='flex gap-4'>
                    <DeveloperCard />
                    <DeveloperCard />
                    <DeveloperCard />
                </div>
            </main>
        </section>
    )
}

export default OurDevs