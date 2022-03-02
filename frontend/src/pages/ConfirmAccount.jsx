import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import clientAxios from '../config/clientAxios'
const ConfirmAccount = () => {

  const { token } = useParams()
  const [accountConfirmed, setAccountConfirmed] = useState(null)
  console.log(token);

  const ConfirmAccount = async () => {
    try {
      const url = `/users/confirm/${token}`
      const { data } = await clientAxios(url) // axios call default is GET

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
      setAccountConfirmed(true)

      setTimeout(() => { window.location.href = '/' }, 5000)


    } catch (error) {
      setAccountConfirmed(false)
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
      setTimeout(() => { window.location.href = '/register' }, 5000)
    }
  }

  useEffect(() => {
    ConfirmAccount()
  }, [])

  return (
    <>
      <Toaster />
      <h1 className='text-purple-500 font-bold text-6xl p-5 md:text-center'>
        Confirm your account and start creating your
        <span className='text-slate-700 capitalize'> projects</span>
      </h1>

      <div>
        {accountConfirmed ? (
          <>
            <h2 className='text-purple-500 font-bold text-6xl p-5 md:text-center'>
              Your account has been confirmed
            </h2>

            <Link to="/"
              className="block text-center my-5 uppercase text-gray-700 text-sm font-bold lg:mb-0 hover:text-gray-900"
            >
              Sign In!
            </Link>
          </>
        ) : (
          <>
            <h2 className='text-purple-500 font-bold text-6xl p-5 md:text-center'>
              Your account has not been confirmed
            </h2>

            <Link to="/register"
              className="block text-center my-5 uppercase text-gray-700 text-sm font-bold lg:mb-0 hover:text-gray-900"
            >
              SignUp!
            </Link>
          </>
        )}
      </div>
    </>
  )
}

export default ConfirmAccount