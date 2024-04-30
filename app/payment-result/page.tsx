import { Separator } from '@/components/ui/separator'
import { ArrowDownToLine, ArrowRight, CheckCircle, CheckCircle2, CircleAlert, CircleX } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import React from 'react'
import { getInvoice, getSessionData } from './action'
import Stripe from 'stripe'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { capitalize } from '@/utils/util'


type SearchParams = {
    success: string
    session_id: string
}

type Props = {
    searchParams: SearchParams
}



const PaymentResult = async ({ searchParams }: Props) => {
    let session
    let invoice

    const isSuccess = searchParams.success === 'true' ? true : false
    if (isSuccess) session = await getSessionData(searchParams.session_id)
    if (session && session.invoice) invoice = await getInvoice(session.invoice as string)
    return (
        <section className='py-48 w-full'>
            {
                session ?
                    <div className="bg-zinc-50 shadow p-4 max-w-[400px] mx-auto rounded-lg">
                        <header className='flex flex-col items-center gap-2 text-center'>
                            <div className="bg-green-100 w-fit p-2 rounded-full mb-2">
                                <CheckCircle2 className='text-green-100 fill-green-400 w-8 h-8' />
                            </div>
                            <p className='  font-light text-muted-foreground'>Successful payment!</p>
                            <h1 className='font-medium text-xl'>Employer Subscription Plan</h1>
                        </header>
                        <Separator className='my-6' />
                        <main className='flex flex-col gap-4'>
                            <h1 className='font-medium  '>
                                Payment details
                            </h1>
                            <div className="flex flex-col gap-2">
                                {session.payment_status && <div className="flex justify-between">
                                    <p className='text-muted-foreground font-light'>Status</p>
                                    <p className='font-medium'>{session.payment_status[0].toUpperCase() + session.payment_status.slice(1)}</p>
                                </div>}
                                {session.payment_method_types && <div className="flex justify-between">
                                    <p className='text-muted-foreground font-light'>Payment method</p>
                                    <p className='font-medium'>{session.payment_method_types[0][0].toUpperCase() + session.payment_method_types[0].slice(1)}</p>
                                </div>}
                                {session.expires_at && <div className="flex justify-between">
                                    <p className='text-muted-foreground font-light'>Type</p>
                                    <p className='font-medium'>{capitalize(session.mode)}</p>
                                </div>}
                                {session.amount_total && <div className="flex justify-between mt-4 items-end">
                                    <p className='text-muted-foreground font-light'>Total payment</p>
                                    <p className='font-semibold text-lg'>{`$${(session.amount_total / 100).toFixed(2)}`}</p>
                                </div>}

                            </div>
                        </main>
                        <Separator className='my-6' />
                        <footer className='flex gap-2 justify-between'>
                            <Button variant='outline' className='w-full '>
                                <Link href={invoice?.invoice_pdf as string} target='_blank' className='flex gap-2 items-center'><ArrowDownToLine width={16} /> Download Invoice</Link>
                            </Button>
                            <Button variant='default' className='w-full ' asChild>
                                <Link href={'/developers'} className='flex gap-2 items-center'>Browse Developers  </Link>
                            </Button>
                        </footer>
                        {/* <div className="product Box-root">
                    <div className="description Box-root">
                        <h3>Subscription to starter plan successful!</h3>
                    </div>
                </div>
                <form action="api/payment/create-portal-session" method="POST">
                    <input
                        type="hidden"
                        id="session-id"
                        name="session_id"
                        value={searchParams.session_id}
                    />
                    <button id="checkout-and-portal-button" type="submit">
                        Manage your billing information
                    </button>
                </form> */}
                    </div>
                    :
                    <div className="bg-zinc-50 shadow p-4 max-w-[400px] mx-auto rounded-lg ">
                        <header className='flex flex-col items-center gap-2 text-center'>
                            <div className="bg-red-100 w-fit p-2 rounded-full mb-2">
                                <CircleAlert className='text-red-100 fill-red-500 w-8 h-8' />
                            </div>
                            <p className='  font-light text-muted-foreground'>An error occurred!</p>
                            <h1 className='font-medium text-xl'>Employer Subscription Plan</h1>
                        </header>


                        <Separator className='my-6' />
                        <footer className='flex gap-2 justify-between'>

                            <Button variant='default' className='w-full ' asChild>
                                <Link href='/pricing' className='flex gap-2 items-center'>Try Again</Link>
                            </Button>
                        </footer>
                        {/* <div className="product Box-root">
                <div className="description Box-root">
                    <h3>Subscription to starter plan successful!</h3>
                </div>
            </div>
            <form action="api/payment/create-portal-session" method="POST">
                <input
                    type="hidden"
                    id="session-id"
                    name="session_id"
                    value={searchParams.session_id}
                />
                <button id="checkout-and-portal-button" type="submit">
                    Manage your billing information
                </button>
            </form> */}
                    </div>
            }


        </section>
    )
}

export default PaymentResult