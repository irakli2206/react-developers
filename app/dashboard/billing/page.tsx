import React, { Suspense } from 'react'
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
import { getInvoiceList } from './action'
import { capitalize, formatPrice } from '@/utils/util'
import Link from 'next/link'
import Loading from '../loading'
import BillingView from './_components/view'

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

const Billing = async () => {
    const profile = await getProfileData()
    let invoices
    let invoicesTotal = 0

    const isPageLocked = profile.account_type === 'developer'

    if (!isPageLocked) {
        invoices = await getInvoiceList(profile.stripe_customer_id as string)

    }

    if (invoices) {
        invoices.forEach(e => {
            invoicesTotal += e.amount_due / 100
        })
    }

    return (
        <Suspense fallback={<Loading />}>
            <BillingView invoices={invoices} isPageLocked={isPageLocked} invoicesTotal={invoicesTotal} />
        </Suspense>
    )
}

export default Billing