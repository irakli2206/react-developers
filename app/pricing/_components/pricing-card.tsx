import { Card, CardContent, CardHeader } from '@/components/ui/card'
import React from 'react'

const PricingCard = () => {
  return (
    <Card>
        <CardHeader>
            <h1 className='text-3xl font-bold'>Developer</h1>
            <p className='text-zinc-400'>Add your profile to ReactDevelopers</p>
        </CardHeader>
        <CardContent>
            <h1 className='text-2xl font-semibold'>Free</h1>
            <div className="flex flex-col gap-2">
                
            </div>
        </CardContent>
    </Card>
  )
}

export default PricingCard