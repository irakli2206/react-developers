import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from '@/lib/stripe'

const YOUR_DOMAIN = 'http://localhost:3000';


export async function POST(
    req: Request,
    res: NextApiResponse
) {
    const data = req.body
    console.log('CANCELLATION DATA', data)
    const subscription = await stripe.subscriptions.update(data.subscriptionId, {
        cancel_at_period_end: true
    })

    return Response.json(subscription, {status: 200});
}