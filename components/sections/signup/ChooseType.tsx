
import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { BriefcaseBusiness, CircleCheck, UserRoundSearch } from 'lucide-react'
import { AccountTypeT } from '@/types/general'
import classnames from 'classnames'
import { FaCircleCheck } from "react-icons/fa6";

type Props = {
    accountType: AccountTypeT | null,
    setAccountType: (accountType: AccountTypeT) => void
    setWizardStep: (wizardStep: number) => void
}

const ChooseType = ({ accountType, setAccountType, setWizardStep }: Props) => {
    console.log(accountType)
    return (
        <section className=" text-center ">
            <div className="flex flex-col m-auto">
                <h1 className='scroll-m-20 text-3xl font-bold tracking-tight '>Choose your account type</h1>
                <p className='text-zinc-500 mt-2'>Are you looking for a job or for developers?</p>

            </div>

            <div className="flex flex-col gap-4 mt-6">
                <Card className={classnames('relative transition bg-zinc-50 cursor-pointer hover:bg-zinc-50/20', {
                    'ring-2 ring-black': accountType === 'developer'
                })}
                    onClick={() => setAccountType('developer')}
                >
                    <CardContent className='flex flex-row gap-4 items-center p-4'>
                        <div className="w-10 h-10 rounded-md flex justify-center items-center ring-1 ring-zinc-300  ">
                            <BriefcaseBusiness size='18px' />

                        </div>
                        <p className='font-semibold'>I'm a developer</p>
                    </CardContent>
                    {accountType === 'developer' ? <FaCircleCheck size='24px' className='absolute -top-2 -right-2 bg-white rounded-full' /> : null}

                </Card>

                <Card className={classnames('relative transition bg-zinc-50 cursor-pointer hover:bg-zinc-50/20', {
                    'ring-2 ring-black': accountType === 'employer'
                })}
                    onClick={() => setAccountType('employer')}>
                    <CardContent className='flex flex-row gap-4 items-center p-4'>
                        <div className="w-10 h-10 rounded-md flex justify-center items-center ring-1 ring-zinc-300  ">
                            <UserRoundSearch size='18px' />

                        </div>
                        <p className='font-semibold'>I'm an employer</p>
                    </CardContent>
                    {accountType === 'employer' ? <FaCircleCheck size='24px' className='absolute -top-2 -right-2 bg-white rounded-full' /> : null}
                </Card>
            </div>

            <Button className='w-full mt-8' onClick={() => setWizardStep(1)}>Continue</Button>
        </section>
    )
}

export default ChooseType