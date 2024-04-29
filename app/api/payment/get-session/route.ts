import { NextApiRequest } from "next";


import Stripe from "stripe"


export const stripe = new Stripe(process.env.STRIPE_SECRET!, {
    apiVersion: '2024-04-10',
    typescript: true
})

export async function GET(req: NextApiRequest) {
    let { searchParams } = new URL(req.url as string)
    const sessionId = searchParams.get('session_id')
    if (!sessionId) return Response.json("No session found", { status: 400 })
    const session = await stripe.checkout.sessions.retrieve(sessionId)

    return Response.json(session, { status: 200 })
}