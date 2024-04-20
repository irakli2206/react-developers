import React from 'react'
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Link from 'next/link'

type Props = {
    accountType: 'employer' | 'developer'
}

const BecomeEmployerOffer = ({ accountType }: Props) => {
    return (
        <>
            {
                accountType === 'developer' && <Card>
                    <CardHeader className="p-2 pt-0 md:p-4">
                        <CardTitle>Start Hiring</CardTitle>
                        <CardDescription>
                            Unlock all features and get unlimited access to our developer database.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-2 pt-0 md:p-4 md:pt-0 gap-2 flex flex-col">
                        <Button size="sm" variant='outline' className="w-full" asChild>
                            <Link href='https://calendly.com/iraklibego1/45min' target='_blank'>
                                Book call
                            </Link>
                        </Button>
                        <Button size="sm" className="w-full" asChild>
                            <Link href='/pricing'>
                                Upgrade

                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            }
        </>


    )
}

export default BecomeEmployerOffer