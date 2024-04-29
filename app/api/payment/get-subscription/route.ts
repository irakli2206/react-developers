 
import { NextApiRequest } from 'next'


import Stripe from "stripe"


export const stripe = new Stripe(process.env.STRIPE_SECRET!, {
    apiVersion: '2024-04-10',
    typescript: true
})

export async function GET(req: NextApiRequest) {

    let { searchParams } = new URL(req.url as string)
    const subscriptionId = searchParams.get('subscription_id')
    if (!subscriptionId) return Response.json("No subscription found", { status: 400 })
    const subscription = await stripe.subscriptions.retrieve(subscriptionId)

    return Response.json(subscription, { status: 200 })

}