
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { getProfileByID } from '@/app/action';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { ProfileT } from '@/types/general';
import { Bird, BriefcaseBusiness, Building, CalendarCheck, CircleCheck, CircleX, Hourglass, Laptop, Lock, MapPin } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

type Props = {
    params: { developer: string }
}

const Developer = async ({ params }: Props) => {
    const profile: ProfileT = await getProfileByID(params.developer);

    return (
        <>
            {/* <div className="w-full h-72 absolute top-0 left-0 opacity-50">
                <Image
                    fill
                    src='/white-waves.jpg' />
            </div> */}

            <div className='py-32 container relative'>


                <div className=" items-center flex gap-12 mb-8">
                    <Avatar className='w-auto h-24  '>
                        <AvatarImage className='object-cover' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEVAQBq7ET48cEAPk4f0pdKMr2tKOYuc7mpQvazyZ4xA&s' />
                    </Avatar>
                    <div className="flex flex-col gap-2 ">
                        <h1 className='text-3xl font-bold'>{profile.title}</h1>
                        <p className='flex gap-2 items-center text-zinc-500  font-medium'><MapPin width={16} /> {profile.country} - 8 pm local time</p>
                    </div>
                </div>
                <div className='flex gap-8'>

                    <section className='w-3/4 h-fit flex flex-col gap-5 px-8 py-6 rounded-xl ring-1 ring-gray-200 dark:ring-gray-800 shadow bg-white dark:bg-gray-900'>


                        <div className="flex flex-wrap items-center justify-between gap-2 ">
                            <div className="flex flex-col gap-2">
                                <h1 className='text font-bold'>Bio</h1>
                                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi, praesentium libero expedita veritatis est accusantium eveniet totam. Modi, aliquid ad. Velit, pariatur molestias? Aspernatur voluptatibus facere sequi eius quibusdam ipsum?</p>
                            </div>
                        </div>
                        <Separator className=' ' />
                        <div className="flex flex-wrap items-center justify-between gap-2 ">
                            <div className="flex flex-col gap-4">
                                <h1 className='text font-bold'>Skills</h1>
                                <div className="flex gap-2">
                                    {profile.skills?.map(skill => {
                                        return (
                                            < Badge key={skill} variant="outline" className='rounded-md '>{skill}</Badge>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                        <Separator className=' ' />
                        <div className="flex flex-wrap items-center justify-between gap-2 ">
                            <div className="flex flex-col gap-4">
                                <h1 className='text font-bold'>Languages</h1>
                                <div className="flex gap-2">
                                    {profile.languages?.map(language => {
                                        return (
                                            < Badge key={language} variant="outline" className='rounded-md '>{language}</Badge>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className='w-1/4 p-6 flex flex-col gap-4 rounded-xl ring-1 ring-gray-200 dark:ring-gray-800 shadow bg-white dark:bg-gray-900'>
                        <h2 className='text font-semibold'>Terms</h2>
                        <div className="flex justify-between items-center">
                            <p className='flex items-center gap-4 text-zinc-500'><CalendarCheck width={18} /> Available</p>
                            <span>
                                {profile.available ? <CircleCheck width={18} className='fill-green-200 text-green-500' /> : <CircleX width={18} className='fill-red-200 text-red-500' />}
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <p className='flex items-center gap-4 text-zinc-500'><Hourglass width={18} />Hourly rate</p>
                            <span>
                                {profile.hourly_rate || "$20"}
                            </span>
                        </div>
                        <Separator />
                        <h2 className='text font-semibold'>Conditions</h2>
                        <div className="flex justify-between items-center">
                            <p className='flex items-center gap-4 text-zinc-500'><BriefcaseBusiness width={18} /> Employment</p>
                            <span>
                                {profile.employment ? <CircleCheck width={18} className='fill-green-200 text-green-500' /> : <CircleX width={18} className='fill-red-200 text-red-500' />}
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <p className='flex items-center gap-4 text-zinc-500'><Bird width={18} /> Freelance</p>
                            <span>
                                {profile.freelance ? <CircleCheck width={18} className='fill-green-200 text-green-500' /> : <CircleX width={18} className='fill-red-200 text-red-500' />}
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <p className='flex items-center gap-4 text-zinc-500'><Laptop width={18} /> Remote</p>
                            <span>
                                {profile.remote ? <CircleCheck width={18} className='fill-green-200 text-green-500' /> : <CircleX width={18} className='fill-red-200 text-red-500' />}
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <p className='flex items-center gap-4 text-zinc-500'><Building width={18} />On-site</p>
                            <span>
                                {profile.on_site ? <CircleCheck width={18} className='fill-green-200 text-green-500' /> : <CircleX width={18} className='fill-red-200 text-red-500' />}
                            </span>
                        </div>
                        <Separator />
                        <h2 className='text font-semibold'>Contacts</h2>
                        <Link href='/pricing'
                            className='w-full h-40 bg-zinc-100 border-dashed  border-zinc-300 text-zinc-400 border-2 rounded-md flex flex-col items-center
                             justify-center gap-2 text-center p-2'
                        >
                            <Lock />
                            <p className='text-sm'>Become an employer to view this information</p>
                        </Link>
                    </section>


                </div>

            </div>
        </>
    );
}





export default Developer