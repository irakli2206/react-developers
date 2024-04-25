import React from 'react'
import PricingCard from './_components/pricing-card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { BadgePlus, Flame } from 'lucide-react'
import { getProfileData, getUser } from '../action'

const Pricing = async () => {
  const user = await getUser()
  let profile

  if (user) {
    profile = await getProfileData()
  }

  const isLoggedIn = Boolean(user)
  const isDeveloper = profile?.account_type === 'developer'
  return (
    <div className='py-36 container max-w-7xl'>
      <div className="flex flex-col gap-12">
        <header className='flex flex-col gap-4 justify-center items-center text-center'>
          <h1 className='text-5xl font-semibold'>We keep it simple</h1>
          <p className='text-muted-foreground text-lg'>No 5 different confusing subscription plans, our terms are straightforward</p>
        </header>

        <main className="flex gap-4 justify-center">
          <PricingCard
            title='Developer'
            subtitle='Add your profile to ReactDevelopers'
            cost='Free'
            features={[
              "Join our database",
              "Get contacted by employers",
              "Be discovered by hiring managers",
              "Free cookie delivery to your door",
              "Ok last one is a lie"
            ]}
            button={
              <Button variant='outline' asChild className='rounded-full w-full shadow-sm'>
                <Link href='signup'>Create Account</Link></Button>
            }
          />

          <form action={isDeveloper ? 'api/payment/create-checkout-session' : 'api/payment/create-portal-session'} method='post'>
            <PricingCard
              title='Employer'
              subtitle='Start hiring ReactJS talent'
              cost='$147.00/month'
              features={[
                "Full access to developer info",
                "Ability to use search filters",
                "Greater prioritization of your feature requests",
              ]}
              button={
                isLoggedIn ?
                  <>
                    {isDeveloper ?
                      <>
                        <input type="hidden" name="lookup_key" value="employer" />
                        <input type="hidden" name="user_id" value={user?.id} />

                        <Button id="checkout-and-portal-button" variant='default' type='submit' className='rounded-full w-full shadow-sm'>
                          Subscribe </Button>
                      </>
                      :
                      <>
                        <Button id="checkout-and-portal-button" variant='default' type='submit' className='rounded-full w-full shadow-sm'>
                          Unsubscribe </Button>
                      </>
                    }
                  </>

                  :
                  <Button id="checkout-and-portal-button" variant='default' asChild className='rounded-full w-full shadow-sm'>
                    <Link href='signup?ask_auth=true'>  Subscribe</Link>
                  </Button>
              }
            /></form>
        </main>
      </div>
    </div >
  )
}

export default Pricing