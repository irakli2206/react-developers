import Image from 'next/image'
import React from 'react'

const Summary = () => {
    return (
        <div className='max-w-7xl container pt-32 pb-24 flex  gap-8'>

            <div className="flex-[1] relative">
                <Image

                    src='/connect.jpg'
                    fill
                    alt=''
                    className='object-contain'
                />
                <div className="absolute w-full h-full bg-gradient-to-r from-white via-transparent to-white"></div>
            </div>
            <div className="flex-[1]">
                {/* <p className='font-medium text-primary mb-2 text-lg '>What</p> */}
                <h1 className='text-4xl xl:text-5xl font-semibold'>A new, better way to connect employers with talent</h1>
                <p className='text-muted-foreground mt-4 text-xl font-light'>Revolutionize your hiring process with our groundbreaking reverse job board. No more endless resume browsing or wasted time. Our platform connects employers directly with skilled professionals, streamlining recruitment and ensuring a perfect fit every time. Say hello to a simpler, smarter way to find your next great hire.

                </p>
            </div>

        </div>
    )
}

export default Summary