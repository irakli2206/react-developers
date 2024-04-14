import React from 'react'

type Props = Readonly<{
    children: React.ReactNode;
}>

const SignupLayout = ({ children }: Props) => {
    //TODO: Wizard steps using useRoute or however you get current route
    return (
        <div className='min-h-screen h-screen w-full pt-[64px] '>
            {/* <div className=' rounded-xl max-w-md mx-auto bg-transparent shadow-[inset_0_0_25px_5px_rgba(255,255,255,1)] px-12 py-16 ring-1 ring-zinc-200'> */}
                {children}
            {/* </div> */}
        </div>
    )
}

export default SignupLayout