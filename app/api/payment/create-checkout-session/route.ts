import { NextApiRequest, NextApiResponse } from "next";
 import { getProfileData } from "@/app/action";
import { BASE_URL } from "@/env";

import Stripe from "stripe"


export const stripe = new Stripe(process.env.STRIPE_SECRET!, {
    apiVersion: '2024-04-10',
    typescript: true
})

export async function POST(
    req: Request,
    res: NextApiResponse
) {
    const userProfile = await getProfileData()
    let formData = await req.formData()
    let userId = formData.get('user_id') as string
    console.log('FORMDATA', formData.get('user_id'))
    // return Response.json({ message: 'Hellos from Next.js!' })
    const prices = await stripe.prices.list({
        lookup_keys: [formData.get('lookup_key') as string],
        expand: ['data.product'],
    });
    const session = await stripe.checkout.sessions.create({
        customer: userProfile.stripe_customer_id || undefined,
        billing_address_collection: 'auto',
        line_items: [
            {
                price: prices.data[0].id,
                // For metered billing, do not pass quantity
                quantity: 1,

            },
        ],
        // metadata: {
        //     "user_id": userId ?? "test",
        // },
        subscription_data: {
            metadata: {
                "user_id": userId,
            }
        },
        mode: 'subscription',
        success_url: `${BASE_URL}/payment-result?success=true&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${BASE_URL}?canceled=true`,
    });

    return Response.redirect(session.url!);
}