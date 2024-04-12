import React from 'react'

type Props = Readonly<{
    children: React.ReactNode;
}>

const SignupLayout = ({ children }: Props) => {
    //TODO: Wizard steps using useRoute or however you get current route
    return (
        <div>
            {children}
        </div>
    )
}

export default SignupLayout