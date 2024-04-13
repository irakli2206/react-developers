import React from 'react'

type Props = {
  children: React.ReactNode
}

const DashboardLayout = ({children}: Props) => {
  return (
    <div className='min-h-screen w-full pt-[64px]'>

      {children}
    </div>
  )
}

export default DashboardLayout