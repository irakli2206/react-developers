import Stripe from 'stripe'
import { stripe } from '@/lib/stripe'
import { NextApiRequest } from 'next'

export async function GET(req: NextApiRequest) {

    let { searchParams } = new URL(req.url as string)
    const subscriptionId = searchParams.get('subscription_id')
    if (!subscriptionId) return Response.json("No subscription found", { status: 400 })
    const subscription = await stripe.subscriptions.retrieve(subscriptionId)

    return Response.json(subscription, { status: 200 })

}