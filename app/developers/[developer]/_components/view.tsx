'use client'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { getProfileByID, getProfileData } from '@/app/action';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { ArrowUpRight, Bird, BriefcaseBusiness, Building, CalendarCheck, CircleCheck, CircleX, Copy, Hourglass, Laptop, Lock, Mail, MapPin } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Profile } from '@/types/database.types';
import moment from 'moment'
import { useParams } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';

type Props = {
    loggedUser: Profile | null
    profile: Profile
}

const DeveloperView = ({ loggedUser, profile }: Props) => {
    const { toast } = useToast()

    let isEmployer = loggedUser?.account_type === 'employer'


    const onMailCopy = async () => {
        if (profile) {
            await navigator.clipboard.writeText(profile.email)
            toast({
                title: "Email copied",
                description: "Email has been copied to your clipboard",
                duration: 3000
            })
        }
    }

    return (
        <>


            < div className='py-32 container max-w-7xl relative'>


                <div className=" items-center flex gap-8 mb-8">
                    <Avatar className='w-auto h-20  '>
                        <AvatarImage className='object-cover' src={profile.avatar || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"} />
                        {/* <AvatarFallback>

                        </AvatarFallback> */}
                    </Avatar>
                    <div className="flex flex-col gap-2 ">
                        <h1 className='text-2xl sm:text-3xl font-bold'>{profile.title}</h1>

                        {isEmployer ?
                            <p className=' text-xl font-medium'>  {profile.name} </p>
                            :
                            <Link href='/pricing'
                                className='w-full bg-zinc-100 border-dashed  border-zinc-300 text-zinc-400 border-2 rounded-md flex items-center
                                          justify-center gap-2 text-center px-2 py-1  hover:border-zinc-400 transition'
                            >
                                <Lock width={16} />
                                <p className='text-sm'>Become an employer to view the developer's name</p>
                            </Link>


                        }


                        {/* <p className='flex gap-2 items-center text-muted-foreground text-sm '><MapPin width={16} /> {profile.country} - {formattedAdjustedTime} local time</p> */}
                        <p className='flex gap-2 items-center text-muted-foreground text-sm '><MapPin width={16} /> {profile.country} </p>
                    </div>
                </div>
                <div className='flex flex-col md:flex-row gap-8'>

                    <section className='w-full md:w-3/4 h-fit flex flex-col gap-5 px-8 py-6 rounded-xl ring-1 ring-gray-200 dark:ring-gray-800 shadow bg-white dark:bg-gray-900'>


                        <div className="flex flex-wrap items-center justify-between gap-2 ">
                            <div className="flex flex-col gap-2">
                                <h1 className='text font-bold'>Bio</h1>
                                <p>{profile.bio}</p>
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
                        {/* {profile.languages?.length ?
                            <>
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
                            </>
                            :
                            null
                        } */}

                    </section>
                    <section className='w-full md:w-2/6 md:min-w-[340px] p-6 flex flex-col gap-4 rounded-xl ring-1 ring-gray-200 dark:ring-gray-800 shadow bg-white dark:bg-gray-900'>
                        <h2 className='text font-semibold'>Terms</h2>
                        <div className="flex justify-between items-center text-sm">
                            <p className='flex items-center gap-4 text-zinc-500'><CalendarCheck width={18} /> Available</p>
                            <span>
                                {profile.available ? <CircleCheck strokeWidth={1.5} width={18} className='fill-green-200 text-green-500' /> : <CircleX strokeWidth={1.5} width={18} className='fill-red-200 text-red-500' />}
                            </span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <p className='flex items-center gap-4 text-zinc-500'><Hourglass width={18} />Hourly rate</p>
                            <span>
                                {profile.hourly_rate ? '$' + profile.hourly_rate : "N/A"}
                            </span>
                        </div>
                        <Separator />
                        <h2 className='text font-semibold'>Conditions</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 gap-x-8">
                            <div className="flex justify-between items-center text-sm ">
                                <p className='flex items-center gap-4 text-zinc-500'><BriefcaseBusiness width={18} /> Employment</p>
                                <span>
                                    {profile.employment ? <CircleCheck strokeWidth={1.5} width={18} className='fill-green-200 text-green-500' /> : <CircleX strokeWidth={1.5} width={18} className='fill-red-200 text-red-500' />}
                                </span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <p className='flex items-center gap-4 text-zinc-500'><Bird width={18} /> Freelance</p>
                                <span>
                                    {profile.freelance ? <CircleCheck strokeWidth={1.5} width={18} className='fill-green-200 text-green-500' /> : <CircleX strokeWidth={1.5} width={18} className='fill-red-200 text-red-500' />}
                                </span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <p className='flex items-center gap-4 text-zinc-500'><Laptop width={18} /> Remote</p>
                                <span>
                                    {profile.remote ? <CircleCheck strokeWidth={1.5} width={18} className='fill-green-200 text-green-500' /> : <CircleX strokeWidth={1.5} width={18} className='fill-red-200 text-red-500' />}
                                </span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <p className='flex items-center gap-4 text-zinc-500'><Building width={18} />On-site</p>
                                <span>
                                    {profile.on_site ? <CircleCheck strokeWidth={1.5} width={18} className='fill-green-200 text-green-500' /> : <CircleX strokeWidth={1.5} width={18} className='fill-red-200 text-red-500' />}
                                </span>
                            </div>
                        </div>

                        {(profile.website_url || profile.linkedin_url || profile.github_url || profile.gitlab_url || profile.twitter_url) && <>
                            <Separator />
                            <h2 className='text font-semibold'>Contacts</h2>
                        </>}
                        {isEmployer ?
                            <div className="flex flex-col divide-y text-muted-foreground divide-zinc-200 ">

                                <div className="flex  py-2 group">
                                    <p className=''>Email</p>
                                    <Copy onClick={onMailCopy} width={20} className='cursor-pointer ml-auto mr-3' />
                                    <Link href={`mailto:${profile.email}`} target='_blank'>
                                        <Mail width={20} className=' ' />
                                    </Link>
                                </div>

                                {profile.website_url &&
                                    <Link href='' target='_blank' className="flex justify-between py-2 group">
                                        <p className=''>Website</p>
                                        <ArrowUpRight width={20} className='relative group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition' />
                                    </Link>
                                }
                                {profile.linkedin_url && <Link href={profile.linkedin_url} target='_blank' className="flex justify-between py-2 group">
                                    <p className=''>LinkedIn</p>
                                    <ArrowUpRight width={20} className='relative group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition' />
                                </Link>}
                                {profile.github_url && <Link href={profile.github_url} target='_blank' className="flex justify-between py-2 group">
                                    <p className=''>Github</p>
                                    <ArrowUpRight width={20} className='relative group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition' />
                                </Link>}
                                {profile.gitlab_url && <Link href={profile.gitlab_url} target='_blank' className="flex justify-between py-2 group">
                                    <p className=''>Gitlab</p>
                                    <ArrowUpRight width={20} className='relative group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition' />
                                </Link>}
                                {profile.twitter_url && <Link href={profile.twitter_url} target='_blank' className="flex justify-between py-2 group">
                                    <p className=''>Twitter</p>
                                    <ArrowUpRight width={20} className='relative group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition' />
                                </Link>}

                            </div>
                            :
                            <>
                                <Link href='/pricing'
                                    className='w-full h-40 bg-zinc-100 border-dashed  border-zinc-300 text-zinc-400 border-2 rounded-md flex flex-col items-center
                             justify-center gap-2 text-center p-2  hover:border-zinc-400 transition'
                                >
                                    <Lock />
                                    <p className='text-sm'>Become an employer to view this information</p>
                                </Link>
                                {/* <button onClick={() => navigator.clipboard.writeText("i.begoidze@gmail.com")} className="flex justify-between text-muted-foreground py-2 group">
                                    <p className=''>i.begoidze@gmail.com</p>
                                    <Copy width={18} className='relative ' />
                                </button> */}
                            </>

                        }



                    </section>


                </div>

            </div >
        </>
    );
}





export default DeveloperView