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

const invoices = [
    {
        invoice: "INV001",
        paymentStatus: "Paid",
        totalAmount: "$250.00",
        paymentMethod: "Credit Card",
    },
    {
        invoice: "INV002",
        paymentStatus: "Pending",
        totalAmount: "$150.00",
        paymentMethod: "PayPal",
    },
    {
        invoice: "INV003",
        paymentStatus: "Unpaid",
        totalAmount: "$350.00",
        paymentMethod: "Bank Transfer",
    },
    {
        invoice: "INV004",
        paymentStatus: "Paid",
        totalAmount: "$450.00",
        paymentMethod: "Credit Card",
    },
    {
        invoice: "INV005",
        paymentStatus: "Paid",
        totalAmount: "$550.00",
        paymentMethod: "PayPal",
    },
    {
        invoice: "INV006",
        paymentStatus: "Pending",
        totalAmount: "$200.00",
        paymentMethod: "Bank Transfer",
    },
    {
        invoice: "INV007",
        paymentStatus: "Unpaid",
        totalAmount: "$300.00",
        paymentMethod: "Credit Card",
    },
]

const Billing = async () => {
    const profile = await getProfileData()

    return (
        <>
            {profile.account_type === 'developer' && <Card className="max-w-[400px] absolute z-50 left-1/2 drop-shadow-md -translate-x-1/2 top-1/4">
                <CardHeader>
                    <CardTitle>Hey, you're just a developer!</CardTitle>
                    <CardDescription>To access billing, buy our subscription first. Questions? Schedule a call!</CardDescription>
                </CardHeader>

                <CardFooter className="flex gap-4 justify-end">
                    <Button variant="outline">Book call</Button>
                    <Button>Subscribe</Button>
                </CardFooter>
            </Card>}

            <div

                className={classNames('w-full ', {
                    'opacity-30 pointer-events-none select-none': profile.account_type === 'developer'
                })}>

                <div className="flex justify-between">
                    <div className="">
                        <h3 className="text-base font-semibold leading-7 text-gray-900">Billing</h3>
                        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Information about your payment history</p>
                    </div>
                    {/* <Button onClick={handleSave} type='submit' size='sm' className='rounded-full mt-auto  '>Save changes</Button> */}
                </div>
                <div className="mt-4 border-t border-gray-200">



                    <Table>
                        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">Invoice</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Method</TableHead>
                                <TableHead className="text-right">Amount</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {invoices.map((invoice) => (
                                <TableRow key={invoice.invoice}>
                                    <TableCell className="font-medium">{invoice.invoice}</TableCell>
                                    <TableCell>{invoice.paymentStatus}</TableCell>
                                    <TableCell>{invoice.paymentMethod}</TableCell>
                                    <TableCell className="text-right">{invoice.totalAmount}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TableCell colSpan={3}>Total</TableCell>
                                <TableCell className="text-right">$2,500.00</TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                </div>
            </div>
        </>
    )
}

export default Billing