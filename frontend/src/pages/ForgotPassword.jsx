import React from 'react'
import { Link } from 'react-router-dom'

const ForgotPassword = () => {
    return (
        <>
            <h1 className='text-purple-500 font-bold text-6xl p-5 md:text-center'>
                Regain access and don't lose your
                <span className='text-slate-700 capitalize'> projects</span>
            </h1>

            <form className='my-10 px-5'>

                <div className='my-5'>
                    <label htmlFor='email' className='block text-gray-700 text-xl font-bold mb-2'>
                        Email
                    </label>
                    <input
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        id='email'
                        type='email'
                        placeholder='e-mail@example.com'
                    />
                </div>


                <input
                    type="submit"
                    value="Send me the password reset link"
                    className='my-5 bg-purple-600 text-white w-full py-3 font-bold rouded hover:cursor-pointer hover:bg-purple-800 transition-colors ' />
            </form>

            <nav className="lg:flex lg:justify-between px-5 mb-16">
                <Link to="/"
                    className="block text-center my-5 uppercase text-gray-700 text-sm font-bold lg:mb-0 hover:text-gray-900"
                >
                    have account yet? Sign In!
                </Link>
                <Link to="register"
                    className="block text-center my-5 uppercase text-gray-700 text-sm font-bold lg:mb-0 hover:text-gray-900"
                >
                    No have account yet? Sign Up!
                </Link>
            </nav>
        </>
    )
}

export default ForgotPassword