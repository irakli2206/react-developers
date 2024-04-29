 import { NextApiRequest } from "next";

 import Stripe from "stripe"


 export const stripe = new Stripe(process.env.STRIPE_SECRET!, {
     apiVersion: '2024-04-10',
     typescript: true
 })

 
export async function GET(req: NextApiRequest) {
    let { searchParams } = new URL(req.url as string)
    const invoiceId = searchParams.get('invoice_id')
    if (!invoiceId) return Response.json("No invoice found", { status: 400 })
    const invoice = await stripe.invoices.retrieve(invoiceId)

    return Response.json(invoice, { status: 200 })
}