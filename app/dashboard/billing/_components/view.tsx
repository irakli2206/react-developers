import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { getProfileData } from '@/app/action'
import classNames from 'classnames'
import { capitalize, formatPrice } from '@/utils/util'
import Link from 'next/link'
import { getInvoiceList } from '../action'
import Stripe from 'stripe'

const invoicesDummy = [
    {
        invoice: "INV001",
        paymentStatus: "Paid",
        totalAmount: "$250.00",
        product: "Laptop",
    },
    {
        invoice: "INV002",
        paymentStatus: "Pending",
        totalAmount: "$150.00",
        product: "Headphones",
    },
    {
        invoice: "INV003",
        paymentStatus: "Unpaid",
        totalAmount: "$350.00",
        product: "Smartphone",
    },
    {
        invoice: "INV004",
        paymentStatus: "Paid",
        totalAmount: "$450.00",
        product: "Tablet",
    },
    {
        invoice: "INV005",
        paymentStatus: "Paid",
        totalAmount: "$550.00",
        product: "Camera",
    },
    {
        invoice: "INV006",
        paymentStatus: "Pending",
        totalAmount: "$200.00",
        product: "Smartwatch",
    },
    {
        invoice: "INV007",
        paymentStatus: "Unpaid",
        totalAmount: "$300.00",
        product: "Printer",
    },
];

type Props = {
    isPageLocked: boolean
    invoices: Stripe.Invoice[] | undefined
    invoicesTotal: number
}

const BillingView = async ({ invoices, invoicesTotal, isPageLocked }: Props) => {


    return (
        <>
            {isPageLocked && <Card className="max-w-[400px] absolute z-50 left-1/2  -translate-x-1/2 top-1/4">
                <CardHeader>
                    <CardTitle>Hey, you're just a developer!</CardTitle>
                    <CardDescription>To access billing, buy our subscription first. Questions? Schedule a call!</CardDescription>
                </CardHeader>

                <CardFooter className="flex gap-4 justify-end">
                    <Button variant="outline" asChild>
                        <Link href='https://calendly.com/iraklibego1/45min' target='_blank'>Book call</Link>
                    </Button>
                    <Button asChild>
                        <Link href='/pricing'>Subscribe</Link>
                    </Button>
                </CardFooter>
            </Card>}

            <div

                className={classNames('w-full ', {
                    'opacity-30 pointer-events-none select-none': isPageLocked
                })}>

                <div className="flex justify-between">
                    <div className="">
                        <h3 className="text-base font-semibold leading-7 text-gray-900">Billing</h3>
                        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Information about your payment history</p>
                    </div>
                    <form action="/api/payment/create-portal-session" method='post' className='mt-auto'>
                        <Button type='submit' size='sm' className='rounded-full ' >
                            Manage subscription
                        </Button>
                    </form>
                </div>
                <div className="mt-4 border-t border-gray-200">



                    <Table>
                        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">Invoice</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Product</TableHead>
                                <TableHead className="text-right">Amount</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isPageLocked ? invoicesDummy.map((invoice) => (
                                <TableRow key={invoice.invoice}>
                                    <TableCell className="font-medium">{invoice.invoice}</TableCell>
                                    <TableCell>{invoice.paymentStatus}</TableCell>
                                    <TableCell>{invoice.product}</TableCell>
                                    <TableCell className="text-right">{invoice.totalAmount}</TableCell>
                                </TableRow>
                            )) :
                                invoices?.map((invoice) => {

                                    return (
                                        <TableRow key={invoice.id}>
                                            <TableCell className="font-medium">{invoice.id}</TableCell>
                                            <TableCell>{capitalize(invoice.status as string)}</TableCell>
                                            <TableCell>{invoice.lines.data[0].description}</TableCell>
                                            <TableCell className="text-right">{`$${(invoice.amount_due / 100).toFixed(2)}`}</TableCell>
                                        </TableRow>
                                    )
                                })
                            }

                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TableCell colSpan={3}>Total</TableCell>
                                <TableCell className="text-right">{isPageLocked ? "$2,500.00" : formatPrice(invoicesTotal)}</TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                </div>
            </div>
        </>
    )
}

export default BillingView