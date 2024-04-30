import { NextApiRequest, NextApiResponse } from "next";

import Stripe from "stripe"


export const stripe = new Stripe(process.env.STRIPE_SECRET!, {
    apiVersion: '2024-04-10',
    typescript: true
})


export async function POST(
    req: Request,
    res: NextApiResponse
) {
    const data = req.body
    const subscription = await stripe.subscriptions.update(data.subscriptionId, {
        cancel_at_period_end: true
    })

    return Response.json(subscription, {status: 200});
}