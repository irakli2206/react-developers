import { stripe } from "@/lib/stripe";
import { NextApiRequest } from "next";

export async function GET(req: NextApiRequest) {
    let { searchParams } = new URL(req.url as string)
    const sessionId = searchParams.get('session_id')
    if (!sessionId) return Response.json("No session found", { status: 400 })
    const session = await stripe.checkout.sessions.retrieve(sessionId)

    return Response.json(session, { status: 200 })
}