'use server'
import Stripe from 'stripe'

export async function getSessionData(sessionId: string) {
    const sessionRes = await fetch(`http://localhost:3000/api/payment/get-session?session_id=${sessionId}`)
    const sessionData: Stripe.Checkout.Session = await sessionRes.json()

    return sessionData

}

export async function getInvoice(invoiceId: string) {
    const invoiceRes = await fetch(`http://localhost:3000/api/payment/get-invoice?invoice_id=${invoiceId}`)
    const invoiceData: Stripe.Invoice = await invoiceRes.json()

    return invoiceData

}