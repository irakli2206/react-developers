import React from 'react'
import { Input } from '@/components/ui/input'
import { Switch } from "@/components/ui/switch"
import { Separator } from '@/components/ui/separator'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'

const Preferences = () => {
    return (
        <div className='w-full '>
            <div className="flex justify-between">
                <div className="">
                    <h3 className="text-base font-semibold leading-7 text-gray-900">Account Preferences</h3>
                    <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">You're available for new opportunities and would like to appear in our listings</p>
                </div>
                <Button size='sm' className='rounded-full mt-auto  '>Save changes</Button>
            </div>

            <div className="mt-4 border-y  border-gray-100">
                <dl className=" grid grid-cols-1 lg:grid-cols-2 gap-x-16 divide-gray-100">
                    <div className="px-4 py-5 flex items-center sm:gap-4 sm:px-0">
                        <div className='flex flex-col gap-1 flex-1 text-sm'>
                            <dt className="  font-medium leading-6 text-gray-900">Freelance contracts</dt>
                            <dd className="  text-zinc-500 ">Are you open to freelance contracts?</dd>
                        </div>
                        {/* <Input className='flex-1 h-9 drop-shadow-sm' type="text" placeholder="John Doe" /> */}
                        <Switch
                            checked={true}
                        />
                    </div>
                    <div className="px-4 py-5 flex items-center sm:gap-4 sm:px-0">
                        <div className='flex flex-col gap-1 flex-1 text-sm'>
                            <dt className="  font-medium leading-6 text-gray-900">Employment</dt>
                            <dd className="  text-zinc-500 ">Are you open to employment?</dd>
                        </div>
                        <Switch
                            checked={true}
                        />
                    </div>

                    <div className="px-4 py-5 flex items-center sm:gap-4 sm:px-0">
                        <div className='flex flex-col gap-1 flex-1 text-sm'>
                            <dt className="  font-medium leading-6 text-gray-900">Remote</dt>
                            <dd className="  text-zinc-500 ">Are you open to work remotely?</dd>
                        </div>
                        <Switch
                            checked={false}
                        />
                    </div>
                    <div className="px-4 py-5 flex items-center sm:gap-4 sm:px-0">
                        <div className='flex flex-col gap-1 flex-1 text-sm'>
                            <dt className="  font-medium leading-6 text-gray-900">On site</dt>
                            <dd className="  text-zinc-500 ">Are you open to work on site?</dd>
                        </div>
                        <Switch
                            checked={true}
                        />
                    </div>

                </dl>
            </div>
            <div>
                <dl>
                    <div className=" py-5 flex flex-col gap-6">
                        <div className='flex flex-col gap-1 flex-1 text-sm'>
                            <dt className="  font-medium leading-6 text-gray-900">Role level</dt>
                            <dd className="  text-zinc-500 ">Select seniority levels suitable to you</dd>
                        </div>
                        <div className="flex gap-8">
                            <div className="flex items-center space-x-2">
                                <label
                                    htmlFor="junior"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Junior
                                </label>
                                <Checkbox id="junior" />

                            </div>
                            <div className="flex items-center space-x-2">
                                <label
                                    htmlFor="mid"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Mid
                                </label>
                                <Checkbox id="mid" />

                            </div>
                            <div className="flex items-center space-x-2">
                                <label
                                    htmlFor="senior"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Senior
                                </label>
                                <Checkbox id="senior" />

                            </div>
                        </div>

                    </div>
                </dl>
            </div>
        </div>
    )
}

export default Preferences