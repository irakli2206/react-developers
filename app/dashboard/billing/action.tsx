'use server'

import { BASE_URL } from '@/env'
import Stripe from 'stripe'

export async function getInvoiceList(customerId: string) {
    
    const invoiceListRes = await fetch(`${BASE_URL}/api/payment/get-invoice-list?customer_id=${customerId}`)
    const invoiceList: Stripe.ApiList<Stripe.Invoice> = await invoiceListRes.json()
    console.log(invoiceList)
    return invoiceList.data
}