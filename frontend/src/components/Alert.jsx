
import React from 'react'
import toast, { Toaster } from 'react-hot-toast'

const notify = () => toast('Here is your toast.');
const Alert = ({ alert }) => {
    return (

        <>
            <div className={`${alert.error ? 'bg-red-500' : 'bg-sky-600'} text-center p-3 rounded-xl uppercase text-white text-sm font-bold my-10 `}>

                <p>{alert.msg}</p>
            </div> 
        </>

    )
}

export default Alert