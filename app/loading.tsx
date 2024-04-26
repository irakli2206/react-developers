import classNames from 'classnames'
import { Loader } from 'lucide-react'
import React from 'react'



const Loading = () => {
    return (
        <div className={classNames('w-full h-screen py-24 flex justify-center items-center')}>
            <div className="animate-spin text-primary">
                {/* <LoaderCircle size={64} /> */}
                <Loader size={64} />
            </div>
        </div>
    )
}

export default Loading