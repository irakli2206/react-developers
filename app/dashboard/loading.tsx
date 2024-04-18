import { LoaderCircle } from 'lucide-react'
import { redirect } from 'next/navigation'
import React from 'react'

const Loading = () => {
  

  return (
    <div className='w-full h-full py-24 flex justify-center items-center'>
      <div className="animate-spin text-muted-foreground">
      <LoaderCircle size={64} />
      </div>
    </div>
  )
}

export default Loading