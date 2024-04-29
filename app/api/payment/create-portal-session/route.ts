import { getProfileData } from "@/app/action";
import { BASE_URL } from "@/env";
import { NextApiRequest, NextApiResponse } from "next";

 const stripe = require('stripe')('sk_test_51P6ZXCFtDuZ9TWJZjdaMzL1W77maw19YQFoSFygjcqR3VqTMIkKnaRr8Q0sKeEZ1uOVd6skIrlIZBmo3jj5BNj2500JmBR6bfG');

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