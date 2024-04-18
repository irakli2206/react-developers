import { NextApiRequest, NextApiResponse } from "next";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { buffer } from 'micro'
import Stripe from "stripe"
import { createClient } from "@/utils/supabase/server";
import { getProfileByID } from "@/app/action";
import { stripe } from "@/lib/stripe";

const secret = 'whsec_4a233bc79fca3fa1043c952d6e5a835b004e99bdaf9cfd5b68ead656de1a7e57';


export async function POST(
    req: Request,
) {

    const supabase = createClient()

    const body = await req.text()
    const signature = headers().get("Stripe-Signature") as string

    let event: Stripe.Event

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            secret
        )
    } catch (error: any) {
        return new Response(`Webhook Error: ${error.message}`, { status: 400 })
    }

    const session = event.data.object as Stripe.Checkout.Session

    if (event.type === "checkout.session.completed") {
        // Retrieve the subscription details from Stripe.
        const subscription: Stripe.Subscription = await stripe.subscriptions.retrieve(
            session.subscription as string
        )
        const userId = subscription.metadata.user_id
        const { data, error } = await supabase.from('profiles').update({
            stripeSubscriptionId: subscription.id,
            stripeCustomerId: subscription.customer as string,
            stripePriceId: subscription.items.data[0].price.id,
            stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
            account_type: 'employer'
        }).eq('id', userId)

        if (error) {
            return new Response(`Supabase user subscription update error:${error.message}`, { status: 400 })
        }
        console.log('SUBSCRIPTION DATA', subscription)

        // Update the user stripe into in our database.
        // Since this is the initial subscription, we need to update
        // the subscription id and customer id.
        // await db.user.update({
        //     where: {
        //         id: session?.metadata?.userId,
        //     },
        //     data: {
        //         stripeSubscriptionId: subscription.id,
        //         stripeCustomerId: subscription.customer as string,
        //         stripePriceId: subscription.items.data[0].price.id,
        //         stripeCurrentPeriodEnd: new Date(
        //             subscription.current_period_end * 1000
        //         ),
        //     },
        // })
    }

    // if (event.type === "invoice.payment_succeeded") {
    //     // Retrieve the subscription details from Stripe.
    //     const subscription = await stripe.subscriptions.retrieve(
    //         session.subscription as string
    //     )

    //     // Update the price id and set the new period end.
    //     // await db.user.update({
    //     //     where: {
    //     //         stripeSubscriptionId: subscription.id,
    //     //     },
    //     //     data: {
    //     //         stripePriceId: subscription.items.data[0].price.id,
    //     //         stripeCurrentPeriodEnd: new Date(
    //     //             subscription.current_period_end * 1000
    //     //         ),
    //     //     },
    //     // })
    // }

    return new Response(null, { status: 200 })
}
