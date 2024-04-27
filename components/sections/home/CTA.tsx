import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const CTA = () => {
  return (
    <div className='max-w-7xl container pt-32 flex flex-col gap-4'>
      <div className=" shadow rounded-3xl w-full px-12 py-24  relative overflow-hidden">
        <Image
          src='/cta-bg.png'
          fill
          alt=''
          className='object-cover rounded-3xl'
        />

        <div className="flex relative z-10">
          <div className="flex flex-col gap-2 text-white w-2/5">
            <h1 className=' font-semibold text-3xl'>Outhire your competition now</h1>
            <p className='text-xl font-light text-gray-200'>Become one of the first in the reverse job board revolution, or book a call with the founder</p>

            <div className="flex gap-4 mt-8">
              <Button variant='default' className='transition shadow-[0px_0px_12px_2px_#2563eb] hover:shadow-[0px_0px_12px_0px_#2563eb] w-[200px]' asChild>
                <Link href='/signup'>Sign up</Link>
              </Button>
              <Button variant='secondary' className=' bg-transparent border border-gray-300 text-white w-[200px] hover:bg-gray-300/20' asChild>
              <Link href='https://calendly.com/iraklibego1/45min' target='_blank'>Book call</Link>
              </Button>

            </div>
          </div>

          <div className="w-3/5 relative ">
            <Image
              src='/cta.png'
              width={1000}
              height={1}
              alt=''
              className='absolute object-contain rounded-lg -right-32'
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CTA