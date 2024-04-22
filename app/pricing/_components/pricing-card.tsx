import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { CheckCircle2 } from 'lucide-react'
import React from 'react'

type Props = {
  title: "Developer" | "Employer"
  subtitle: string
  cost: string
  features: string[]
  button: React.ReactNode
}

const PricingCard = ({ title, subtitle, cost, features, button }: Props) => {
  return (
    <Card className='flex-1 px-6 py-4 flex flex-col h-[470px] max-w-[400px]'>
      <CardHeader>
        <h1 className='text-3xl font-medium'>{title}</h1>
        <p className='text-muted-foreground'>{subtitle}</p>
      </CardHeader>
      <CardContent>
        <h1 className='text-2xl font-medium mb-4'>{cost}</h1>
        <div className="flex flex-col gap-2">
          {features.map(feature => {
            return (
              <p key={feature} className='flex gap-2 text-sm text-muted-foreground items-center'>
                <CheckCircle2 className='text-blue-400 fill-blue-100' width={18} />
                {feature}
              </p>
            )
          })}

        </div>
      </CardContent>
      <CardFooter className='flex flex-col h-full justify-end'>

        {button}
      </CardFooter>
    </Card>
  )
}

export default PricingCard