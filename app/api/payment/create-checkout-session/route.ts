import { NextApiRequest, NextApiResponse } from "next";
import {stripe} from '@/lib/stripe'

const YOUR_DOMAIN = 'http://localhost:3000';


export async function POST(
    req: Request,
    res: NextApiResponse
) {
    let formData = await req.formData()
    let userId = formData.get('user_id')
    console.log('FORMDATA', formData.get('user_id'))
    // return Response.json({ message: 'Hellos from Next.js!' })
    const prices = await stripe.prices.list({
        lookup_keys: [formData.get('lookup_key')],
        expand: ['data.product'],
    });
    const session = await stripe.checkout.sessions.create({
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
        success_url: `${YOUR_DOMAIN}/payment-result?success=true&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${YOUR_DOMAIN}?canceled=true`,
    });

    return Response.redirect(session.url!);
}