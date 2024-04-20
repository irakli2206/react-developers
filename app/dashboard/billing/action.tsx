'use server'

import Stripe from 'stripe'

export async function getInvoiceList(customerId: string){
    const invoiceListRes = await fetch(`http://localhost:3000/api/payment/get-invoice-list?customer_id=${customerId}`)
    const invoiceList: Stripe.ApiList<Stripe.Invoice> = await invoiceListRes.json()
    
    return invoiceList.data
}