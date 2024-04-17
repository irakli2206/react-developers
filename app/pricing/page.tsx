import React from 'react'
import PricingCard from './_components/pricing-card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const Pricing = () => {
  return (
    <div className='py-36'>
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
            button={<Button variant='outline' asChild className='rounded-full w-full'>
              <Link href='signup'>Create Account</Link></Button>}
          />

          <PricingCard
            title='Employer'
            subtitle='Start hiring ReactJS talent'
            cost='$137.00/month'
            features={[
              "Full access to developer info",
              "Ability to use search filters",
              "Greater prioritization of your feature requests",
            ]}
            button={<Button variant='default' asChild className='rounded-full w-full'>
              <Link href='signup'>Subscribe</Link></Button>}
          />
        </main>
      </div>
    </div >
  )
}

export default Pricing