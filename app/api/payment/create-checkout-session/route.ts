import { NextApiRequest, NextApiResponse } from "next";

const YOUR_DOMAIN = 'http://localhost:3000';
const stripe = require('stripe')('sk_test_51P6ZXCFtDuZ9TWJZjdaMzL1W77maw19YQFoSFygjcqR3VqTMIkKnaRr8Q0sKeEZ1uOVd6skIrlIZBmo3jj5BNj2500JmBR6bfG');

export async function POST(
    req: NextApiRequest,
    res: NextApiResponse
) {
    // return Response.json({ message: 'Hellos from Next.js!' })
    const prices = await stripe.prices.list({
        lookup_keys: [req.body.lookup_key],
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
        mode: 'subscription',
        success_url: `${YOUR_DOMAIN}/?success=true&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${YOUR_DOMAIN}?canceled=true`,
    });

    return Response.redirect(session.url);
}