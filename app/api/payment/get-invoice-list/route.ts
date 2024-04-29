import { NextApiRequest } from "next";

import Stripe from "stripe"


export const stripe = new Stripe(process.env.STRIPE_SECRET!, {
    apiVersion: '2024-04-10',
    typescript: true
})


export async function GET(req: NextApiRequest) {
    let { searchParams } = new URL(req.url as string)
    const customerId = searchParams.get('customer_id')
    if (!customerId) return Response.json("No invoice list found", { status: 400 })
    const invoiceList = await stripe.invoices.list({ customer: customerId })

    return Response.json(invoiceList, { status: 200 })
}