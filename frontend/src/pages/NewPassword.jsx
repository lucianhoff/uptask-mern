import React, { useState, useEffect } from 'react'

import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import clientAxios from '../config/clientAxios'
const NewPassword = () => {

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState(false)
    const handleSubmit = async e => {
        e.preventDefault()

        if (password === "" || password === null || password.length < 5) {

            // toast.error(`Please enter your password, at least 6 characters`)

            toast.error(`Please enter your new password, at least 6 characters`, {
                duration: 2000,
                position: 'top-center',
                // Styling
                style: {
                    background: '#9333ea',
                    color: '#fff'
                },
                className: 'bg-purple-500',
                // Change colors of success/error/loading icon
                iconTheme: {
                    primary: '#fff',
                    secondary: '#6b21a8',
                },
                // Aria
                ariaProps: {
                    role: 'status',
                    'aria-live': 'polite',
                },
            });

            return
        }

        try {
            const url = `/users/forgotpassword/${token}`
            const { data } = await clientAxios.post(url, { password })
            toast.success(`${data.msg}`, {
                duration: 2000,
                position: 'top-center',
                // Styling
                style: {
                    background: '#9333ea',
                    color: '#fff'
                },
                className: 'bg-purple-500',
                // Change colors of success/error/loading icon
                iconTheme: {
                    primary: '#fff',
                    secondary: '#6b21a8',
                },
                // Aria
                ariaProps: {
                    role: 'status',
                    'aria-live': 'polite',
                },
            });
            setConfirmPassword(true)
            setPassword('')
            setTimeout(() => {
                window.location.href = '/'
            }, 2500)
        } catch (error) {
            toast.error(`${error.response.data.msg}`, {
                duration: 2000,
                position: 'top-center',
                // Styling
                style: {
                    background: '#9333ea',
                    color: '#fff'
                },
                className: 'bg-purple-500',
                // Change colors of success/error/loading icon
                iconTheme: {
                    primary: '#fff',
                    secondary: '#6b21a8',
                },
                // Aria
                ariaProps: {
                    role: 'status',
                    'aria-live': 'polite',
                },
            });
        }
    }

    const { token } = useParams()

    console.log(token)

    const [validToken, setValidToken] = useState(null)
    const checkToken = async () => {
        try {
            await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/forgotpassword/${token}`)
            setValidToken(true)

        } catch (error) {
            setValidToken(false)
            console.log(error)
        }
    }

    useEffect(() => {
        checkToken()
    }, [])

    return (
        <>
            <Toaster />
            <h1 className='text-purple-500 font-bold text-6xl p-5 md:text-center'>
                Reset your password and don't lose access to your
                <span className='text-slate-700 capitalize'> projects</span>
            </h1>

            {validToken ? (

                <form className='my-10 px-5'
                    onSubmit={handleSubmit}
                >

                    <div className='my-5'>
                        <label htmlFor='password' className='block text-gray-700 text-xl font-bold mb-2'>
                            New Password
                        </label>
                        <input
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            id='password'
                            type='password'
                            placeholder='********'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <input
                        type="submit"
                        value="Confim change password"
                        className='my-5 bg-purple-600 text-white w-full py-3 font-bold rouded hover:cursor-pointer hover:bg-purple-800 transition-colors ' />
                </form>

            ) : (
                <div className='my-10 px-5 flex justify-center flex-col items-center'>
                    <p className='text-gray-700 text-xl font-bold mb-2'>
                        Invalid token
                    </p>
                    <Link to='/forgot-password' className='text-purple-500 hover:text-purple-600'>
                        Click here to request a new one
                    </Link>
                </div>
            )}

            {confirmPassword && (
                <div className='my-10 px-5 flex justify-center flex-col items-center'>
                    <p className='text-gray-700 text-xl font-bold mb-2'>
                        Password changed successfully
                    </p>
                    <Link to='/' className='text-purple-500 hover:text-purple-600'>
                        Click here to login
                    </Link>
                </div>
            )}

        </>
    )
}

export default NewPassword