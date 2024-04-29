import { getProfileData } from "@/app/action";
import { BASE_URL } from "@/env";
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
    const user = await getProfileData()
    // For demonstration purposes, we're using the Checkout session to retrieve the customer ID.
    // Typically this is stored alongside the authenticated user in your database.
    // const session_id = (await req.formData()).get('session_id');
    // console.log('SESSION', session_id)
    // const checkoutSession = await stripe.checkout.sessions.retrieve(session_id);

    // This is the url to which the customer will be redirected when they are done
    // managing their billing with the portal.
    const returnUrl = `${BASE_URL}/dashboard/billing`;

    const portalSession = await stripe.billingPortal.sessions.create({
        customer: user.stripe_customer_id,
        return_url: returnUrl,
    });

    return Response.redirect(portalSession.url, 303)
}