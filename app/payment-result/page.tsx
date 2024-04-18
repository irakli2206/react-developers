import { useSearchParams } from 'next/navigation'
import React from 'react'

type SearchParams = {
    success: boolean 
    session_id: string
}

type Props = {
    searchParams: SearchParams
}

const PaymentResult = ({searchParams}: Props) => {
    
    console.log(searchParams)
    return (
        <section className='py-32'>
            <div className="product Box-root">
                <div className="description Box-root">
                    <h3>Subscription to starter plan successful!</h3>
                </div>
            </div>
            <form action="api/payment/create-portal-session" method="POST">
                <input
                    type="hidden"
                    id="session-id"
                    name="session_id"
                    value={searchParams.session_id}
                />
                <button id="checkout-and-portal-button" type="submit">
                    Manage your billing information
                </button>
            </form>
        </section>
    )
}

export default PaymentResult