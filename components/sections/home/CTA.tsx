import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const CTA = () => {
  return (
    <div className='max-w-7xl  container pt-32 flex flex-col gap-4 '>
      <div className="shadow   rounded-3xl w-full px-4 md:px-12 py-12 md:py-24  relative overflow-hidden">
        <Image
          src='/cta-bg.png'
          fill
          alt=''
          className='object-cover rounded-3xl'
        />

        <div className="absolute w-full h-full top-0 left-0 rounded-3xl shadow-[inset_0px_0px_40px_-4px_rgba(255,255,255,0.5)]"></div>

        <div className="flex relative z-10 ">
          <div className="flex flex-col gap-2 text-white w-full xl:w-2/5">
            <h1 className=' font-semibold text-2xl md:text-3xl'>Outhire your competition now</h1>
            <p className='md:text-xl font-light text-gray-200'>Become one of the first in the reverse job board revolution, or book a call with the founder</p>

            <div className="flex flex-col items-center md:flex-row gap-4 mt-8">
              <Button variant='default' className='transition shadow-[0px_0px_12px_2px_#2563eb] hover:shadow-[0px_0px_12px_0px_#2563eb] w-[200px]' asChild>
                <Link href='/signup'>Sign up</Link>
              </Button>
              <Button variant='secondary' className=' bg-transparent border border-gray-300 text-white w-[200px] hover:bg-gray-300/20' asChild>
                <Link href='https://calendly.com/iraklibego1/45min' target='_blank'>Book call</Link>
              </Button>

            </div>
          </div>

          <div className="hidden xl:inline-block w-3/5 relative ">
            <Image
              src='/cta.png'
              width={1000}
              height={1}
              alt=''
              className='absolute object-contain rounded-lg -bottom-36 -right-32'
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CTA