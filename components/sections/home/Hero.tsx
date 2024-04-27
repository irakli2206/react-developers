import React from 'react'
import { Button } from '../../ui/button'
import { CirclePlus, UserRoundPlus } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import Deco from '@/public/hero-deco.png'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

const Hero = () => {
    return (
        <section className='pt-8 lg:pt-12 w-full flex justify-center items-center '>
            <main className=' flex align-center w-full justify-between'>
                <div className='w-full flex-1 grow-[3] px-4 md:px-12 text-center lg:text-start relative z-50'>
                    <Dialog>
                        <DialogTrigger className='focus-visible:outline-none'>
                            <div className="mx-auto lg:ml-0 rounded-full bg-blue-50 ring-1 px-4 py-1 text-sm  ring-blue-200 text-blue-700 w-fit  mb-6 cursor-pointer hover:ring-blue-300 transition 
                    shadow-[inset_0px_0px_6px_-4px_rgba(37,99,235,0)] hover:shadow-[inset_0px_0px_8px_-4px_rgba(37,99,235,0.5)]">
                                <div>Alpha release: Talent discovery stage. <div className="font-semibold text-blue-700 inline cursor-pointer relative"><span className="absolute inset-0" aria-hidden="true"></span>Read more <span aria-hidden="true">→</span></div></div>
                            </div>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Attention developers!</DialogTitle>
                                <DialogDescription className='pt-2 flex flex-col gap-2'>
                                    Seize your chance to stand out in search results. Register today for increased employer visibility.

                                </DialogDescription>
                            </DialogHeader>
                            <DialogFooter className='mt-4'>
                                <Button asChild >
                                    <Link href='/signup'>Sign up</Link>
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                    <h1 className='scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl '>
                        Premier platform linking React developers and employers.
                    </h1>
                    <p className="mt-4 text-xl text-muted-foreground font-light ">
                        Linking React Pros with Dream Jobs: Where Talent Meets Opportunity

                    </p>

                    <div className='flex mt-10 gap-6 w-fit mx-auto lg:ml-0'>
                        <Button size='lg' className='rounded-full drop-shadow-sm hover:drop-shadow-none' variant='outline' asChild>
                            <Link href='signup'>
                                <CirclePlus size='20px' className='mr-2 text-gray-500 fill-gray-100' />Add your profile
                            </Link>
                        </Button>
                        <Button size='lg' className='rounded-full drop-shadow-sm ' asChild >
                            <Link href='pricing' ><UserRoundPlus size='20px' className='mr-2' />Start Hiring</Link>
                        </Button>
                    </div>
                </div>
                <div className='relative z-10 hidden lg:inline-block flex-1 h-[450px] xl:h-[450px] -top-12 -right-4 rounded-xl grow-[2] xl:grow-[3]'>
                    <div className="absolute right-0 w-full h-[calc(100%+10px)] bg-gradient-to-r from-transparent to-[80%] to-white z-50 "></div>
                    <Image src={Deco} placeholder='blur' fill className='object-cover object-left-top drop-shadow-sm border border-zinc-200 rounded-lg absolute  ' alt='' />
                </div>
            </main>
        </section>
    )
}

export default Hero