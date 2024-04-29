'use server'

import Stripe from 'stripe'

export async function getInvoiceList(customerId: string) {
    const BASE_URL = process.env.VERCEL_URL || process.env.NEXT_PUBLIC_URL
    const invoiceListRes = await fetch(`${BASE_URL}/api/payment/get-invoice-list?customer_id=${customerId}`)
    const invoiceList: Stripe.ApiList<Stripe.Invoice> = await invoiceListRes.json()
    return invoiceList.data
}