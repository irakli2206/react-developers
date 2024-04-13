import { Input } from '@/components/ui/input'
import React from 'react'
import { Textarea } from "@/components/ui/textarea"
import { Button } from '@/components/ui/button'
import { LuGithub, LuGitlab, LuLinkedin, LuTwitter, LuGlobe  } from "react-icons/lu";
import { CiGlobe } from "react-icons/ci";
import { Globe, Linkedin, Save } from 'lucide-react';



const Contacts = () => {
    return (
        <div className='w-full'>
            <div className="flex justify-between">
                <div className="">
                    <h3 className="text-base font-semibold leading-7 text-gray-900">Contact Links</h3>
                    <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Make it easier for talent experts to get in touch with you</p>
                </div>
                <Button size='sm' className='rounded-full mt-auto  '><Save size='16px' className='mr-2' /> Save changes</Button>
            </div>
            <div className="mt-4 border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                    <div className="px-4 py-5 flex items-center sm:gap-4 sm:px-0">
                        <div className='flex flex-col gap-1 flex-1 text-sm'>
                            <dt className="  font-medium leading-6 text-gray-900">LinkedIn</dt>
                        </div>
                        <div className='flex-1 relative'>
                            <Input className='pl-10 h-9 drop-shadow-sm relative z-50 bg-transparent' type="text" placeholder="John Doe" />
                            <Linkedin className='absolute top-2.5 left-4 w-4 h-4 text-zinc-400 fill-gray-200' />
                        </div>
                    </div>
                    <div className="px-4 py-5 flex items-center sm:gap-4 sm:px-0">
                        <div className='flex flex-col gap-1 flex-1 text-sm'>
                            <dt className="  font-medium leading-6 text-gray-900">Github</dt>
                        </div>
                        <div className='flex-1 relative'>
                            <Input className='pl-10 h-9 drop-shadow-sm relative z-50 bg-transparent' type="text" placeholder="John Doe" />
                            <LuGithub className='absolute top-2.5 left-4 w-4 h-4 text-zinc-400 fill-gray-200' />
                        </div>
                    </div>
                    <div className="px-4 py-5 flex items-center sm:gap-4 sm:px-0">
                        <div className='flex flex-col gap-1 flex-1 text-sm'>
                            <dt className="  font-medium leading-6 text-gray-900">Gitlab</dt>
                        </div>
                        <div className='flex-1 relative'>
                            <Input className='pl-10 h-9 drop-shadow-sm relative z-50 bg-transparent' type="text" placeholder="John Doe" />
                            <LuGitlab className='absolute top-2.5 left-4 w-4 h-4 text-zinc-400 fill-gray-200' />
                        </div>
                    </div>

                    <div className="px-4 py-5 flex items-center sm:gap-4 sm:px-0">
                        <div className='flex flex-col gap-1 flex-1 text-sm'>
                            <dt className="  font-medium leading-6 text-gray-900">Website</dt>
                        </div>
                        <div className='flex-1 relative'>
                            <Input className='pl-10 h-9 drop-shadow-sm relative z-50 bg-transparent' type="text" placeholder="John Doe" />
                            <Globe className='absolute top-2.5 left-4 w-4 h-4 text-zinc-400 fill-gray-200'/>
                        </div>
                    </div>
                    <div className="px-4 py-5 flex items-center sm:gap-4 sm:px-0">
                        <div className='flex flex-col gap-1 flex-1 text-sm'>
                            <dt className="  font-medium leading-6 text-gray-900">Twitter</dt>
                        </div>
                        <div className='flex-1 relative'>
                            <Input className='pl-10 h-9 drop-shadow-sm relative z-50 bg-transparent' type="text" placeholder="John Doe" />
                            <LuTwitter className='absolute top-2.5 left-4 w-4 h-4 text-zinc-400 fill-gray-200' />
                        </div>
                    </div>

                </dl>
            </div>
        </div>
    )
}

export default Contacts