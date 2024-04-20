import { stripe } from "@/lib/stripe";
import { NextApiRequest } from "next";


export async function GET(req: NextApiRequest) {
    let { searchParams } = new URL(req.url as string)
    const customerId = searchParams.get('customer_id')
    if (!customerId) return Response.json("No invoice list found", { status: 400 })
    const invoiceList = await stripe.invoices.list({customer: customerId})

    return Response.json(invoiceList, { status: 200 })
}