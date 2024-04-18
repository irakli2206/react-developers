import { NextApiRequest, NextApiResponse } from "next";

const YOUR_DOMAIN = 'http://localhost:3000';
const stripe = require('stripe')('sk_test_51P6ZXCFtDuZ9TWJZjdaMzL1W77maw19YQFoSFygjcqR3VqTMIkKnaRr8Q0sKeEZ1uOVd6skIrlIZBmo3jj5BNj2500JmBR6bfG');

export async function POST(
    req: Request,
    res: NextApiResponse
) {

    // For demonstration purposes, we're using the Checkout session to retrieve the customer ID.
    // Typically this is stored alongside the authenticated user in your database.
    const session_id = (await req.formData()).get('session_id');
    console.log('SESSION', session_id)
    const checkoutSession = await stripe.checkout.sessions.retrieve(session_id);

    // This is the url to which the customer will be redirected when they are done
    // managing their billing with the portal.
    const returnUrl = YOUR_DOMAIN;

    const portalSession = await stripe.billingPortal.sessions.create({
        customer: checkoutSession.customer,
        return_url: returnUrl,
    });

    res.redirect(303, portalSession.url);
}